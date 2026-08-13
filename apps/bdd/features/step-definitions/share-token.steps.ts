/**
 * share-token.steps.ts — implements the stakeholder BDD apps/bdd/features/share-token.feature.
 *
 * Sender (seeded) logs in, shares a token by link from the send page ('share by
 * QR code' checkbox). A second visitor opens the link in an isolated session,
 * registers, creates a wallet, and the shared token is redeemed into it.
 */
import { Given, When, Then } from "@wdio/cucumber-framework";
import { $, browser, expect } from "@wdio/globals";
import {
  seedAccount,
  seedTokenIntoWalletByName,
  resetAccount,
  deleteWalletByName,
  SeededAccount,
} from "../../utils/seed.ts";

const SENDER_PASSWORD = "Abcde123$x";
const RECEIVER_PASSWORD = "Abcde123$";
const base = () => process.env.E2E_BASE_URL ?? "http://localhost:3000";
// Keycloak origin, used to drop its SSO cookie so a fresh visitor is isolated.
const KC_WELL_KNOWN =
  process.env.BDD_KEYCLOAK_WELL_KNOWN ??
  "https://dev-k8s.treetracker.org/keycloak/realms/treetracker/.well-known/openid-configuration";

// Shared across steps within the scenario.
let sharedTokenId = "";
let sharedLink = "";
let receiverWallet = "";
const senders: Record<string, SeededAccount> = {};

// Clear the app session + Keycloak SSO cookie so the next login/registration
// starts as a brand-new, unauthenticated visitor ("another browser").
async function clearSession(): Promise<void> {
  await browser.url(KC_WELL_KNOWN);
  await browser.deleteAllCookies();
  await browser.url(`${base()}/login`);
  await browser.execute(() => {
    try {
      window.sessionStorage.clear();
      window.localStorage.clear();
    } catch {
      /* ignore */
    }
  });
  await browser.deleteAllCookies();
}

// Drive Keycloak's hosted login form, then wait for the app to load logged-in.
async function keycloakLogin(
  username: string,
  password: string,
): Promise<void> {
  await $("#username").waitForDisplayed({ timeout: 25000 });
  await $("#username").setValue(username);
  await $("#password").setValue(password);
  await $("#kc-login").click();
  await $("[data-test=navigation-home]").waitForDisplayed({ timeout: 30000 });
}

async function loginAs(email: string, password: string): Promise<void> {
  await clearSession();
  await browser.url(`${base()}/login`);
  await keycloakLogin(email, password);
}

// Fill + submit Keycloak's hosted registration form for a specific email.
// Assumes the register form is (about to be) displayed.
async function registerAs(email: string, password: string): Promise<void> {
  const username = email.split("@")[0];
  await $("#kc-register-form").waitForExist({ timeout: 25000 });
  await $("#username").waitForDisplayed({ timeout: 25000 });
  await $("#firstName").setValue("Share");
  await $("#lastName").setValue("Receiver");
  await $("#username").setValue(username);
  await $("#email").setValue(email);
  await $("#password").setValue(password);
  await $("#password-confirm").setValue(password);

  const candidates = [
    "#kc-register-form input[type=submit]",
    "#kc-register-form button[type=submit]",
    "input[type=submit]",
    "button[type=submit]",
  ];
  for (const sel of candidates) {
    const el = await $(sel);
    if (await el.isExisting()) {
      try {
        await el.click();
      } catch {
        await browser.execute((node: HTMLElement) => node.click(), el as never);
      }
      break;
    }
  }
  await $("[data-test=navigation-home]").waitForDisplayed({ timeout: 30000 });
}

async function createWalletUI(name: string): Promise<void> {
  await browser.url(`${base()}/wallet`);
  await $("[data-test=wallet-create-open]").waitForDisplayed({
    timeout: 15000,
  });
  await $("[data-test=wallet-create-open]").click();
  await $('[data-test="wallet-create-name"]').waitForDisplayed({
    timeout: 30000,
  });
  await $('[data-test="wallet-create-name"]').setValue(name);
  await $('[data-test="wallet-create-description"]').setValue("desc");
  await $('[data-test="wallet-create-submit"]').click();
}

