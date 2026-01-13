//! Questions API Module
//!
//! Handles question retrieval from the static API with rate limiting and caching.
//! Extracted from Edge Hive's edge-hive-functions crate.

use serde::{Deserialize, Serialize};

/// Question from the WorldExams database
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorldExamsQuestion {
    pub id: String,
    pub text: String,
    pub options: Vec<String>,
    pub correct_answer: u8,
    pub difficulty: u8,
    pub topic: Option<String>,
    pub grade: u32,
    pub subject: String,
    pub country: String,
}

/// Configuration for questions API
#[derive(Debug, Clone)]
pub struct QuestionsConfig {
    pub static_api_base: String,
    pub guest_limit: usize,
    pub rate_limit_per_hour: i32,
}

impl Default for QuestionsConfig {
    fn default() -> Self {
        Self {
            // Points to SaberParaTodos static API deployed on Cloudflare Pages
            static_api_base: "https://saberparatodos.pages.dev/api".to_string(),
            guest_limit: 10,
            rate_limit_per_hour: 100,
        }
    }
}

/// Fetch questions from static API
///
/// # Arguments
///
/// * `config` - API configuration
/// * `country` - Country code (e.g., "co", "mx", "br")
/// * `exam_type` - Exam type (e.g., "icfes", "enem", "exani")
/// * `grade` - Grade level (e.g., "11", "12")
/// * `subject` - Subject name (e.g., "matematicas", "ciencias")
/// * `page` - Page number for pagination
///
/// # Returns
///
/// A vector of questions or an error if the fetch fails
///
/// # Example
///
/// ```no_run
/// use worldexams_edge_functions::questions::{fetch_questions, QuestionsConfig};
///
/// #[tokio::main]
/// async fn main() {
///     let config = QuestionsConfig::default();
///     let questions = fetch_questions(
///         &config,
///         "co",      // Colombia
///         "icfes",   // ICFES Saber 11
///         "11",      // Grade 11
///         "matematicas",
///         1          // Page 1
///     ).await.unwrap();
///
///     println!("Fetched {} questions", questions.len());
/// }
/// ```
pub async fn fetch_questions(
    config: &QuestionsConfig,
    country: &str,
    exam_type: &str,
    grade: &str,
    subject: &str,
    page: u32,
) -> Result<Vec<WorldExamsQuestion>, anyhow::Error> {
    let url = format!(
        "{}/{}/{}/{}/{}/{}.json",
        config.static_api_base, country, exam_type, grade, subject, page
    );

    let response = reqwest::get(&url).await?;

    if !response.status().is_success() {
        anyhow::bail!("Failed to fetch questions: {}", response.status());
    }

    #[derive(Deserialize)]
    struct ApiResponse {
        questions: Vec<WorldExamsQuestion>,
    }

    let data: ApiResponse = response.json().await?;
    Ok(data.questions)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_config_default() {
        let config = QuestionsConfig::default();
        assert_eq!(config.guest_limit, 10);
        assert_eq!(config.rate_limit_per_hour, 100);
        assert!(config.static_api_base.contains("saberparatodos"));
    }

    #[test]
    fn test_question_structure() {
        let question = WorldExamsQuestion {
            id: "test-1".to_string(),
            text: "Test question".to_string(),
            options: vec!["A".to_string(), "B".to_string()],
            correct_answer: 0,
            difficulty: 3,
            topic: Some("Algebra".to_string()),
            grade: 11,
            subject: "matematicas".to_string(),
            country: "co".to_string(),
        };

        assert_eq!(question.grade, 11);
        assert_eq!(question.subject, "matematicas");
    }
}
