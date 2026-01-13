//! AI Analysis Module
//!
//! Integrates with Gemini API for exam analysis and personalized feedback.
//! Extracted from Edge Hive's edge-hive-functions crate.

use serde::{Deserialize, Serialize};

/// Prompt templates for AI analysis
pub struct AnalysisPrompts;

impl AnalysisPrompts {
    /// Generate exam analysis prompt for Gemini/Claude/GPT
    ///
    /// Creates a detailed prompt for AI models to analyze exam performance
    /// and provide personalized feedback in Spanish.
    pub fn exam_analysis(
        score: i32,
        total: i32,
        subject: &str,
        grade: i32,
        time_taken: i32,
    ) -> String {
        let percentage = if total > 0 { (score * 100) / total } else { 0 };

        format!(
            r#"Eres un tutor experto en educación colombiana. Analiza este resultado de examen Saber 11:

Puntaje: {}/{} ({}%)
Asignatura: {}
Grado: {}
Tiempo: {} segundos

Genera un análisis DETALLADO con:
1. Fortalezas (qué hizo bien) - mínimo 2 puntos
2. Debilidades (temas a reforzar) - mínimo 2 puntos
3. Plan de Estudio (3 acciones concretas)
4. Predicción de Puntaje en examen real (0-500 escala ICFES)
5. Motivación personalizada

Responde SOLO con JSON válido (sin markdown):
{{"strengths": ["..."], "weaknesses": ["..."], "study_plan": ["..."], "predicted_score": 350, "motivation": "..."}}"#,
            score, total, percentage, subject, grade, time_taken
        )
    }

    /// Generate infographic content prompt
    ///
    /// Creates educational content optimized for visual infographics
    pub fn infographic_content(topic: &str, grade: i32) -> String {
        format!(
            r#"Crea contenido para una infografía educativa sobre:
Tema: {}
Grado: {}

Incluye:
1. Título atractivo
2. 5 puntos clave
3. Un dato curioso
4. Una pregunta de reflexión

Responde en JSON: {{"title": "...", "key_points": [...], "fun_fact": "...", "reflection": "..."}}"#,
            topic, grade
        )
    }

    /// Generate study route recommendations
    ///
    /// Creates a personalized study path based on weaknesses
    pub fn study_route(
        subject: &str,
        weak_topics: &[String],
        grade: i32,
        available_hours: i32,
    ) -> String {
        let topics_list = weak_topics.join(", ");
        format!(
            r#"Crea una ruta de estudio personalizada para:
Asignatura: {}
Temas a reforzar: {}
Grado: {}
Horas disponibles por semana: {}

Genera un plan estructurado en JSON:
{{
  "duration_weeks": 4,
  "weekly_schedule": [
    {{"day": "Lunes", "topic": "...", "duration_minutes": 60, "activities": ["...", "..."]}},
    ...
  ],
  "milestones": ["...", "..."],
  "resources": ["...", "..."]
}}"#,
            subject, topics_list, grade, available_hours
        )
    }
}

/// Result of AI analysis
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExamAnalysisResult {
    pub strengths: Vec<String>,
    pub weaknesses: Vec<String>,
    pub study_plan: Vec<String>,
    pub predicted_score: i32,
    pub motivation: String,
}

impl Default for ExamAnalysisResult {
    fn default() -> Self {
        Self {
            strengths: vec!["Completaste el examen".to_string()],
            weaknesses: vec!["Revisar temas con errores".to_string()],
            study_plan: vec![
                "Revisar las preguntas incorrectas".to_string(),
                "Practicar ejercicios similares".to_string(),
                "Estudiar 30 minutos diarios".to_string(),
            ],
            predicted_score: 250,
            motivation: "¡Sigue practicando! Cada intento te acerca a tu meta.".to_string(),
        }
    }
}

impl ExamAnalysisResult {
    /// Parse AI response from JSON string
    pub fn from_json(json_str: &str) -> Result<Self, serde_json::Error> {
        serde_json::from_str(json_str)
    }

    /// Calculate improvement suggestions based on predicted score
    pub fn get_improvement_level(&self) -> &str {
        match self.predicted_score {
            0..=200 => "Necesitas reforzar conceptos básicos",
            201..=300 => "Buen progreso, sigue practicando",
            301..=400 => "Excelente nivel, afina detalles",
            401..=500 => "Nivel sobresaliente, mantén el ritmo",
            _ => "Continúa estudiando",
        }
    }
}

/// Infographic content structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InfographicContent {
    pub title: String,
    pub key_points: Vec<String>,
    pub fun_fact: String,
    pub reflection: String,
}

/// Study route structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StudyRoute {
    pub duration_weeks: u32,
    pub weekly_schedule: Vec<DailyActivity>,
    pub milestones: Vec<String>,
    pub resources: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DailyActivity {
    pub day: String,
    pub topic: String,
    pub duration_minutes: u32,
    pub activities: Vec<String>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_exam_analysis_prompt() {
        let prompt = AnalysisPrompts::exam_analysis(18, 20, "Matemáticas", 11, 1200);
        assert!(prompt.contains("90%"));
        assert!(prompt.contains("Matemáticas"));
        assert!(prompt.contains("Saber 11"));
    }

    #[test]
    fn test_analysis_result_default() {
        let result = ExamAnalysisResult::default();
        assert!(!result.strengths.is_empty());
        assert!(!result.weaknesses.is_empty());
        assert_eq!(result.predicted_score, 250);
    }

    #[test]
    fn test_improvement_level() {
        let mut result = ExamAnalysisResult::default();

        result.predicted_score = 150;
        assert_eq!(result.get_improvement_level(), "Necesitas reforzar conceptos básicos");

        result.predicted_score = 350;
        assert_eq!(result.get_improvement_level(), "Excelente nivel, afina detalles");

        result.predicted_score = 450;
        assert_eq!(result.get_improvement_level(), "Nivel sobresaliente, mantén el ritmo");
    }

    #[test]
    fn test_json_parsing() {
        let json = r#"{
            "strengths": ["Buena comprensión lectora"],
            "weaknesses": ["Geometría"],
            "study_plan": ["Practicar más"],
            "predicted_score": 350,
            "motivation": "¡Sigue así!"
        }"#;

        let result = ExamAnalysisResult::from_json(json).unwrap();
        assert_eq!(result.predicted_score, 350);
        assert_eq!(result.strengths.len(), 1);
    }
}
