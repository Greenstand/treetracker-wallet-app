# 🚀 E2E Testing with Appium, WebdriverIO & Cucumber

This guide explains how to set up and run E2E tests for the native app using
Appium, WebdriverIO, and Cucumber (Gherkin) in a monorepo project.

## ⚡ Quick Commands

| Step                        | Command                 |
| --------------------------- | ----------------------- |
| Install dependencies        | `yarn install`          |
| Install Appium globally     | `npm install -g appium` |
| Start Appium server         | `appium`                |
| Start Expo                  | `yarn native:start`     |
| Build & install Android app | `yarn native:android`   |
| Build & install iOS app     | `yarn native:ios`       |
| Run WebdriverIO tests       | `yarn wdio:native:test` |

## 🧱 1. Install Dependencies (once)

```bash
yarn install       # Root level (monorepo)
npm install -g appium  # Install Appium globally (v3.1.0)
```

## 🤖 2. Start Appium Server

```bash

appium  # Run at root level
```

## 📱 3. Build & Install Native App

Android:

```bash
yarn native:android
```

iOS:

```bash
yarn native:ios
```

## 🧪 4. Run WebdriverIO E2E Tests

```bash
yarn wdio:native:test  # From root level
```

## 🔧 5. Appium Inspector Setup

##### Method 1: Web-based Inspector

Go to https://inspector.appiumpro.com/ Start Appium server: npx appium
--base-path / --port 4724 Configure connection: Remote Path: / Host: 127.0.0.1
Port: 4724

##### Method 2: Desktop App

Download from: https://github.com/appium/appium-inspector/releases

## ⚙️ 6. Capabilities

iOS (in progress):

```json
Copy code
{
  // platformName: "iOS",
  // appium:deviceName: "iPhone 16",
  // appium:platformVersion: "18.5",
  // appium:automationName: "XCUITest",
  // appium:app: "com.gsw.app",
  // appium:autoGrantPermissions: true,
  // appium:noReset: true
}
```

Android:

```json
{
  "platformName": "Android",
  "appium:deviceName": "Pixel_9a",
  "appium:app": "${process.env.PROJECT_ROOT}/android/app/build/outputs/apk/debug/app-debug.apk",
  "appium:automationName": "UiAutomator2",
  "appium:appPackage": "com.gtw.app",
  "appium:appActivity": "com.gtw.app.MainActivity",
  "appium:noReset": false,
  "appium:newCommandTimeout": 240,
  "appium:appWaitPackage": "*",
  "appium:debugLogLevel": "debug",
  "appium:appWaitForLaunch": false
}
```

💡 PROJECT_ROOT = absolute path to your project root. Examples: macOS/Linux:
/Users/user/dev/treetracker-wallet-app, Windows:
C:\\Users\\user\\dev\\treetracker-wallet-app

## 7. 📚 Additional Resource

- [Appium Documentation](https://appium.io/docs/en/latest/)
- [WebdriverIO Appium Service](https://webdriver.io/docs/appium-service/)
- [Cucumber with WebdriverIO](https://webdriver.io/docs/cucumber-framework/)
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Expo Dev Client](https://docs.expo.dev/clients/introduction/)

## 8. ⚠️ Troubleshooting

- Make sure to start the Expo app using `yarn native:start`
- Ensure that the Appium Dev Server is running before starting the Appium tests.
- Ensure you build the project after making changes.
- Verify that the correct device/emulator is selected and running.
- Check Appium server logs for any connection issues.
- Make sure the app is installed on the device/emulator before running tests.
- If tests fail to locate elements, verify the selectors used in the test
  scripts.
