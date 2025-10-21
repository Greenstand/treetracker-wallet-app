/**
 * Run BDD tests and ALWAYS generate the HTML report.
 * - Executes `yarn test`, then `yarn report:cucumber` regardless of pass/fail.
 * - Exits with the original test exit code (so CI still reflects failures).
 * Usage: from root `yarn bdd:test:report`, `yarn bdd:test:report:local`, or here `yarn test:report`.
 */
const { spawn } = require("node:child_process");

function run(cmd, args) {
  return new Promise(resolve => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false });
    p.on("close", code => resolve(code ?? 0));
  });
}

(async () => {
  // Accept an optional script name (e.g., "test:local"); default to "test"
  const which = (process.argv[2] || "test").trim();

  // Basic guard: only allow scripts that start with "test"
  const testScript = which.startsWith("test") ? which : "test";

  const testExit = await run("yarn", [testScript]); // run chosen test script
  await run("yarn", ["report:cucumber"]); // always generate report
  process.exit(testExit); // preserve test exit code
})();
