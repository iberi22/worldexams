use anyhow::{Result, anyhow};
use rand::seq::SliceRandom;
use reqwest::Client;
use serde_json::{json, Value};
use std::env;

pub struct GeminiClient {
    client: Client,
    api_keys: Vec<String>,
}

impl GeminiClient {
    pub fn new() -> Result<Self> {
        let keys_str = env::var("GEMINI_API_KEYS").map_err(|_| anyhow!("GEMINI_API_KEYS not set"))?;
        let api_keys: Vec<String> = keys_str.split(',').map(|s| s.trim().to_string()).collect();

        if api_keys.is_empty() {
            return Err(anyhow!("No Gemini API keys provided"));
        }

        Ok(Self {
            client: Client::new(),
            api_keys,
        })
    }

    fn get_random_key(&self) -> &str {
        self.api_keys.choose(&mut rand::thread_rng()).unwrap()
    }

    pub async fn generate_text(&self, prompt: &str) -> Result<String> {
        let key = self.get_random_key();
        let url = format!("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={}", key);

        let body = json!({
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        });

        let response = self.client.post(&url)
            .json(&body)
            .send()
            .await?;

        if !response.status().is_success() {
            return Err(anyhow!("Gemini API error: {}", response.status()));
        }

        let data: Value = response.json().await?;

        data["candidates"][0]["content"]["parts"][0]["text"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or_else(|| anyhow!("Failed to parse Gemini response"))
    }

    pub async fn generate_image_prompt(&self, question_text: &str) -> Result<String> {
        let prompt = format!(
            "Create a detailed prompt for an educational infographic explaining this question: '{}'. \
            The prompt should be suitable for an image generation AI. \
            Focus on visual clarity and educational value.",
            question_text
        );
        self.generate_text(&prompt).await
    }
}
