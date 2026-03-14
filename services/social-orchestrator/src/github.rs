use anyhow::Result;
use octocrab::{Octocrab, models::issues::Issue};
use std::env;

pub async fn fetch_open_issues(owner: &str, repo: &str) -> Result<Vec<Issue>> {
    let token = env::var("GITHUB_TOKEN")?;
    let octocrab = Octocrab::builder().personal_token(token).build()?;

    let issues = octocrab
        .issues(owner, repo)
        .list()
        .state(octocrab::params::State::Open)
        .send()
        .await?;

    Ok(issues.items)
}

pub fn detect_country(issue: &Issue) -> String {
    let text = format!("{} {}",
        issue.title,
        issue.body.as_deref().unwrap_or("")
    ).to_lowercase();

    // Detectar por palabras clave
    if text.contains("icfes") || text.contains("saber 11") || text.contains("colombia") {
        return "CO".to_string();
    }

    if text.contains("enem") || text.contains("brasil") || text.contains("brazil") || text.contains("vestibular") {
        return "BR".to_string();
    }

    if text.contains("exani") || text.contains("méxico") || text.contains("mexico") || text.contains("ceneval") {
        return "MX".to_string();
    }

    if text.contains("paes") || text.contains("chile") || text.contains("psu") {
        return "CL".to_string();
    }

    if text.contains("ingreso") || text.contains("argentina") {
        return "AR".to_string();
    }

    if text.contains("admisión") || text.contains("perú") || text.contains("peru") {
        return "PE".to_string();
    }

    if text.contains("sat") || text.contains("act") || text.contains("usa") || text.contains("united states") {
        return "US".to_string();
    }

    if text.contains("gaokao") || text.contains("china") || text.contains("中国") {
        return "CN".to_string();
    }

    if text.contains("jee") || text.contains("india") || text.contains("neet") {
        return "IN".to_string();
    }

    "UNKNOWN".to_string()
}

pub fn suggest_labels(issue: &Issue) -> Vec<String> {
    let mut labels = vec![];
    let text = format!("{} {}",
        issue.title,
        issue.body.as_deref().unwrap_or("")
    ).to_lowercase();

    if text.contains("bug") || text.contains("error") || text.contains("fallo") {
        labels.push("bug".to_string());
    }

    if text.contains("feature") || text.contains("sugerencia") || text.contains("mejora") {
        labels.push("enhancement".to_string());
    }

    if text.contains("pregunta") || text.contains("question") || text.contains("duda") {
        labels.push("question".to_string());
    }

    if text.contains("documentación") || text.contains("documentation") || text.contains("docs") {
        labels.push("documentation".to_string());
    }

    if text.contains("urgente") || text.contains("crítico") || text.contains("critical") {
        labels.push("priority: high".to_string());
    }

    labels
}

pub async fn update_issue(
    owner: &str,
    repo: &str,
    issue_number: u64,
    country: &str,
    labels: &[String]
) -> Result<()> {
    let token = env::var("GITHUB_TOKEN")?;
    let octocrab = Octocrab::builder().personal_token(token).build()?;

    let mut all_labels = labels.to_vec();

    // Agregar label de país
    if country != "UNKNOWN" {
        all_labels.push(format!("country: {}", country));
    } else {
        all_labels.push("needs-triage".to_string());
    }

    octocrab
        .issues(owner, repo)
        .update(issue_number)
        .labels(&all_labels)
        .send()
        .await?;

    // Agregar comentario automático
    let comment_body = if country != "UNKNOWN" {
        format!(
            "🤖 **Triage Automático**\n\n\
             Este issue ha sido clasificado para: **{}**\n\
             Labels sugeridos: {}\n\n\
             Si esto es incorrecto, por favor actualiza los labels manualmente.",
            country,
            labels.join(", ")
        )
    } else {
        "🤖 **Triage Automático**\n\n\
         No se pudo detectar automáticamente el país de este issue.\n\
         Por favor, agrega el label correspondiente manualmente.".to_string()
    };

    octocrab
        .issues(owner, repo)
        .create_comment(issue_number, comment_body)
        .await?;

    println!("✅ Issue #{} actualizado con labels: {:?}", issue_number, all_labels);

    Ok(())
}
