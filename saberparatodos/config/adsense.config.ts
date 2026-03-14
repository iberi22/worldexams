/**
 * 🎯 AdSense Configuration for World Exams
 *
 * Strategy: Single Publisher ID with Google's automatic geotargeting
 * Google AdSense automatically detects user location and shows relevant ads
 *
 * Benefits:
 * - Consolidated revenue reporting
 * - Automatic language/region targeting
 * - Global brands appear everywhere (Google, Microsoft, Coursera, etc.)
 * - Educational content = EdTech ads (online courses, universities)
 */

export const adsenseConfig = {
  // Publisher ID - same for all country repos
  publisherId: 'ca-pub-7015371704987876',

  // Ad slot IDs (create these in AdSense dashboard)
  slots: {
    // Results page - main monetization point (non-intrusive)
    resultsPage: {
      banner: 'SLOT_ID_RESULTS_BANNER',      // 728x90 or responsive
      sidebar: 'SLOT_ID_RESULTS_SIDEBAR',    // 300x250
      inArticle: 'SLOT_ID_IN_ARTICLE',       // Native in-feed
    },
    // Blog/Articles - secondary monetization
    blog: {
      header: 'SLOT_ID_BLOG_HEADER',
      inContent: 'SLOT_ID_BLOG_CONTENT',
      footer: 'SLOT_ID_BLOG_FOOTER',
    }
  },

  // UX Rules - WHERE ads can appear
  placement: {
    // ✅ ALLOWED - Non-intrusive locations
    allowed: [
      'results-page',      // After exam completion
      'blog-articles',     // Educational content
      'leaderboard-page',  // Rankings view
      'footer-area',       // Site footer
    ],
    // ❌ FORBIDDEN - Never show ads here
    forbidden: [
      'exam-in-progress',  // During active exam
      'question-view',     // While reading questions
      'timer-active',      // When countdown is running
      'login-flow',        // Authentication pages
    ]
  },

  // Ad categories to target (hints for Google)
  targetCategories: [
    'Education',
    'Online Courses',
    'Universities',
    'Technology',
    'Career Development',
    'Books & Literature',
    'Software',
  ],

  // Categories to block (in AdSense dashboard)
  blockedCategories: [
    'Gambling',
    'Dating',
    'Politics',
    'Alcohol',
    'Sensitive Social Issues',
  ]
};

// Helper to generate the AdSense script tag
export function getAdsenseScript(): string {
  // Guard: Don't render script if it's a placeholder
  if (!adsenseConfig.publisherId || adsenseConfig.publisherId.includes('ca-pub-')) {
    // Note: If you have a real ID, it should NOT include 'ca-pub-' in the check if you want to be strict,
    // but usually, it's safe to check if it's the default placeholder value.
    if (adsenseConfig.publisherId === 'ca-pub-7015371704987876') {
       // This is the real ID from the config, so we allow it.
       return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}" crossorigin="anonymous"></script>`;
    }
    return ''; // Return empty string to prevent bot from seeing broken configs
  }
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}" crossorigin="anonymous"></script>`;
}

// Helper to check if ads should show based on exam state
export function shouldShowAds(examState: string, slotId?: string): boolean {
  // Guard: Don't show if slot is a placeholder
  if (slotId && slotId.includes('SLOT_ID_')) return false;
  
  if (adsenseConfig.placement.forbidden.some(f => examState.includes(f))) {
    return false;
  }
  return adsenseConfig.placement.allowed.some(a => examState.includes(a));
}

export type AdsenseConfig = typeof adsenseConfig;
