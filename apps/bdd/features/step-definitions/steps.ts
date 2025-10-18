/**
 * steps.ts
 * Sections:
 *  - [COMMON] Shared navigation & generic assertions
 *  - [LOGIN] Login flows
 *  - [REGISTER] Registration flows
 *  - [WALLET] Wallet creation & listing flows
 *  - Add more sections as needed
 */

// ============================================================================
// [COMMON] Shared Steps
// ============================================================================
//#region COMMON

import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

// Map page names to routes
const routes: Record<string, string> = {
  login: "login",
  register: "signup",
  // add more as needed
};

// Navigate to a named page (aliased → route)
Given(/^I am on the (\w+) page$/, async (page: string) => {
  const route = routes[page.toLowerCase()];
  if (!route) throw new Error(`Unknown page alias: ${page}`);
  const base = process.env.E2E_BASE_URL ?? "http://localhost:3000";
  await browser.url(`${base}/${route}`);
});

//#endregion COMMON

// ============================================================================
// [LOGIN] Login flows
// ============================================================================
//#region LOGIN

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await $('input[name="username"]').setValue(username);
  await $('input[name="password"]').setValue(password);
  await $('button[type="submit"]').click();
});

Then(/^I should see text (.*)$/, async message => {
  await $("body").waitUntil(
    async () => {
      return (await $("body").getText()).match(new RegExp(message, "i"));
    },
    {
      timeout: 5000,
      timeoutMsg: "Expected message to be displayed after 5s",
    },
  );
});

//#endregion LOGIN

// ============================================================================
// [WALLET] Wallet creation & listing flows
// ============================================================================
//#region WALLET

When(/^I fill in the wallet creation form with valid data$/, async table => {
  const data = table.rowsHash();
  await $('input[name="wallet_name"]').setValue(data.wallet_name);
  await $('input[name="password"]').setValue(data.password);
});

When(/^I click on the create wallet button$/, async () => {
  await $("button*=Create Wallet").click();
});

Then(
  /^I should see a confirmation message that my wallet has been created$/,
  async () => {
    const confirmationText = await $(".confirmation-message").getText();
    expect(confirmationText).toMatch(/Wallet created/i);
  },
);

Then(/^I should see my new wallet in the list of wallets$/, async () => {
  await expect($(".wallet-list")).toBeDisplayed();
});

// ============================================================================
// [REGISTER] Registration flows
// ============================================================================
//#region REGISTER

When(/^I fill in the registration form with valid data$/, async table => {
  const data = table.rowsHash();
  await $('[data-test="signup-username"] input').setValue(data.username);
  await $('[data-test="signup-email"] input').setValue(data.email);
  await $('[data-test="signup-password"] input').setValue(data.password);
});

When(
  /^I fill in the registration form with \[random user name\]@greenstand\.org password:\s*(.+)$/,
  async (password: string) => {
    const ts = Date.now();
    const username = `user${ts}`;
    const email = `${username}@greenstand.org`;

    // Wait for form to be ready and target the actual input elements inside the containers
    await $('[data-test="signup-username"] input').waitForDisplayed({
      timeout: 10000,
    });
    await $('[data-test="signup-email"] input').waitForDisplayed({
      timeout: 10000,
    });
    await $('[data-test="signup-password"] input').waitForDisplayed({
      timeout: 10000,
    });

    // Set values on the actual input elements
    await $('[data-test="signup-username"] input').setValue(username);
    await $('[data-test="signup-email"] input').setValue(email);
    await $('[data-test="signup-password"] input').setValue(password);
  },
);

When(/^I click on the register button$/, async () => {
  const candidates = [
    '[data-test="signup-submit-button"]',
    'form[data-test="signup-form"] button[type="submit"]',
    'button[type="submit"]',
  ];
  for (const sel of candidates) {
    const el = await $(sel);
    if (await el.isExisting()) {
      await el.click();
      return;
    }
  }
  throw new Error("Register/Sign up submit button not found");
});

When(/^I click on the social media login button$/, async table => {
  const data = table.rowsHash();
  await $(`button*=Login with ${data.social_media}`).click();
});

Then(/^I should see a confirmation message$/, async () => {
  await browser.waitUntil(
    async () => {
      // Check for success message element first
      const successElement = await $('[data-test="signup-success"]');
      if (
        (await successElement.isExisting()) &&
        (await successElement.isDisplayed())
      ) {
        return true;
      }

      // Fallback: check for redirect to login
      const url = await browser.getUrl();
      if (url.includes("/login")) return true;

      return false;
    },
    {
      timeout: 10000,
      timeoutMsg: "Expected success message or redirect to login",
    },
  );
});

//#endregion REGISTER
