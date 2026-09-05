export interface BuildInfo {
  version?: string;
  commit?: string;
  timestamp?: number;
  buildTime?: number;
  iso?: string;
  env?: string;
}

/**
 * Compares two semantic version strings (e.g. "0.15.1" vs "0.15.2").
 * Returns true if remote is strictly newer than local.
 */
export function isNewerVersion(local: string, remote: string): boolean {
  if (!local || !remote) return false;

  const localParts = local.split('.').map(Number);
  const remoteParts = remote.split('.').map(Number);

  for (let i = 0; i < Math.max(localParts.length, remoteParts.length); i++) {
    const l = Number.isNaN(localParts[i]) ? 0 : localParts[i] || 0;
    const r = Number.isNaN(remoteParts[i]) ? 0 : remoteParts[i] || 0;
    if (r > l) return true;
    if (r < l) return false;
  }
  return false;
}

/**
 * Determines whether remote build info indicates a newer deployment than local build info.
 * Priority:
 * 1. Semantic version check (remote version > local version).
 * 2. Commit hash check (if commits are provided and differ).
 * 3. Timestamp check as fallback (remote build timestamp > local build timestamp).
 */
export function isNewerBuild(local: BuildInfo | null, remote: BuildInfo | null): boolean {
  if (!local || !remote) return false;

  // 1. Semver check
  if (local.version && remote.version) {
    if (isNewerVersion(local.version, remote.version)) {
      return true;
    }
    // If remote version is older than local version, don't flag as newer
    if (isNewerVersion(remote.version, local.version)) {
      return false;
    }
  }

  // 2. Commit hash check
  const localCommit = local.commit?.trim();
  const remoteCommit = remote.commit?.trim();

  if (localCommit && remoteCommit && localCommit !== 'local-build' && remoteCommit !== 'local-build') {
    if (localCommit !== remoteCommit) {
      return true;
    }
    // If commits match, check timestamp as extra fallback in case commit string was identical
  }

  // 3. Timestamp / build time check (fallback)
  const localTime = local.timestamp ?? local.buildTime ?? 0;
  const remoteTime = remote.timestamp ?? remote.buildTime ?? 0;

  if (localTime > 0 && remoteTime > 0 && remoteTime > localTime) {
    return true;
  }

  return false;
}
