## 2026-08-13 - Prevent DoS via RateLimit Map Leak
**Vulnerability:** Unbounded memory growth in in-memory rate limiting Maps (DoS).
**Learning:** Naively storing rate limit IPs in a JS Map without eviction causes memory leaks, as entries never expire.
**Prevention:** Periodically sweep the Map (e.g., using a probability check like Math.random() < 0.05) to clear expired entries and cap memory consumption.
