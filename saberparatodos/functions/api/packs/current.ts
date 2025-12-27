interface Env {
  // Define environment variables if needed
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // 1. Configuration
  const ROTATION_DAYS = 5;
  const ROTATION_SECONDS = ROTATION_DAYS * 24 * 60 * 60;
  const EPOCH_START = 1704067200; // 2024-01-01 00:00:00 UTC (Reference point)

  // 2. Calculate current rotation window
  const now = Math.floor(Date.now() / 1000);
  const timeSinceEpoch = now - EPOCH_START;
  const rotationIndex = Math.floor(timeSinceEpoch / ROTATION_SECONDS);

  // 3. Determine next rotation time
  const nextRotationTimestamp = EPOCH_START + ((rotationIndex + 1) * ROTATION_SECONDS);
  const nextRotationDate = new Date(nextRotationTimestamp * 1000).toISOString();

  // 4. Generate deterministic Pack ID
  // ID format: PACK-{YEAR}-W{INDEX}
  // We use the index to select from a virtual infinite list of packs
  const year = new Date().getFullYear();
  const packId = `PACK-${year}-W${rotationIndex}`;

  // 5. Construct Response
  const responseData = {
    pack_id: packId,
    generated_at: new Date().toISOString(),
    next_rotation: nextRotationDate,
    rotation_days: ROTATION_DAYS,
    grades: [3, 5, 6, 7, 8, 9, 10, 11],
    country: 'co', // Default country
    exam: 'icfes'  // Default exam
  };

  // 6. Return JSON response
  return new Response(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // allow CORS
      "Cache-Control": "public, max-age=300" // Cache for 5 minutes at edge
    }
  });
};
