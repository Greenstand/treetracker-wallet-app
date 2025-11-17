// .releaserc.js (at repo root)

export default {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "chore", release: "patch" },
          { type: "ci", release: "patch" },
          { type: "style", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "test", release: "patch" },
          { type: "build", release: "patch" },
          { type: "*", release: "patch" },
        ],
      },
    ],

    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],

    // Bump package.json version at root without publishing to npm
    ["@semantic-release/npm", { npmPublish: false, pkgRoot: "." }],

    // Also bump apps/user/package.json so Docker tags & app version stay in sync without publishing to npm
    ["@semantic-release/npm", { npmPublish: false, pkgRoot: "apps/user" }],

    // Commit all bumped package.json + CHANGELOG back to the repo
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json", // root
          "apps/user/package.json", // user app
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],

    "@semantic-release/github",
  ],

  // unified monorepo release, use plain "v1.2.3"
  tagFormat: "v${version}",
};
