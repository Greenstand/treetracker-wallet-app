import path from "node:path";

export const CAPABILITY_WEB_CHROME = [
  {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: ["--headless", "--disable-gpu", "--window-size=1920,1080"],
    },
  },
];

export const CAPABILITY_WEB_CHROME_FOR_DEBUG = [
  {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: [
        "--disable-gpu",
        "--window-size=1920,1080",
        "--auto-open-devtools-for-tabs",
      ],
    },
  },
];

const ANDROID_APP_PATH =
  process.env.ANDROID_APP_PATH ||
  path.resolve(
    process.cwd(),
    "..",
    "treetracker-android",
    "app",
    "build",
    "outputs",
    "apk",
    "release",
    "app-release.apk",
  );

export const CAPABILITY_ANDROID = [
  {
    platformName: "Android",
    "appium:deviceName": "Pixel_9a",
    "appium:app": ANDROID_APP_PATH,
    "appium:automationName": "UiAutomator2",
    "appium:ignoreHiddenApiPolicyError": true,
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
