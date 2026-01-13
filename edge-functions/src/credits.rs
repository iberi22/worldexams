//! Credits System Module
//!
//! Handles credit transactions, billing, and subscription tiers.
//! Extracted from Edge Hive's edge-hive-functions crate.

use serde::{Deserialize, Serialize};

/// Service costs in credits
#[derive(Debug, Clone, Copy)]
pub struct ServiceCosts {
    pub analysis: i32,
    pub infographic: i32,
    pub tutor_session: i32,
    pub custom_route: i32,
}

impl Default for ServiceCosts {
    fn default() -> Self {
        Self {
            analysis: 10,        // AI analysis of exam results
            infographic: 15,     // Generated study infographics
            tutor_session: 20,   // Real-time AI tutoring
            custom_route: 5,     // Personalized study routes
        }
    }
}

/// Subscription tier configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SubscriptionTier {
    pub name: String,
    pub weekly_credits: i32,
    pub monthly_price_usd: f64,
}

impl SubscriptionTier {
    /// Free tier with limited credits
    pub fn free() -> Self {
        Self {
            name: "free".to_string(),
            weekly_credits: 50,
            monthly_price_usd: 0.0,
        }
    }

    /// Pro tier for regular students
    pub fn pro() -> Self {
        Self {
            name: "pro".to_string(),
            weekly_credits: 500,
            monthly_price_usd: 9.99,
        }
    }

    /// Premium tier for intensive study
    pub fn premium() -> Self {
        Self {
            name: "premium".to_string(),
            weekly_credits: 2000,
            monthly_price_usd: 29.99,
        }
    }

    /// School/Institution tier
    pub fn school() -> Self {
        Self {
            name: "school".to_string(),
            weekly_credits: 10000,
            monthly_price_usd: 199.99,
        }
    }
}

/// Credit transaction record
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreditTransaction {
    pub user_id: String,
    pub amount: i32,
    pub transaction_type: TransactionType,
    pub service: Option<String>,
    pub reference_id: Option<String>,
    pub timestamp: chrono::DateTime<chrono::Utc>,
}

/// Type of credit transaction
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum TransactionType {
    Spend,
    Refill,
    Bonus,
    Refund,
}

impl CreditTransaction {
    /// Create a new spend transaction
    pub fn spend(user_id: String, amount: i32, service: String, reference_id: Option<String>) -> Self {
        Self {
            user_id,
            amount: -amount.abs(), // Ensure negative
            transaction_type: TransactionType::Spend,
            service: Some(service),
            reference_id,
            timestamp: chrono::Utc::now(),
        }
    }

    /// Create a new refill transaction
    pub fn refill(user_id: String, amount: i32) -> Self {
        Self {
            user_id,
            amount: amount.abs(), // Ensure positive
            transaction_type: TransactionType::Refill,
            service: None,
            reference_id: None,
            timestamp: chrono::Utc::now(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_service_costs() {
        let costs = ServiceCosts::default();
        assert_eq!(costs.analysis, 10);
        assert_eq!(costs.infographic, 15);
    }

    #[test]
    fn test_subscription_tiers() {
        let free = SubscriptionTier::free();
        assert_eq!(free.name, "free");
        assert_eq!(free.weekly_credits, 50);
        assert_eq!(free.monthly_price_usd, 0.0);

        let pro = SubscriptionTier::pro();
        assert_eq!(pro.name, "pro");
        assert!(pro.weekly_credits > free.weekly_credits);
    }

    #[test]
    fn test_transaction_creation() {
        let spend = CreditTransaction::spend(
            "user123".to_string(),
            10,
            "analysis".to_string(),
            Some("exam123".to_string()),
        );

        assert!(spend.amount < 0);
        assert_eq!(spend.service, Some("analysis".to_string()));

        let refill = CreditTransaction::refill("user123".to_string(), 100);
        assert!(refill.amount > 0);
        assert!(refill.service.is_none());
    }
}
