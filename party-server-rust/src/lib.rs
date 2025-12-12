use actix_web::{web, App, HttpServer, middleware, HttpResponse, HttpRequest};
use actix_cors::Cors;
use std::net::TcpListener;

pub mod domain;
pub mod infrastructure;
pub mod application;
pub mod config;

pub struct ServerConfig {
    pub database_url: String,
    pub host: String,
    pub port: u16,
    pub static_dir: String,
}

// Embed static files at compile time
const INDEX_HTML: &str = include_str!("../public/index.html");
const INDEX_JS: &[u8] = include_bytes!("../public/assets/index-Bbp2mlFq.js");
const INDEX_CSS: &[u8] = include_bytes!("../public/assets/index-chYgb4_Z.css");

async fn serve_index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(INDEX_HTML)
}

async fn serve_js() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("application/javascript")
        .body(INDEX_JS)
}

async fn serve_css() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/css")
        .body(INDEX_CSS)
}

pub fn start_server(config: ServerConfig) {
    std::thread::spawn(move || {
        let sys = actix_web::rt::System::new();
        match sys.block_on(run(config)) {
            Ok(_) => tracing::info!("Server stopped gracefully"),
            Err(e) => tracing::error!("Server error: {}", e),
        }
    });
}

pub async fn run(config: ServerConfig) -> std::io::Result<()> {
    println!("🚀 Party Server starting...");
    println!("📂 Static Dir: {}", config.static_dir);

    // TODO: Initialize database and migrations
    // For now, skip DB to get the server running on Android
    // let db_pool = infrastructure::database::init_pool(&config.database_url).await...

    println!("✅ Skipping database for MVP");

    // Create HTTP server
    let server_addr = format!("{}:{}", config.host, config.port);

    println!("🎮 Party Server ready at http://{}", server_addr);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .wrap(middleware::Compress::default())
            // Serve embedded static files
            .route("/", web::get().to(serve_index))
            .route("/index.html", web::get().to(serve_index))
            .route("/assets/index-Bbp2mlFq.js", web::get().to(serve_js))
            .route("/assets/index-chYgb4_Z.css", web::get().to(serve_css))
    })
    .bind(&server_addr)?
    .run()
    .await
}
