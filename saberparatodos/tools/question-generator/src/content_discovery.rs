use anyhow::{Result, anyhow};
use reqwest::header::{HeaderMap, USER_AGENT, AUTHORIZATION};
use serde_json::Value;
use std::env;

pub async fn search_repositories() -> Result<Vec<String>> {
    let client = reqwest::Client::new();
    let token = env::var("GITHUB_TOKEN").ok(); // Optional: Use token if available to avoid rate limits

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert(USER_AGENT, "SaberParaTodos-Bot".parse().unwrap());
    if let Some(t) = token {
        headers.insert(AUTHORIZATION, format!("Bearer {}", t).parse().unwrap());
    }

    // 1. Search for repositories
    let query = "topic:education topic:exam language:markdown";
    let url = format!("https://api.github.com/search/repositories?q={}&sort=stars&order=desc&per_page=5", query);

    let resp = client.get(&url)
        .headers(headers.clone())
        .send()
        .await?;

    if !resp.status().is_success() {
        return Err(anyhow!("GitHub API error: {}", resp.status()));
    }

    let data: Value = resp.json().await?;
    let items = data["items"].as_array().ok_or(anyhow!("No items found"))?;

    let mut contents = Vec::new();

    // 2. For each repo, find a few markdown files (simplified)
    for item in items.iter().take(3) {
        if let Some(full_name) = item["full_name"].as_str() {
            println!("Scanning repo: {}", full_name);

            // Search for code in this repo
            let code_query = format!("repo:{} extension:md path:questions", full_name);
            let code_url = format!("https://api.github.com/search/code?q={}&per_page=3", code_query);

            // Sleep to respect rate limits
            tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;

            let code_resp = client.get(&code_url)
                .headers(headers.clone())
                .send()
                .await;

            if let Ok(cr) = code_resp {
                if let Ok(code_data) = cr.json::<Value>().await {
                    if let Some(code_items) = code_data["items"].as_array() {
                        for code_item in code_items {
                            if let Some(download_url) = code_item["download_url"].as_str() {
                                // Download content
                                if let Ok(content) = client.get(download_url).send().await {
                                    if let Ok(text) = content.text().await {
                                        contents.push(text);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Ok(contents)
}
