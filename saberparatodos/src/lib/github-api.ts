/**
 * GitHub API Service for Leaderboard IssueOps
 *
 * Handles automatic issue creation for score submissions
 * using GitHub's OAuth token from Supabase auth
 */

import { supabase } from './supabase';
import type { ScoreSubmissionInput } from './leaderboard-service';

// Configuration
const GITHUB_REPO_OWNER = 'worldexams';
const GITHUB_REPO_NAME = 'saberparatodos';
const GITHUB_API_URL = 'https://api.github.com';

/**
 * Get the GitHub OAuth token from Supabase session
 * Requires GitHub provider to be configured in Supabase with proper scopes
 */
export async function getGitHubToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    console.log('No GitHub token available. User may need to re-authenticate.');
    return null;
  }

  return session.provider_token;
}

/**
 * Check if the current user has GitHub authentication
 */
export async function hasGitHubAuth(): Promise<boolean> {
  const token = await getGitHubToken();
  return token !== null;
}

/**
 * Create a GitHub Issue for score submission
 */
export async function createScoreIssue(score: ScoreSubmissionInput): Promise<{
  success: boolean;
  issueNumber?: number;
  issueUrl?: string;
  error?: string;
}> {
  const token = await getGitHubToken();

  if (!token) {
    return {
      success: false,
      error: 'No GitHub token available. Please sign in with GitHub.'
    };
  }

  const issueBody = `### Anonymous ID
${score.anonymousId}

### Display Name
${score.displayName}

### Grade
${score.grade}

### Region
${score.region}

### Total Points
${score.totalPoints}

### Questions Answered
${score.questionsAnswered}

### Correct Answers
${score.correctAnswers}

### Exam Duration (ms)
${score.examDurationMs}

### Timestamp
${score.timestamp}

### Score Checksum
${score.checksum || 'N/A'}

---
*This issue was automatically created by the exam platform.*
`;

  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'WorldExams-Leaderboard'
        },
        body: JSON.stringify({
          title: `Score: ${score.displayName} - ${score.totalPoints}`,
          body: issueBody,
          labels: ['score-submission']
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API error:', response.status, errorData);

      if (response.status === 401) {
        return {
          success: false,
          error: 'GitHub token expired. Please sign in again.'
        };
      }

      if (response.status === 403) {
        return {
          success: false,
          error: 'Permission denied. The app needs write access to issues.'
        };
      }

      return {
        success: false,
        error: `GitHub API error: ${response.status}`
      };
    }

    const data = await response.json();

    return {
      success: true,
      issueNumber: data.number,
      issueUrl: data.html_url
    };
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    return {
      success: false,
      error: 'Network error while creating issue'
    };
  }
}

/**
 * Get the manual submission URL (fallback for users without GitHub auth)
 */
export function getManualSubmissionUrl(score: ScoreSubmissionInput): string {
  const baseUrl = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues/new`;
  const params = new URLSearchParams({
    template: 'score_submission.yml',
    title: `Score: ${score.displayName} - ${score.totalPoints}`,
    labels: 'score-submission'
  });

  return `${baseUrl}?${params.toString()}`;
}
