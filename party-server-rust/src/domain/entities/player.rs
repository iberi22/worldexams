use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub id: Uuid,
    pub party_id: Uuid,
    pub name: String,
    pub is_online: bool,
    pub is_host: bool,
    pub joined_at: DateTime<Utc>,
    pub left_screen_count: i32,
    pub last_activity_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SuspiciousEvent {
    pub id: Uuid,
    pub player_id: Uuid,
    pub event_type: SuspiciousEventType,
    pub timestamp: DateTime<Utc>,
    pub duration_ms: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum SuspiciousEventType {
    TabSwitch,
    WindowBlur,
    PageHidden,
    LongInactivity,
}

impl Player {
    pub fn new(party_id: Uuid, name: String, is_host: bool) -> Self {
        Self {
            id: Uuid::new_v4(),
            party_id,
            name,
            is_online: true,
            is_host,
            joined_at: Utc::now(),
            left_screen_count: 0,
            last_activity_at: Utc::now(),
        }
    }

    pub fn record_activity(&mut self) {
        self.last_activity_at = Utc::now();
    }

    pub fn record_suspicious_event(&mut self) {
        self.left_screen_count += 1;
    }

    pub fn disconnect(&mut self) {
        self.is_online = false;
    }

    pub fn reconnect(&mut self) {
        self.is_online = true;
        self.record_activity();
    }

    pub fn is_inactive(&self, threshold_seconds: i64) -> bool {
        let now = Utc::now();
        let inactive_duration = now.signed_duration_since(self.last_activity_at);
        inactive_duration.num_seconds() > threshold_seconds
    }
}

impl SuspiciousEvent {
    pub fn new(
        player_id: Uuid,
        event_type: SuspiciousEventType,
        duration_ms: Option<i64>,
    ) -> Self {
        Self {
            id: Uuid::new_v4(),
            player_id,
            event_type,
            timestamp: Utc::now(),
            duration_ms,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_player_activity_tracking() {
        let mut player = Player::new(
            Uuid::new_v4(),
            "Test Student".to_string(),
            false,
        );

        assert!(player.is_online);
        assert_eq!(player.left_screen_count, 0);

        player.record_suspicious_event();
        assert_eq!(player.left_screen_count, 1);

        player.disconnect();
        assert!(!player.is_online);

        player.reconnect();
        assert!(player.is_online);
    }

    #[test]
    fn test_inactivity_detection() {
        use std::thread;
        use std::time::Duration;

        let mut player = Player::new(
            Uuid::new_v4(),
            "Test".to_string(),
            false,
        );

        // Initially not inactive
        assert!(!player.is_inactive(1));

        // Simulate 2 seconds passing
        thread::sleep(Duration::from_secs(2));

        // Now should be inactive
        assert!(player.is_inactive(1));
    }
}
