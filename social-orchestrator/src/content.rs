use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs;
use chrono::{Utc, Datelike};
use super::telegram::ContentMessage;

#[derive(Debug, Serialize, Deserialize)]
struct DailyTip {
    tip: String,
    subject: String,
    emoji: String,
}

pub fn load_content(content_type: &str) -> Result<ContentMessage> {
    match content_type {
        "daily-tip" => load_daily_tip(),
        "question-of-day" => load_question_of_day(),
        "weekly-summary" => load_weekly_summary(),
        _ => anyhow::bail!("Tipo de contenido desconocido: {}", content_type),
    }
}

fn load_daily_tip() -> Result<ContentMessage> {
    let tips_json = fs::read_to_string("content/daily-tips.json")?;
    let tips: Vec<DailyTip> = serde_json::from_str(&tips_json)?;

    // Seleccionar tip basado en el día del año
    let day_of_year = Utc::now().ordinal() as usize;
    let tip = &tips[day_of_year % tips.len()];

    Ok(ContentMessage {
        title: format!("{} Tip del Día - {}", tip.emoji, tip.subject),
        body: tip.tip.clone(),
        image_url: None,
    })
}

fn load_question_of_day() -> Result<ContentMessage> {
    // TODO: Obtener pregunta desde Supabase

    Ok(ContentMessage {
        title: "📝 Pregunta del Día - Matemáticas".to_string(),
        body: "¿Cuál es el resultado de 2 + 2?\n\nA) 3\nB) 4 ✅\nC) 5\nD) 6".to_string(),
        image_url: None,
    })
}

fn load_weekly_summary() -> Result<ContentMessage> {
    Ok(ContentMessage {
        title: "📊 Resumen Semanal - World Exams".to_string(),
        body: "Esta semana en World Exams:\n• 500 estudiantes practicaron\n• 10,000 preguntas respondidas\n• 5 nuevos países activos".to_string(),
        image_url: None,
    })
}
