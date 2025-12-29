interface Env {
  // Define environment variables if needed
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // 1. Configuration (Weekly Rotation)
  const ROTATION_DAYS = 7;

  // 2. Calculate current week of the year
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const weekIndex = Math.floor(dayOfYear / 7) + 1;
  const weekStr = weekIndex.toString().padStart(2, '0');

  // 3. Determine next rotation time (next Monday 00:00 or exactly 7 days)
  // For simplicity, we just add the remaining days in the week
  const daysPassedInWeek = dayOfYear % 7;
  const daysToNextRotation = 7 - daysPassedInWeek;
  const nextRotationDate = new Date(now.getTime() + (daysToNextRotation * oneDay));
  nextRotationDate.setHours(0, 0, 0, 0);

  // 4. Generate deterministic Pack ID
  const packId = `PACK-${year}-W${weekStr}`;

  // 5. Construct Response
  const responseData = {
    pack_id: packId,
    generated_at: new Date().toISOString(),
    next_rotation: nextRotationDate.toISOString(),
    rotation_days: ROTATION_DAYS,
    grades: [3, 5, 6, 7, 8, 9, 10, 11],
    country: 'co',
    exam: 'icfes'
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
