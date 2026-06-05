export const CAPABILITY_WEB_CHROME = [
  {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--start-maximized",
        "--headless=new",
        "--window-size=1920,1080",
      ],
    },
  },
];

export const CAPABILITY_WEB_CHROME_FOR_DEBUG = [
  {
    browserName: "chrome",
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
