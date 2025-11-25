import { Given, Then, When } from "@wdio/cucumber-framework";
import { $, expect } from "@wdio/globals";

Given("the app is installed", async function () {
  // Appium automatically installs the APK from capabilities
  console.log("App installed successfully");
});

When("I launch the app", async function () {
  // Appium automatically launches the app
});

Then("I should see the first screen", async () => {
  const elem = await $("~onboardingScreen");
  await elem.waitForDisplayed({ timeout: 20000 });
  await expect(elem).toBeDisplayed();
});
