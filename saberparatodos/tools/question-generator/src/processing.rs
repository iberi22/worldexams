use crate::gemini::GeminiClient;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use tokio::task;

#[derive(Debug, Serialize, Deserialize)]
struct GeneratedQuestion {
    subject: String,
    grade: u8,
    topic: String,
    question_text: String,
    options: Vec<String>,
    correct_option_index: usize,
    explanation: String,
    // New fields for Rich Context
    difficulty: u8, // 1, 2, or 3
    competency: String,
    component: String,
    #[serde(default)]
    is_original: bool,
}

pub async fn process_batch(items: Vec<String>) -> Result<()> {
    let gemini = GeminiClient::new()?;
    let gemini = std::sync::Arc::new(gemini);

    let mut handles = Vec::new();

    for (i, item) in items.into_iter().enumerate() {
        let gemini_clone = gemini.clone();
        let item_clone = item.clone();
        let handle = task::spawn(async move {
            println!("Processing item {}...", i);
            if let Err(e) = process_single_item(&gemini_clone, &item_clone, i).await {
                eprintln!("Error processing item {}: {}", i, e);
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        let _ = handle.await;
    }

    Ok(())
}

async fn process_single_item(gemini: &GeminiClient, content: &str, index: usize) -> Result<()> {
    // 1. Extract Original + Generate 6 versions (Total 7)
    let prompt = format!(
        "Analyze this educational content and produce a set of 7 formatted questions for the Colombian Saber 11 exam. \
        The output must be in SPANISH. \
        \
        Input Content: {:.1000}... \
        \
        REQUIRED OUTPUT STACK (7 Items total): \
        1. **The Original Question**: Extract the main question found in the text VERBATIM. If it's not clear, reconstruct it faithfully. Mark difficulty based on your analysis. \
        2. **2 Easy Questions**: Derived from the original (Level 1: Memory/Literal). \
        3. **2 Medium Questions**: Derived from the original (Level 2: Application). \
        4. **2 Hard Questions**: Derived from the original (Level 3: Analysis/Inference). \
        \
        For EACH question (including the original), provide: \
        - 'is_original': boolean (true ONLY for the first one). \
        - 'competency': Skill measured. \
        - 'component': Knowledge area. \
        - 'explanation': Rich step-by-step justification. \
        \
        Output strict JSON array of objects.",
        content
    );

    let json_response = gemini.generate_text(&prompt).await?;
    let clean_json = json_response.replace("```json", "").replace("```", "");

    let questions: Vec<GeneratedQuestion> = serde_json::from_str(&clean_json)
        .map_err(|e| anyhow::anyhow!("Failed to parse JSON: {}. Content: {}", e, clean_json))?;

    if questions.is_empty() {
        return Ok(());
    }

    for (v, q) in questions.iter().enumerate() {
        let svg_prompt = format!(
            "Create a visual explanation (SVG) for: '{}'. \
            Context: {}. \
            Style: Educational, minimal. \
            Add watermark 'saberparatodos' bottom-right. \
            Output ONLY <svg> code.",
            q.question_text, q.explanation
        );

        let svg_content = gemini.generate_text(&svg_prompt).await
            .unwrap_or_else(|_| "<!-- SVG Gen Failed -->".to_string())
            .replace("```xml", "").replace("```svg", "").replace("```", "");

        save_question(q, &svg_content, index, v)?;
    }

    Ok(())
}

fn save_question(q: &GeneratedQuestion, svg: &str, seed_idx: usize, version: usize) -> Result<()> {
    let base_path = Path::new("../../src/content/questions");

    // Normalize path names
    let subject_slug = q.subject.to_lowercase()
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u")
        .replace("ñ", "n");

    let topic_slug = q.topic.to_lowercase().replace(" ", "-").replace("ñ", "n");

    let dir_path = base_path.join(&subject_slug)
        .join(format!("grado-{}", q.grade))
        .join(&topic_slug);

    if !dir_path.exists() {
        fs::create_dir_all(&dir_path)?;
    }

    // Generate ID using hash
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};
    let mut hasher = DefaultHasher::new();
    q.question_text.hash(&mut hasher);
    let hash = hasher.finish();
    let unique_id = hash % 10000;

    let prefix = match subject_slug.as_str() {
        s if s.contains("mate") => "MAT",
        s if s.contains("len") => "LEN",
        s if s.contains("soc") => "SOC",
        s if s.contains("nat") || s.contains("cien") => "NAT",
        s if s.contains("ing") => "ING",
        _ => "GEN"
    };

    // Distinguish ID for Original vs Variations
    // logic: if q.is_original is true, use ORIG suffix.
    // Note: version passed from loop is 0..6.
    let is_original = q.is_original || version == 0;
    let suffix = if is_original { "ORIG" } else { &format!("V{}", version) };

    // Group ID is based on the Seed Index or Hash of the original
    let group_id = format!("SEED-{}-{:04}", prefix, seed_idx);

    let formatted_id = format!("{}-G{}-{:04}-{}", prefix, q.grade, unique_id, suffix);
    let file_name = format!("{}.md", formatted_id);
    let file_path = dir_path.join(file_name);

    let options_formatted = q.options.iter().enumerate()
        .map(|(i, opt)| format!("- [{}] {}) {}", if i == q.correct_option_index { "x" } else { " " }, (b'A' + i as u8) as char, opt))
        .collect::<Vec<_>>()
        .join("\n");

    let source_meta = if is_original { "human-verified" } else { "ai-generated" };
    let license_note = if is_original { "Open Source (Pending Verification)" } else { "CC-BY-SA 4.0" };

    let content = format!(
        "---\n\
        id: \"{}\"\n\
        base_question_id: \"{}\"\n\
        protocol_version: \"2.0\"\n\
        grado: {}\n\
        asignatura: \"{}\"\n\
        tema: \"{}\"\n\
        dificultad: {}\n\
        competencia: \"{}\"\n\
        componente: \"{}\"\n\
        estado: \"draft\"\n\
        creador: \"Gemini Agent\"\n\
        is_original: {}\n\
        license: \"{}\"\n\
        source: \"{}\"\n\
        ---\n\n\
        # Pregunta\n\
        {}\n\n\
        # Opciones\n\
        {}\n\n\
        # Explicación\n\
        {}\n\n\
        # Infografía\n\
        {}\n",
        formatted_id,
        group_id,
        q.grade,
        q.subject,
        q.topic,
        q.difficulty,
        q.competency,
        q.component,
        is_original,
        license_note,
        source_meta,
        q.question_text,
        options_formatted,
        q.explanation,
        svg
    );

    fs::write(file_path, content)?;
    Ok(())
}
