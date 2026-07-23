export const CAPABILITY_WEB_CHROME = [
  {
    browserName: "chrome",
    // Classic WebDriver (not BiDi): avoids the "node belongs to different document"
    // stale-element churn after the cross-origin redirect to Keycloak's pages.
    "wdio:enforceWebDriverClassic": true,
    "goog:chromeOptions": {
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--start-maximized",
        // Headless by default so CI (which has no display) can launch Chrome.
        // Set HEADED=1 locally to watch the browser while the test runs.
        // (Explicit "1" check: any non-empty env value — e.g. "0" — is truthy.)
        ...(process.env.HEADED === "1" ? [] : ["--headless=new"]),
        "--window-size=1920,1080",
      ],
    },
  },
];

export const CAPABILITY_WEB_CHROME_FOR_DEBUG = [
  {
    browserName: "chrome",
    // Use classic WebDriver (not BiDi) — avoids the "node belongs to different
    // document" stale-element churn after the cross-origin redirect to Keycloak.
    "wdio:enforceWebDriverClassic": true,
    "goog:chromeOptions": {
      args: [
        "--disable-gpu",
        "--start-maximized",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--auto-open-devtools-for-tabs",
      ],
    },
  },
];

export const CAPABILITY_ANDROID = [
  {
    platformName: "Android",
    "appium:deviceName": "Pixel_9a",
    "appium:isHeadless": true,
    "appium:app": `${process.env.PROJECT_ROOT_ANDROID}/android/app/build/outputs/apk/debug/app-debug.apk`,
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.gtw.app",
    "appium:appActivity": "com.gtw.app.MainActivity",
    "appium:noReset": true,
    "appium:newCommandTimeout": 240,
    "appium:appWaitPackage": "*",
    "appium:debugLogLevel": "debug",
    "appium:appWaitForLaunch": false,
  },
];

export const CAPABILITY_IOS = [
  {
    platformName: "iOS",
    "appium:deviceName": "iPhone 17 Pro",
    "appium:platformVersion": "26.1",
    "appium:automationName": "XCUITest",
    "appium:app": `${process.env.PROJECT_ROOT_IOS}`,
    "appium:autoGrantPermissions": true,
    "appium:noReset": true,
    "appium:newCommandTimeout": 240,
    "appium:appWaitPackage": "*",
    "appium:debugLogLevel": "debug",
    "appium:appWaitForLaunch": false,
  },
];
