import fs from "node:fs";
import path from "node:path";

export const ARTIFACTS_ROOT = path.resolve(__dirname, "../test-artifacts");
export const REPORTS_ROOT = path.join(ARTIFACTS_ROOT, "reports");
export const VIDEOS_ROOT = path.join(ARTIFACTS_ROOT, "test-videos");
export const VIDEOS_TMP = path.join(VIDEOS_ROOT, ".tmp");

export function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}
export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
export function scenarioDirs(featureName: string, scenarioName: string) {
  const base = path.join(
    VIDEOS_ROOT,
    slugify(featureName),
    slugify(scenarioName),
  );
  const screenshots = path.join(base, "screenshots");
  const logs = path.join(base, "logs");
  ensureDir(screenshots);
  ensureDir(logs);
  return { base, screenshots, logs };
}
export function findVideoForCid(cid: string): string | null {
  if (!fs.existsSync(VIDEOS_TMP)) return null;
  const files = fs
    .readdirSync(VIDEOS_TMP)
    .filter(f => f.endsWith(".mp4") && f.includes(cid))
    .map(f => path.join(VIDEOS_TMP, f));
  if (!files.length) return null;
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0];
}
