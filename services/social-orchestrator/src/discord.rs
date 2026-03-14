use anyhow::Result;
use reqwest::Client;
use std::env;
use super::telegram::ContentMessage;

pub async fn post(content: &ContentMessage) -> Result<()> {
    let webhook_url = env::var("DISCORD_WEBHOOK_URL")?;

    let text = format!("**{}**\n\n{}", content.title, content.body);

    let client = Client::new();
    let response = client
        .post(&webhook_url)
        .json(&serde_json::json!({
            "content": text,
            "username": "World Exams Bot",
            "avatar_url": "https://world-exams.github.io/logo.png"
        }))
        .send()
        .await?;

    if response.status().is_success() {
        println!("✅ Discord: Mensaje enviado");
        Ok(())
    } else {
        let error_text = response.text().await?;
        anyhow::bail!("Error en Discord: {}", error_text)
    }
}

pub async fn reply_pending_mentions() -> Result<()> {
    println!("💬 Respondiendo menciones pendientes en Discord");

    // TODO: Implementar lógica

    Ok(())
}
