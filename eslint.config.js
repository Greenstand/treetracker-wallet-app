// eslint.config.js (ESLint v9 flat config)

export default [
  {
    // Ignore BDD tests & build artifacts
    ignores: ["node_modules/**", ".next/**", "dist/**", "apps/bdd/**"],
  },
];
