/**
 * Run BDD tests and ALWAYS generate the HTML report.
 * - Executes the selected yarn BDD test script
 * - Always runs `yarn report:cucumber`
 * - Preserves the original exit code for CI
 *
 * Usage:
 *   yarn test:web:report
 *   yarn test:native:android", "test:native:ios", "test:web:local:report
 *   node bdd-test-report.js test:web
 *   node bdd-test-report.js test:native:android", "test:native:ios", "test:web:local
 */

const { spawn } = require("node:child_process");

function run(cmd, args) {
  return new Promise(resolve => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false });
    p.on("close", code => resolve(code ?? 0));
  });
}

(async () => {
  const script = (process.argv[2] || "test:web").trim();

  const ALLOWED = new Set(["test:web", "test:native:android"]);

  const testScript = ALLOWED.has(script) ? script : "test:web";

  const testExitCode = await run("yarn", [testScript]);

  await run("yarn", ["report:cucumber"]);

  process.exit(testExitCode);
})();
