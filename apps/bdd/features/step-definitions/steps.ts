import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";

// Shared steps
Given(/^I am on the (\w+) page$/, async page => {
  await browser.url(
    `http://localhost:3000/${page.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`,
  );
});

// Login steps
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

// Wallet creation steps
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

// Registration steps
When(/^I fill in the registration form with valid data$/, async table => {
  const data = table.rowsHash();
  await $('input[name="email"]').setValue(data.email);
  await $('input[name="password"]').setValue(data.password);
});

When(/^I click on the register button$/, async () => {
  await $("button*=Register").click();
});

When(/^I click on the social media login button$/, async table => {
  const data = table.rowsHash();
  await $(`button*=Login with ${data.social_media}`).click();
});
