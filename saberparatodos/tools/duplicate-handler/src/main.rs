use anyhow::{Context, Result};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::collections::HashSet;
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

#[derive(Serialize, Deserialize, Debug)]
struct GeminiResponse {
    candidates: Option<Vec<Candidate>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Candidate {
    content: Content,
}

#[derive(Serialize, Deserialize, Debug)]
struct Content {
    parts: Vec<Part>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Part {
    text: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct DuplicateCheckResult {
    is_duplicate: bool,
    duplicate_of: Option<String>,
    reason: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct RewriteResult {
    rewritten_content: String,
}

const QUESTIONS_DIR: &str = "src/content/questions";

#[tokio::main]
async fn main() -> Result<()> {
    let api_key = env::var("GEMINI_API_KEY").context("GEMINI_API_KEY not set")?;
    let args: Vec<String> = env::args().collect();

    // In a real GH action, we might pass the changed files as arguments.
    // For now, let's assume we are checking a specific file passed as arg,
    // or if none, we could scan all (but that's expensive).
    // The previous workflow passed changed files. Let's stick to that pattern.

    if args.len() < 2 {
        println!("Usage: duplicate-handler <path_to_new_question>");
        return Ok(());
    }

    let target_file = PathBuf::from(&args[1]);
    if !target_file.exists() {
        println!("File not found: {:?}", target_file);
        return Ok(());
    }

    println!("Checking file: {:?}", target_file);

    let client = Client::new();
    let is_dup = check_duplicate(&client, &target_file, &api_key).await?;

    if is_dup {
        println!("Duplicate detected! Attempting to rewrite...");
        rewrite_question(&client, &target_file, &api_key).await?;
    } else {
        println!("No duplicate found.");
    }

    Ok(())
}

fn get_all_markdown_files(dir: &str) -> Vec<PathBuf> {
    WalkDir::new(dir)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().map_or(false, |ext| ext == "md"))
        .map(|e| e.path().to_path_buf())
        .collect()
}

async fn check_duplicate(client: &Client, target_path: &Path, api_key: &str) -> Result<bool> {
    let target_content = fs::read_to_string(target_path)?;

    let target_matter = gray_matter::Matter::<gray_matter::engine::YAML>::new();
    let target_parsed = target_matter.parse(&target_content);

    let target_grade = target_parsed.data.as_ref().and_then(|d| d["grado"].as_i64());
    let target_subject = target_parsed.data.as_ref().and_then(|d| d["asignatura"].as_string());

    let all_files = get_all_markdown_files(QUESTIONS_DIR);

    // Filter candidates
    let mut candidates = Vec::new();
    for file_path in all_files {
        if file_path.canonicalize().ok() == target_path.canonicalize().ok() {
            continue;
        }

        let content = fs::read_to_string(&file_path)?;
        let parsed = target_matter.parse(&content);

        let grade = parsed.data.as_ref().and_then(|d| d["grado"].as_i64());
        let subject = parsed.data.as_ref().and_then(|d| d["asignatura"].as_string());

        if grade == target_grade && subject == target_subject {
            candidates.push((file_path, parsed.content));
        }
    }

    if candidates.is_empty() {
        return Ok(false);
    }

    // Bigram Jaccard Similarity
    let target_shingles = get_shingles(&target_parsed.content);

    let mut scored_candidates: Vec<(PathBuf, String, f64)> = candidates.into_iter().map(|(path, content)| {
        let shingles = get_shingles(&content);
        let intersection = target_shingles.intersection(&shingles).count();
        let union = target_shingles.union(&shingles).count();
        let score = if union == 0 { 0.0 } else { intersection as f64 / union as f64 };
        (path, content, score)
    }).collect();

    scored_candidates.sort_by(|a, b| b.2.partial_cmp(&a.2).unwrap_or(std::cmp::Ordering::Equal));

    // Filter: Only consider candidates with >= 60% similarity
    let top_candidates = scored_candidates.into_iter()
        .take(3)
        .filter(|x| {
            if x.2 >= 0.6 {
                println!("High similarity detected ({:.2}%) with {:?}", x.2 * 100.0, x.0);
                true
            } else {
                false
            }
        })
        .collect::<Vec<_>>();

    if top_candidates.is_empty() {
        println!("No candidates met the 60% similarity threshold. Skipping Gemini check.");
        return Ok(false);
    }

    // LLM Check
    let candidates_text = top_candidates.iter().enumerate().map(|(i, (path, content, _))| {
        format!("--- CANDIDATE {} (Path: {:?}) ---\n{}\n---", i + 1, path, content)
    }).collect::<Vec<_>>().join("\n");

    let prompt = format!(
        r#"
        You are a duplicate detection system.
        NEW QUESTION:
        {}

        EXISTING QUESTIONS:
        {}

        Respond in JSON:
        {{
            "is_duplicate": boolean,
            "duplicate_of": "path" or null,
            "reason": "string"
        }}
        "#,
        target_parsed.content, candidates_text
    );

    let response = call_gemini(client, api_key, &prompt).await?;
    let result: DuplicateCheckResult = serde_json::from_str(&clean_json(&response))?;

    Ok(result.is_duplicate)
}

async fn rewrite_question(client: &Client, target_path: &Path, api_key: &str) -> Result<()> {
    let content = fs::read_to_string(target_path)?;

    let prompt = format!(
        r#"
        The following exam question was flagged as a duplicate.
        Please REWRITE it to be unique while testing the SAME concept and keeping the SAME difficulty and format.
        Change the specific numbers, scenario, or phrasing significantly.
        Keep the YAML frontmatter exactly as is, but you can update the 'id' if you want (append -v2), but preferably just keep the metadata and change the content.

        ORIGINAL CONTENT:
        {}

        Respond ONLY with the full valid Markdown content (YAML + Body).
        "#,
        content
    );

    let response = call_gemini(client, api_key, &prompt).await?;
    let cleaned_response = clean_markdown(&response);

    fs::write(target_path, cleaned_response)?;
    println!("File rewritten successfully: {:?}", target_path);

    Ok(())
}

async fn call_gemini(client: &Client, api_key: &str, prompt: &str) -> Result<String> {
    let url = format!("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={}", api_key);

    let body = json!({
        "contents": [{ "parts": [{ "text": prompt }] }]
    });

    let res = client.post(&url)
        .json(&body)
        .send()
        .await?;

    let gemini_res: GeminiResponse = res.json().await?;

    if let Some(candidates) = gemini_res.candidates {
        if let Some(first) = candidates.first() {
            if let Some(part) = first.content.parts.first() {
                return Ok(part.text.clone());
            }
        }
    }

    Err(anyhow::anyhow!("No response from Gemini"))
}

fn clean_json(text: &str) -> String {
    text.replace("```json", "").replace("```", "").trim().to_string()
}

fn clean_markdown(text: &str) -> String {
    text.replace("```markdown", "").replace("```", "").trim().to_string()
}

fn get_shingles(text: &str) -> HashSet<String> {
    let words: Vec<&str> = text.split_whitespace().collect();
    if words.is_empty() {
        return HashSet::new();
    }

    if words.len() == 1 {
         let mut s = HashSet::new();
         s.insert(words[0].to_lowercase());
         return s;
    }

    words.windows(2)
        .map(|w| format!("{} {}", w[0], w[1]).to_lowercase())
        .collect()
}
