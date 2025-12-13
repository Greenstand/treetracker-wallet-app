import fs from "node:fs";
import path from "node:path";

/**
 * Root folders for test artifacts (reports + videos).
 * These are consumed by wdio.conf.ts and the report generator.
 */
export const ARTIFACTS_ROOT = path.resolve(__dirname, "../test-artifacts");
export const REPORTS_ROOT = path.join(ARTIFACTS_ROOT, "reports");
export const VIDEOS_ROOT = path.join(ARTIFACTS_ROOT, "test-videos");
// Feature bucket tracking
export const FEATURE_BUCKET_BY_CID: Record<string, string> = {};

/**
 * Temporary area used by the video reporter for MP4 output and frame cache.
 * The test runner clears this on each run.
 */
export const VIDEOS_TMP = path.join(VIDEOS_ROOT, ".tmp");

/** Create a directory tree if it doesn't exist. */
export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

/** Generate a filesystem-safe slug (lowercase, hyphenated). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Resolve (and ensure) the per-scenario artifact directories.
 * We currently store only screenshots alongside the final MP4.
 */
export function scenarioDirs(
  featureName: string,
  scenarioName: string,
): {
  base: string;
  screenshots: string;
} {
  const base = path.join(
    VIDEOS_ROOT,
    slugify(featureName),
    slugify(scenarioName),
  );
  const screenshots = path.join(base, "screenshots");

  ensureDir(screenshots);
  return { base, screenshots };
}

/**
 * Locate the most recent MP4 emitted by the video reporter for a given worker (cid).
 * Returns the absolute file path or null if none was found.
 */
export function findVideoForCid(cid: string): string | null {
  if (!fs.existsSync(VIDEOS_TMP)) return null;

  const matches = fs
    .readdirSync(VIDEOS_TMP)
    .filter(f => f.endsWith(".mp4") && f.includes(cid))
    .map(f => path.join(VIDEOS_TMP, f));

  if (matches.length === 0) return null;

  // Prefer the latest file by modification time.
  matches.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return matches[0];
}
