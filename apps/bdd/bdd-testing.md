# BDD Test Reports — Web & Android

This document explains how to run the end-to-end BDD test suite and generate HTML reports for the **Web** and **Android** platforms.

---

## Prerequisites

| Tool | Required for |
|------|-------------|
| Node.js ≥ 20 + Yarn 4 | All platforms |
| Running `yarn web:dev` (localhost:3000) | Web tests |
| Running `yarn user:dev` (localhost:8080) | Web tests (registration/login API) |
| Android emulator running (e.g. `Pixel_9a`) | Android tests |
| Appium server running (`appium`) | Android tests |

---

## Web Tests

### 1. Start required services

```bash
# Terminal 1 — User API (backend)
yarn user:dev

# Terminal 2 — Next.js web app
yarn web:dev
```

### 2. Run tests + generate HTML report

```bash
yarn bdd:test:web:report
```

This runs all `@web`-tagged scenarios (login, register, create-wallet) and automatically generates an HTML report.

### 3. View the report

```
apps/bdd/test-artifacts/reports/web/cucumber-html/index.html
```

Open it in a browser:

```bash
open apps/bdd/test-artifacts/reports/web/cucumber-html/index.html
```

---

## Android Tests

### 1. Start required services

```bash
# Terminal 1 — Start Appium server
appium

# Terminal 2 — Start Android emulator (or launch manually via Android Studio)
yarn native:android
```

### 2. Run tests + generate HTML report

```bash
yarn bdd:test:android:report
```

This runs all `@native`-tagged scenarios against the Android emulator and generates an HTML report.

### 3. View the report

```
apps/bdd/test-artifacts/reports/android/cucumber-html/index.html
```

Open it in a browser:

```bash
open apps/bdd/test-artifacts/reports/android/cucumber-html/index.html
```

---

## Report locations summary

| Platform | Report path |
|----------|-------------|
| Web | `apps/bdd/test-artifacts/reports/web/cucumber-html/index.html` |
| Android | `apps/bdd/test-artifacts/reports/android/cucumber-html/index.html` |
| iOS | `apps/bdd/test-artifacts/reports/ios/cucumber-html/index.html` |

---

## Available BDD scripts

| Script | Description |
|--------|-------------|
| `yarn bdd:test:web:report` | Run web tests + generate report |
| `yarn bdd:test:android:report` | Run Android tests + generate report |
| `yarn bdd:e2e:login` | Run login feature only (web) |
| `yarn bdd:e2e:register` | Run register feature only (web) |
| `yarn bdd:e2e:wallet` | Run create-wallet feature only (web) |
| `yarn bdd:e2e:debug` | Run web tests in debug mode |
