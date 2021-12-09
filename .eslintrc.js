module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'cypress'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': ['warn'],
    'react/display-name': ['warn'],
    'cypress/no-unnecessary-waiting': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
