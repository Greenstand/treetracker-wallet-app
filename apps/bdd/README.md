# WebdriverIO BDD Tests

This directory contains Behavior-Driven Development (BDD) end-to-end tests for the Treetracker Wallet App using WebdriverIO with Cucumber.

## Table of Contents

- [Running Tests](#running-tests)
- [Debugging Tests](#debugging-tests)
  - [Method 1: Chrome DevTools](#method-1-chrome-devtools)
  - [Method 2: VS Code Debugger](#method-2-vs-code-debugger)
  - [Debugging Options](#debugging-options)
- [Test Structure](#test-structure)
- [Viewing Test Reports](#viewing-test-reports)

## Running Tests

```bash
# Run all tests
yarn wdio

# Run tests in watch mode
yarn wdio:watch

# Run specific feature file
yarn test:login
yarn test:register

# Run with debug logging
yarn test:debug
```

## Debugging Tests

WebDriverIO tests can be debugged using Node.js's built-in inspector. This allows you to set breakpoints, inspect variables, and step through your test code.

### Method 1: Chrome DevTools

#### Step 1: Enable the Debugger

Add the `execArgv` option to your `wdio.conf.ts`:

```typescript
export const config: Options.Testrunner = {
  // ... other config
  
  // Enable Node.js debugger
  execArgv: ['--inspect'],
  
  // Optional: Pause execution at the start
  // execArgv: ['--inspect-brk'],
  
  // ... rest of config
};
```

#### Step 2: Run Your Tests

```bash
yarn wdio
```

You'll see output like:

```
Debugger listening on ws://127.0.0.1:9229/...
```

#### Step 3: Connect Chrome DevTools

1. Open Chrome browser
2. Navigate to: `chrome://inspect`
3. Click **"Open dedicated DevTools for Node"**
4. Or click on your target under **"Remote Target"**

#### Step 4: Set Breakpoints

In your test files (e.g., `features/step-definitions/steps.ts`), you can:

```typescript
Given('I am on the login page', async function() {
  debugger; // Execution will pause here
  await browser.url('/login');
});

When('I enter my credentials', async function() {
  // Set breakpoint in Chrome DevTools at this line
  await $('#username').setValue('testuser');
  await $('#password').setValue('password');
  
  // Inspect variables
  const url = await browser.getUrl();
  console.log('Current URL:', url); // View in DevTools console
});
```

### Method 2: VS Code Debugger

#### Step 1: Create Debug Configuration

Create or update `.vscode/launch.json` in your project root:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug WDIO Tests",
      "program": "${workspaceFolder}/apps/bdd/node_modules/@wdio/cli/bin/wdio.js",
      "args": ["${workspaceFolder}/apps/bdd/wdio.conf.ts"],
      "cwd": "${workspaceFolder}/apps/bdd",
      "skipFiles": ["<node_internals>/**"],
      "outputCapture": "std"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Specific Feature",
      "program": "${workspaceFolder}/apps/bdd/node_modules/@wdio/cli/bin/wdio.js",
      "args": [
        "${workspaceFolder}/apps/bdd/wdio.conf.ts",
        "--spec",
        "${workspaceFolder}/apps/bdd/features/login.feature"
      ],
      "cwd": "${workspaceFolder}/apps/bdd",
      "skipFiles": ["<node_internals>/**"],
      "outputCapture": "std"
    }
  ]
}
```

#### Step 2: Set Breakpoints in VS Code

1. Open your test file (e.g., `features/step-definitions/steps.ts`)
2. Click in the left gutter next to a line number to set a breakpoint (red dot will appear)
3. Press **F5** or click **"Run and Debug"** in the sidebar
4. Select **"Debug WDIO Tests"** from the dropdown

#### Step 3: Use Debug Controls

- **Continue (F5)**: Resume execution until next breakpoint
- **Step Over (F10)**: Execute current line and move to next
- **Step Into (F11)**: Step into function calls
- **Step Out (Shift+F11)**: Step out of current function
- **Restart (Ctrl+Shift+F5)**: Restart debugging session
- **Stop (Shift+F5)**: Stop debugging

### Debugging Options

You can customize the debugger behavior in `wdio.conf.ts`:

```typescript
export const config: Options.Testrunner = {
  // Basic inspector (starts immediately)
  execArgv: ['--inspect'],
  
  // Pause execution at the very start (useful for debugging initialization)
  // execArgv: ['--inspect-brk'],
  
  // Use a specific port
  // execArgv: ['--inspect=localhost:9230'],
  
  // Multiple flags
  // execArgv: ['--inspect', '--max-old-space-size=4096'],
  
  // When debugging, run only one test at a time
  maxInstances: 1,
  
  // Disable retries during debugging
  specFileRetries: 0,
};
```

### Best Practices for Debugging

1. **Run one test at a time**: Set `maxInstances: 1` when debugging
2. **Use descriptive console.log**: Add context to your logs
3. **Disable headless mode**: See what's happening in the browser
   ```typescript
   capabilities: [{
     browserName: 'chrome',
     'goog:chromeOptions': {
       // Remove --headless to see browser during debugging
       args: ['--disable-gpu', '--window-size=1920,1080'],
     },
   }]
   ```
4. **Add strategic debugger statements**: Place them before complex operations
5. **Inspect async operations**: Use the debugger to understand promise resolution

### Common Debugging Scenarios

#### Debug a Failing Step

```typescript
When('I submit the form', async function() {
  debugger; // Pause here to inspect state before action
  
  const submitButton = await $('button[type="submit"]');
  const isDisplayed = await submitButton.isDisplayed();
  console.log('Submit button visible?', isDisplayed);
  
  await submitButton.click();
  
  // Pause after action to inspect results
  debugger;
});
```

#### Debug Element Selectors

```typescript
Then('I should see a welcome message', async function() {
  debugger;
  
  // Try different selectors
  const message1 = await $('.welcome-message');
  const message2 = await $('[data-testid="welcome"]');
  
  console.log('Message 1 exists?', await message1.isExisting());
  console.log('Message 2 exists?', await message2.isExisting());
});
```

#### Debug Timing Issues

```typescript
When('I wait for the dashboard to load', async function() {
  debugger;
  
  // Check element state at each step
  const spinner = await $('.loading-spinner');
  console.log('Spinner exists?', await spinner.isExisting());
  
  await browser.waitUntil(
    async () => !(await spinner.isDisplayed()),
    { timeout: 5000 }
  );
  
  debugger; // Verify spinner is gone
});
```

## Test Structure

```
apps/bdd/
├── features/              # Gherkin feature files
│   ├── *.feature         # Feature definitions
│   ├── step-definitions/ # Step implementations
│   └── iteration*/       # Organized by iteration
├── scripts/              # Utility scripts
├── test-artifacts/       # Test outputs
│   ├── reports/         # Cucumber reports
│   └── test-videos/     # Recorded test videos
└── wdio.conf.ts         # WebdriverIO configuration
```

## Viewing Test Reports

After running tests, you can view HTML reports:

```bash
# Generate and view Cucumber HTML report
yarn report:cucumber
```

Reports are generated in `test-artifacts/reports/cucumber-html/`.

## Troubleshooting

### Debugger Not Connecting

- Ensure no other process is using port 9229
- Try a different port: `execArgv: ['--inspect=localhost:9230']`
- Check firewall settings

### Tests Run Too Fast

- Use `execArgv: ['--inspect-brk']` to pause at the start
- Add `debugger;` statements strategically
- Reduce `maxInstances: 1` in config

### Can't See Browser

- Remove `--headless` from Chrome options in `wdio.conf.ts`
- Add delays: `await browser.pause(2000)`

## Additional Resources

- [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)

