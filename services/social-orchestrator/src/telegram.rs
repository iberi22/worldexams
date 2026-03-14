use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct ContentMessage {
    pub title: String,
    pub body: String,
    pub image_url: Option<String>,
}

pub async fn post(content: &ContentMessage) -> Result<()> {
    let token = env::var("TELEGRAM_BOT_TOKEN")?;
    let chat_id = env::var("TELEGRAM_CHAT_ID")?;

    let text = format!("📚 *{}*\n\n{}", content.title, content.body);

    let client = Client::new();
    let url = format!("https://api.telegram.org/bot{}/sendMessage", token);

    let response = client
        .post(&url)
        .json(&serde_json::json!({
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown"
        }))
        .send()
        .await?;

    if response.status().is_success() {
        println!("✅ Telegram: Mensaje enviado");
        Ok(())
    } else {
        let error_text = response.text().await?;
        anyhow::bail!("Error en Telegram: {}", error_text)
    }
}

pub async fn reply_pending_mentions() -> Result<()> {
    println!("💬 Respondiendo menciones pendientes en Telegram");

    // TODO: Implementar lógica para obtener y responder menciones

    Ok(())
}
