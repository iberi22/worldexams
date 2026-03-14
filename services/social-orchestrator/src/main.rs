use clap::{Parser, Subcommand};
use dotenv::dotenv;
use anyhow::Result;

mod telegram;
mod discord;
mod twitter;
mod github;
mod content;

#[derive(Parser)]
#[command(name = "social-orchestrator")]
#[command(about = "World Exams Social Media Orchestrator", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Publicar contenido en todas las redes sociales
    PublishContent {
        /// Tipo de contenido: daily-tip, question-of-day, weekly-summary
        #[arg(short, long)]
        content_type: String,
    },

    /// Hacer triage automático de issues en GitHub
    TriageIssues {
        /// Repositorio (formato: owner/repo)
        #[arg(short, long, default_value = "world-exams/world-exams")]
        repo: String,
    },

    /// Generar y publicar reporte semanal
    WeeklyReport {
        /// Semana (YYYY-WW) o "current" para semana actual
        #[arg(short, long, default_value = "current")]
        week: String,
    },

    /// Sincronizar estadísticas entre países
    SyncStats,

    /// Responder menciones pendientes
    ReplyMentions {
        /// Plataforma: telegram, discord, twitter, all
        #[arg(short, long, default_value = "all")]
        platform: String,
    },
}

#[tokio::main]
async fn main() -> Result<()> {
    // Cargar variables de entorno
    dotenv().ok();

    // Inicializar logger
    env_logger::init();

    let cli = Cli::parse();

    match cli.command {
        Commands::PublishContent { content_type } => {
            publish_content(&content_type).await?;
        }
        Commands::TriageIssues { repo } => {
            triage_issues(&repo).await?;
        }
        Commands::WeeklyReport { week } => {
            generate_weekly_report(&week).await?;
        }
        Commands::SyncStats => {
            sync_statistics().await?;
        }
        Commands::ReplyMentions { platform } => {
            reply_mentions(&platform).await?;
        }
    }

    Ok(())
}

async fn publish_content(content_type: &str) -> Result<()> {
    println!("📱 Publicando contenido: {}", content_type);

    let content = content::load_content(content_type)?;

    // Publicar en paralelo en todas las redes
    let results = tokio::join!(
        telegram::post(&content),
        discord::post(&content),
        twitter::post(&content),
    );

    println!("✅ Telegram: {:?}", results.0);
    println!("✅ Discord: {:?}", results.1);
    println!("✅ Twitter: {:?}", results.2);

    Ok(())
}

async fn triage_issues(repo: &str) -> Result<()> {
    println!("🏷️  Haciendo triage de issues en {}", repo);

    let parts: Vec<&str> = repo.split('/').collect();
    if parts.len() != 2 {
        anyhow::bail!("Formato de repo inválido. Usa: owner/repo");
    }

    let issues = github::fetch_open_issues(parts[0], parts[1]).await?;

    println!("📋 Encontrados {} issues abiertos", issues.len());

    for issue in issues {
        let country = github::detect_country(&issue);
        let labels = github::suggest_labels(&issue);

        println!("  Issue #{}: {} → País: {}, Labels: {:?}",
                 issue.number, issue.title, country, labels);

        github::update_issue(parts[0], parts[1], issue.number, &country, &labels).await?;
    }

    Ok(())
}

async fn generate_weekly_report(week: &str) -> Result<()> {
    println!("📊 Generando reporte semanal: {}", week);

    // TODO: Implementar lógica de reporte

    Ok(())
}

async fn sync_statistics() -> Result<()> {
    println!("🔄 Sincronizando estadísticas entre países");

    // TODO: Implementar sincronización

    Ok(())
}

async fn reply_mentions(platform: &str) -> Result<()> {
    println!("💬 Respondiendo menciones en: {}", platform);

    match platform {
        "telegram" | "all" => {
            telegram::reply_pending_mentions().await?;
        }
        "discord" => {
            discord::reply_pending_mentions().await?;
        }
        "twitter" => {
            twitter::reply_pending_mentions().await?;
        }
        _ => {
            anyhow::bail!("Plataforma desconocida: {}", platform);
        }
    }

    Ok(())
}
