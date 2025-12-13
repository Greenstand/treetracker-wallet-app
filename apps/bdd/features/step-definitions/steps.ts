/**
 * steps.ts
 */

// ============================================================================
// Imports
// ============================================================================
import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

// ============================================================================
// ROUTES
// ============================================================================
const routes: Record<string, string> = {
  login: "login",
  register: "signup", // change to "register" ONLY if /signup doesn't work
};

// ============================================================================
// COMMON
// ============================================================================
Given(/^I am on the (\w+) page$/, async (page: string) => {
  const route = routes[page.toLowerCase()];
  if (!route) throw new Error(`Unknown page alias: ${page}`);

  const baseUrl = process.env.E2E_BASE_URL || "http://localhost:3000";
  await browser.url(`${baseUrl}/${route}`);
});

// ============================================================================
// LOGIN
// ============================================================================
When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  const usernameInput = await $('input[name="username"]');
  const passwordInput = await $('input[name="password"]');
  const submitButton = await $('button[type="submit"]');

  await usernameInput.waitForDisplayed({ timeout: 10000 });
  await passwordInput.waitForDisplayed({ timeout: 10000 });
  await submitButton.waitForClickable({ timeout: 10000 });

  await usernameInput.setValue(username);
  await passwordInput.setValue(password);
  await submitButton.click();
});

Then(/^I should see text (.*)$/, async message => {
  await browser.waitUntil(
    async () => {
      const bodyText = await $("body").getText();
      return new RegExp(message, "i").test(bodyText);
    },
    {
      timeout: 5000,
      timeoutMsg: `Expected text "${message}" not found`,
    },
  );
});

// ============================================================================
// REGISTER
// ============================================================================
When(
  /^I fill in the registration form with \[random user name\]@greenstand\.org password:\s*(.+)$/,
  async (password: string) => {
    const ts = Date.now();
    const username = `user${ts}`;
    const email = `${username}@greenstand.org`;

    const usernameInput = await $('[data-test="signup-username"] input');
    const emailInput = await $('[data-test="signup-email"] input');
    const passwordInput = await $('[data-test="signup-password"] input');

    await usernameInput.waitForDisplayed({ timeout: 10000 });
    await emailInput.waitForDisplayed({ timeout: 10000 });
    await passwordInput.waitForDisplayed({ timeout: 10000 });

    await usernameInput.setValue(username);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
  },
);

When(/^I click on the register button$/, async () => {
  const submitButton = await $('button[type="submit"]');
  await submitButton.waitForClickable({ timeout: 10000 });
  await submitButton.click();
});

Then(/^I should see a confirmation message$/, async () => {
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();

      // Condition 1: redirected to login page
      if (url.includes("/login")) return true;

      // Condition 2: login form is visible
      const usernameInput = await $('input[name="username"]');
      if (await usernameInput.isExisting()) return true;

      return false;
    },
    {
      timeout: 10000,
      timeoutMsg: "Signup did not redirect to login page",
    },
  );
});
