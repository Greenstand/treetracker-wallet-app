# BDD Tests for Treetracker Wallet App

This package contains WebdriverIO-based Behavior-Driven Development (BDD) tests using Cucumber for the Treetracker Wallet App.

## Quick Start

```bash
# Install dependencies (from monorepo root)
yarn install

# Run all BDD tests
yarn bdd:e2e

# Run with watcher for development
yarn bdd:watch
```

## Test Watcher

The watcher tool improves the development experience by automatically re-running tests when files change. It includes proper process management to handle `browser.debug()` sessions and other long-running processes.

### Features

| Feature | Description |
|---------|-------------|
| Smart Spec Detection | Automatically runs only the changed feature file |
| Interactive Commands | Control test execution with keyboard shortcuts |
| Test Statistics | Track pass/fail history and execution times |
| Re-run Failed | Quickly re-run only previously failed tests |
| Tag Filtering | Run tests filtered by Cucumber tags |
| Pause/Resume | Temporarily stop file watching |
| Auto-open Reports | Automatically open HTML reports after test runs |

### Usage

From the **monorepo root**:

```bash
# Watch all tests with debug config
yarn bdd:watch

# Watch with web config (faster, less verbose)
yarn bdd:watch:web

# Show help
yarn bdd:watch --help
```

From the **BDD app directory** (`apps/bdd`):

```bash
# Watch all tests
yarn watch

# Watch specific feature
yarn watch --spec login

# Watch with Cucumber tags
yarn watch --tags "@smoke"
yarn watch --tags "@web and @login"

# Skip initial test run (wait for file changes)
yarn watch --no-initial

# Auto-open report after each run
yarn watch --open-report

# Combine multiple options
yarn watch --spec register --tags "@smoke" --open-report
```

### Interactive Commands

While the watcher is running, use these keyboard shortcuts:

| Key | Action |
|-----|--------|
| `Enter` | Re-run all tests |
| `r` | Re-run last changed file only |
| `f` | Re-run failed tests only |
| `o` | Open HTML test report in browser |
| `c` | Clear screen |
| `p` | Pause/Resume file watching |
| `s` | Show test statistics |
| `l` | List available feature files |
| `h` | Show help |
| `q` | Quit watcher |

### CLI Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help message |
| `--spec <name>` | `-s` | Filter tests by feature name |
| `--tags <tags>` | `-t` | Filter by Cucumber tags |
| `--config <path>` | `-c` | Path to WDIO config file |
| `--debounce <ms>` | `-d` | Debounce delay in milliseconds (default: 800) |
| `--debug` | | Use debug config (default) |
| `--web` | | Use web config |
| `--no-clear` | | Don't clear screen between runs |
| `--no-sound` | | Disable sound notifications |
| `--no-initial` | | Don't run tests on startup |
| `--open-report` | | Auto-open HTML report after tests |
| `--instances <n>` | | Max parallel browser instances |

### Smart Spec Detection

When you edit a `.feature` file, the watcher automatically runs only that specific feature instead of all tests. This significantly speeds up the feedback loop during development.

```
Changed: features/login.feature
  -> Running only login.feature
```

### Test Statistics

Press `s` to view session statistics:

```
+----------------------------------------+
|           Test Statistics              |
+----------------------------------------+
  Total Runs:    12
  Passed:        10
  Failed:        2
  Pass Rate:     83.3%
  Avg Duration:  45.2s
+----------------------------------------+
```

## Available Scripts

### Test Execution

```bash
# Run all web tests
yarn test:web

# Run specific feature tests
yarn test:web:login
yarn test:web:register
yarn test:web:wallet

# Run with debug mode (verbose output, extended timeouts)
yarn test:web:debug

# Run against local server
yarn test:web:local

# Run headless
yarn test:web:headless
```

### Mobile Tests

```bash
# Run Android tests
yarn test:native:android

# Run iOS tests
yarn test:native:ios
```

### Reports

```bash
# Generate HTML report from existing JSON
yarn report:cucumber

# Run tests and generate report
yarn test:report
```

## Project Structure

```
apps/bdd/
├── features/               # Feature files and step definitions
│   ├── *.feature          # Cucumber feature files
│   ├── step-definitions/  # Step implementation files
│   └── iteration*/        # Feature iterations with documentation
├── scripts/               # Utility scripts
│   ├── watch.ts          # Test watcher tool
│   ├── bdd-test-report.js
│   └── generate-cucumber-report.js
├── utils/                 # Shared utilities
│   ├── artifacts.ts      # Test artifact management
│   └── capabilities.ts   # Browser capabilities
├── test-artifacts/        # Generated outputs (git-ignored)
│   ├── reports/          # JSON and HTML reports
│   └── test-videos/      # Recorded test videos
├── wdio.base.conf.ts     # Base configuration
├── wdio.web.conf.ts      # Web browser configuration
├── wdio.debug.conf.ts    # Debug configuration
└── wdio.mobile.conf.ts   # Mobile device configuration
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `E2E_BASE_URL` | Base URL for tests | `http://localhost:3000` |
| `WDIO_VIDEO_SETTLE_MS` | Video finalization delay (ms) | `800` |
| `WDIO_KEEP_VIDEO_JSON` | Keep video reporter JSON files | `true` |

### WebdriverIO Configurations

- **wdio.base.conf.ts**: Common settings shared by all configurations
- **wdio.web.conf.ts**: Standard web testing with Chrome
- **wdio.debug.conf.ts**: Debug mode with extended timeouts and headed browser
- **wdio.mobile.conf.ts**: Mobile device testing configuration

## Writing Tests

### Feature Files

Place feature files in `features/` with the `.feature` extension:

```gherkin
@web @smoke
Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with testuser and password123
    Then I should see text Welcome
```

### Step Definitions

Implement steps in `features/step-definitions/`:

```typescript
import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await $('input[name="username"]').setValue(username);
  await $('input[name="password"]').setValue(password);
  await $('button[type="submit"]').click();
});
```

### Debugging

Use `browser.debug()` to pause test execution and interact with the browser:

```typescript
When(/^I debug the page$/, async () => {
  await browser.debug();
});
```

The watcher properly terminates debug sessions when files change, allowing seamless re-runs.

## Troubleshooting

### ChromeDriver Version Mismatch

Update ChromeDriver to match your Chrome version:

```bash
yarn test:update-driver
```

### Stuck Processes

Kill orphaned browser and driver processes:

```bash
pkill -f chromedriver
pkill -f "Chrome.*--remote-debugging"
```

### Clear Test Artifacts

Remove generated reports and videos:

```bash
rm -rf test-artifacts
```

### Tests Re-running Unexpectedly

If tests re-run immediately after completion:
- Use `--no-initial` to skip the initial test run
- Press `p` to pause file watching while making multiple edits
- Ensure test artifacts are not triggering the watcher

## Contributing

1. Write feature files for new functionality
2. Implement step definitions following existing patterns
3. Use `yarn watch --spec <feature>` during development
4. Tag work-in-progress tests with `@wip`
5. Ensure all tests pass before submitting a pull request