Given(
  /^There is a registered account: (\S+), and there is an wallet named: (\S+), and there is one token:(\S+) in this wallet$/,
  async (email: string, walletName: string, tokenId: string) => {
    const acct: SeededAccount = {
      email,
      password: SENDER_PASSWORD,
      walletName,
    };
    senders[email] = acct;
    // Create the Keycloak user + wallet (delete-then-create), then seed the
    // specific token id the BDD references.
    await seedAccount(acct, false);
    await seedTokenIntoWalletByName(walletName, tokenId);
    sharedTokenId = tokenId;
  },
);

Given(/^There is one person A who has no account on Greenstand$/, async () => {
  // No setup — person A registers later in the scenario.
});

When(
  /^(\S+) login and click the send token button, and pick: (\S+) as sender and enable the checkbox: 'share by QR code', and input (\d+) token to send, and submit$/,
  async (email: string, senderWallet: string, amount: string) => {
    const acct = senders[email];
    await loginAs(acct.email, acct.password);

    // Open the send page via the bottom-nav send button.
    await $("[data-test=bottom-nav-send]").waitForDisplayed({ timeout: 15000 });
    await $("[data-test=bottom-nav-send]").click();
    await $("[data-test=send-page]").waitForDisplayed({ timeout: 15000 });

    // The source select defaults to the user's (only) wallet — wait for it.
    await browser.waitUntil(
      async () =>
        (await $("[data-test=send-source-wallet]").getText()).includes(
          senderWallet,
        ),
      {
        timeout: 15000,
        timeoutMsg: `sender wallet "${senderWallet}" not selected`,
      },
    );

    // The amount field already defaults to "1" (what this scenario sends), so we
    // don't re-type it — typing into the number field appends ("1" → "11").
    void amount;

    // Enable 'share by QR code' (hides the recipient field).
    await $("[data-test=send-share-qr]").click();

    await $("[data-test=send-submit]").click();
  },
);

Then(/^the link shows up on the next page$/, async () => {
  const linkEl = $("[data-test=share-link]");
  await linkEl.waitForDisplayed({ timeout: 30000 });
  sharedLink = (await linkEl.getText()).trim();
  expect(sharedLink).toContain("/claim?action_token=");
});

When(/^the user A open the link$/, async () => {
  // Isolated "second browser": drop app + Keycloak session, then open the link.
  await clearSession();
  await browser.url(sharedLink);
});

Then(
  /^the user finish the registeration and login as (\S+)$/,
  async (email: string) => {
    // Free the Keycloak user so re-runs can register this fixed email.
    await resetAccount(email);
    // The /claim page auto-forwards to /signup → Keycloak registration.
    await registerAs(email, RECEIVER_PASSWORD);
  },
);

Then(/^the user create a wallet: (\S+)$/, async (walletName: string) => {
  receiverWallet = walletName;
  // Free the (globally-unique) wallet name for a clean re-run, then create it.
  await deleteWalletByName(walletName);
  await createWalletUI(walletName);
});

Then(/^the shared token is in the wallet$/, async () => {
  await browser.url(`${base()}/wallet`);
  const item = $(`[data-test=wallet-item-name-${receiverWallet}]`);
  await item.waitForDisplayed({ timeout: 100000 });
  await item.click();
  await $("[data-test=wallet-details-page]").waitForDisplayed({
    timeout: 15000,
  });
  await $("[data-test=token-list]").waitForDisplayed({ timeout: 15000 });
  await browser.waitUntil(
    async () => {
      await browser.refresh();
      if (!(await $("[data-test=token-list]").isDisplayed())) return false;
      await browser.pause(2500);
      const ids: string[] = await browser.execute(() =>
        Array.from(document.querySelectorAll("[data-test^='token-item-']")).map(
          e => e.getAttribute("data-test") || "",
        ),
      );
      return ids.includes(`token-item-${sharedTokenId}`);
    },
    {
      timeout: 90000,
      interval: 1000,
      timeoutMsg: `shared token ${sharedTokenId} not found in wallet ${receiverWallet}`,
    },
  );
});

Then(/^the QR code picture shows up on the next page$/, async () => {
  await $("[data-test=share-qr]").waitForDisplayed({ timeout: 30000 });
  // the QR is rendered as an inline SVG inside the container
  await $("[data-test=share-qr] svg").waitForExist({ timeout: 10000 });
});
