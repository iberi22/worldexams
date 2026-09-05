import { describe, it, expect } from 'vitest';
import { isNewerVersion, isNewerBuild, type BuildInfo } from '../../src/lib/build-version';

describe('build-version helpers', () => {
  describe('isNewerVersion', () => {
    it('returns true when remote semver is higher', () => {
      expect(isNewerVersion('0.15.1', '0.15.2')).toBe(true);
      expect(isNewerVersion('0.15.1', '0.16.0')).toBe(true);
      expect(isNewerVersion('0.15.1', '1.0.0')).toBe(true);
    });

    it('returns false when remote semver is equal or lower', () => {
      expect(isNewerVersion('0.15.1', '0.15.1')).toBe(false);
      expect(isNewerVersion('0.15.1', '0.15.0')).toBe(false);
      expect(isNewerVersion('1.0.0', '0.9.9')).toBe(false);
    });

    it('handles empty or invalid strings gracefully', () => {
      expect(isNewerVersion('', '0.15.1')).toBe(false);
      expect(isNewerVersion('0.15.1', '')).toBe(false);
    });
  });

  describe('isNewerBuild', () => {
    it('returns false when local and remote commits and versions match (same build)', () => {
      const local: BuildInfo = {
        version: '0.15.1',
        commit: 'abc1234',
        timestamp: 1000
      };
      const remote: BuildInfo = {
        version: '0.15.1',
        commit: 'abc1234',
        timestamp: 1000
      };

      expect(isNewerBuild(local, remote)).toBe(false);
    });

    it('returns true when version is the same but commit hash is different (EL CASO DEL BUG)', () => {
      const local: BuildInfo = {
        version: '0.15.1',
        commit: 'abc1234',
        timestamp: 1000
      };
      const remote: BuildInfo = {
        version: '0.15.1',
        commit: 'def5678',
        timestamp: 2000
      };

      expect(isNewerBuild(local, remote)).toBe(true);
    });

    it('returns true when remote has higher semver version regardless of commit', () => {
      const local: BuildInfo = {
        version: '0.15.1',
        commit: 'abc1234',
        timestamp: 1000
      };
      const remote: BuildInfo = {
        version: '0.15.2',
        commit: 'abc1234',
        timestamp: 1000
      };

      expect(isNewerBuild(local, remote)).toBe(true);
    });

    it('falls back to timestamp/buildTime comparison when commit hashes match or are missing', () => {
      const localNoCommit: BuildInfo = {
        version: '0.15.1',
        timestamp: 1000
      };
      const remoteNoCommit: BuildInfo = {
        version: '0.15.1',
        timestamp: 2000
      };

      expect(isNewerBuild(localNoCommit, remoteNoCommit)).toBe(true);
    });

    it('returns false when either local or remote info is null', () => {
      const info: BuildInfo = { version: '0.15.1', commit: 'abc1234' };
      expect(isNewerBuild(null, info)).toBe(false);
      expect(isNewerBuild(info, null)).toBe(false);
    });
  });
});
