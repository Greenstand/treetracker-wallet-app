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
import { seedAccount, tokenFor, SeededAccount } from "../../utils/seed.ts";
// Wallet api functions by subpath (the package index pulls in React hooks → core;
// see utils/seed.ts).
import { getTransfers } from "@treetracker/wallet/src/api/getTransfers.ts";
import { getTransferTokens } from "@treetracker/wallet/src/api/getTransferTokens.ts";

// State object to share data between steps
const stepState: Record<string, string> = {
  walletName: "", // We need unique walletName for each test, so we use a global state object to share the walletName between steps
};

// Credentials of a user registered earlier in the scenario, shared across steps.
let registeredUsername = "";
let registeredPassword = "";

// Map page names to routes
const routes: Record<string, string> = {
  login: "login",
  register: "signup",
  wallet: "wallet",
  // add more as needed
};

// Drive Keycloak's hosted login page (the app /login redirects here), then wait
// for the app to load logged-in.
async function keycloakLogin(username: string, password: string) {
  await $("#username").waitForDisplayed({ timeout: 20000 });
  // Use JavaScript to set values to avoid WebDriver's special character interpretation
  await browser.execute(
    (user, pass) => {
      const usernameField = document.querySelector(
        "#username",
      ) as HTMLInputElement;
      const passwordField = document.querySelector(
        "#password",
      ) as HTMLInputElement;
      if (usernameField) {
        usernameField.value = user;
        usernameField.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (passwordField) {
        passwordField.value = pass;
        passwordField.dispatchEvent(new Event("input", { bubbles: true }));
      }
    },
    username,
    password,
  );
  await $("#kc-login").click();
  await $("[data-test=navigation-home]").waitForDisplayed({ timeout: 20000 });
}

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
  await expect($("[data-test=wallet-list]")).toBeDisplayed();
  const walletItemSelector = `[data-test=wallet-item-name-${stepState.walletName}]`;
  // Wait for the wallet item to be displayed. The create flow awaits a real
  // cloud wallet-API round-trip before the optimistic list update, so 3s was
  // too short in fast/headless runs (the in-flight POST could even be aborted
  // when the assertion failed first). Allow realistic remote latency.
  await $(walletItemSelector).waitForDisplayed({
    timeout: 100000,
    timeoutMsg: `Wallet item with name "${stepState.walletName}" did not appear in the list`,
  });
});

// Verify the post-creation notification (shown for the user's first wallet).
Then(/^An notification saying: "(.*)"$/, async (message: string) => {
  const el = $('[data-test="wallet-create-notification"]');
  await el.waitForDisplayed({
    timeout: 15000,
    timeoutMsg: "wallet-creation notification not shown",
  });
  await browser.waitUntil(async () => (await el.getText()).includes(message), {
    timeout: 10000,
    timeoutMsg: "wallet-creation notification text did not match",
  });
});

// ============================================================================
// [REGISTER] Registration flows
// ============================================================================
//#region REGISTER

When(/^I fill in the registration form with valid data$/, async table => {
  const data = table.rowsHash();
  await $('[data-test="signup-username"]').setValue(data.username);
  await $('[data-test="signup-email"]').setValue(data.email);
  await $('[data-test="signup-password"]').setValue(data.password);
});

When(
  /^I fill in the registration form with \[random user name\]@greenstand\.org password:\s*(.+)$/,
  async (password: string) => {
    const ts = Date.now();
    const username = `user${ts}`;
    const email = `${username}@greenstand.org`;

    // Remember the credentials so a later step can log in as this fresh user.
    registeredUsername = username;
    registeredPassword = password;

    // Keycloak's hosted registration page (the app redirected here). Wait for the
    // form to be fully loaded/stable, then fill the standard fields directly.
    await $("#kc-register-form").waitForExist({ timeout: 25000 });
    await $("#username").waitForDisplayed({ timeout: 25000 });
    await $("#firstName").setValue("Test");
    await $("#lastName").setValue("User");
    await $("#username").setValue(username);
    await $("#email").setValue(email);
    await $("#password").setValue(password);
    await $("#password-confirm").setValue(password);
  },
);

When(/^I click on the register button$/, async () => {
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
        // Headed Keycloak layout can overlap the full-width submit button so the
        // native click is "intercepted". A JS click dispatches directly on the
        // node and bypasses the hit-test.
        await browser.execute((node: any) => node.click(), el);
      }
      return;
    }
  }
  throw new Error("Keycloak register submit button not found");
});

When(/^I click on the social media login button$/, async table => {
  const data = table.rowsHash();
  await $(`button*=Login with ${data.social_media}`).click();
});

Then(/^I should see a confirmation message$/, async () => {
  // Keycloak registers the user, auto-logs them in, and redirects back to the
  // app — so success = landing in the app logged in (bottom nav visible).

  // Wait for the redirect to complete with increased timeout and refresh on failure
  try {
    await $("[data-test=navigation-home]").waitForDisplayed({
      timeout: 30000,
      timeoutMsg:
        "Expected to be logged in (navigation-home) after registration",
    });
  } catch (err) {
    // If first attempt fails, try refreshing and waiting again
    await browser.refresh();
    await browser.pause(2000);
    await $("[data-test=navigation-home]").waitForDisplayed({
      timeout: 20000,
      timeoutMsg:
        "Expected to be logged in (navigation-home) after registration - even after refresh",
    });
  }
});
//#endregion REGISTER

When("I login with an account", async () => {
  await keycloakLogin("testuser1", "kebWaf-beqto0-nymbyb");
});

When("I create a new wallet", async () => {
  const ts = Date.now();
  stepState.walletName = `wallet${ts}`;
  // Wait for the wallet page to be ready (after the full-page navigation).
  await $("[data-test=wallet-create-open]").waitForDisplayed({
    timeout: 15000,
  });
  await $("[data-test=wallet-create-open]").click();
  // Wallet creation drawer takes some time to open, so we wait for the input to be displayed
  await $('[data-test="wallet-create-name"]').waitForDisplayed({
    timeout: 30000,
  });
  await $('[data-test="wallet-create-name"]').setValue(stepState.walletName);
  await $('[data-test="wallet-create-description"]').setValue("desc");
  await $('[data-test="wallet-create-submit"]').click();
});

// Log in as the user registered earlier in the scenario (fresh user → first wallet).
When("I login with the registered account", async () => {
  await keycloakLogin(registeredUsername, registeredPassword);
});

// Click the wallet in the list → navigate to its details page (basic info + token list).
When(/^I click on the wallet to view its details$/, async () => {
  await $(`[data-test=wallet-item-name-${stepState.walletName}]`).click();
  await $("[data-test=wallet-details-page]").waitForDisplayed({
    timeout: 15000,
  });
  await $("[data-test=token-list]").waitForDisplayed({ timeout: 15000 });
});

// Id of the token opened on the details page, shared with the map-URL assertion.
let selectedTokenId = "";

// Verify by counting the tokens listed on the details page. Reload to re-fetch
// while the just-gifted token becomes visible.
Then(
  /^I should see there are (\d+) tokens in my wallet/,
  async (count: string) => {
    const expected = Number(count);
    // Reload and re-fetch getTokens repeatedly until the just-gifted token is
    // visible (the count can lag briefly, more so under parallel load). Crucially,
    // wait after each reload so getTokens finishes fetching+rendering before counting.
    await browser.waitUntil(
      async () => {
        await browser.refresh();
        if (!(await $("[data-test=token-list]").isDisplayed())) return false;
        await browser.pause(2500); // let getTokens fetch + render post-reload
        const n: number = await browser.execute(
          () => document.querySelectorAll("[data-test^='token-item-']").length,
        );
        return n === expected;
      },
      {
        timeout: 90000,
        interval: 1000,
        timeoutMsg: `Expected ${expected} token(s) in wallet "${stepState.walletName}"`,
      },
    );
  },
);

// Click the first token in the list → navigate to that token's details page.
When(
  /^I click the token item on the list of tokens in the wallet details page$/,
  async () => {
    const item = await $("[data-test^='token-item-']");
    await item.waitForDisplayed({ timeout: 15000 });
    // Remember which token we're opening so later steps can assert the map URL.
    const dt = (await item.getAttribute("data-test")) || "";
    selectedTokenId = dt.replace("token-item-", "");
    await item.click();
    await $("[data-test=token-details-page]").waitForDisplayed({
      timeout: 15000,
    });
  },
);

Then(/^I should see the token details page with token info$/, async () => {
  await expect($("[data-test=token-details-page]")).toBeDisplayed();
  const info = $("[data-test=token-details-id]");
  await info.waitForDisplayed({ timeout: 15000 });
  await expect(info).toHaveText(selectedTokenId, { containing: true });
});

// Click the location icon — it's an anchor with target=_blank, so it opens a new tab.
When(/^I click the location icon on the token details page$/, async () => {
  await $("[data-test=token-location-link]").click();
});

Then(
  /^I should see the map page with the location of the token in a new tab$/,
  async () => {
    // A new tab opens for the map. Headed Chrome also exposes devtools:// tabs as
    // window handles, so don't assume which handle is the map — scan every handle
    // and land on the one whose URL carries /tokens/<id>. (The external map app may
    // return an error page, but the URL still carries the token id.)
    await browser.waitUntil(
      async () => {
        const handles = await browser.getWindowHandles();
        for (const h of handles) {
          await browser.switchToWindow(h);
          if ((await browser.getUrl()).includes("/tokens/" + selectedTokenId)) {
            return true;
          }
        }
        return false;
      },
      {
        timeout: 20000,
        interval: 1000,
        timeoutMsg:
          "No tab navigated to the token map page (/tokens/" +
          selectedTokenId +
          ")",
      },
    );
  },
);

//#endregion

// ============================================================================
// [SEND-TOKEN] Send → notification → accept → receive flows
// ============================================================================
//#region SEND-TOKEN

const SEND_TOKEN_PASSWORD = "Abcde123$x";
// Seeded accounts keyed by their email (also the Keycloak username).
const seededAccounts: Record<string, SeededAccount> = {};
// Transfer/token captured after the UI send, for selector targeting.
let sendTokenTransferId = "";
let sendTokenReceivedTokenId = "";

const baseUrl = () => process.env.E2E_BASE_URL ?? "http://localhost:3000";

// Log out the current user (clears the Keycloak SSO session) and log in as
// another — needed because the scenario acts as two different users.
const KC_BASE = process.env.PRIVATE_KEYCLOAK_BASE_URL ?? "";
const KC_REALM = process.env.PRIVATE_KEYCLOAK_REALM ?? "";

async function switchUser(username: string, password: string) {
  // Truly switch accounts. The end-session redirect didn't reliably clear the
  // SSO session (Keycloak then silently re-authenticated the previous user, so
  // the app stayed logged in as them). Instead, hard-delete Keycloak's SSO
  // cookie: deleteAllCookies only affects the current document's origin, so go
  // to a Keycloak page first, wipe its cookies, then load /login — with no SSO
  // cookie, Keycloak always shows the hosted #username form, where we sign in as
  // the intended user.
  await browser.url(
    `${KC_BASE}/realms/${KC_REALM}/.well-known/openid-configuration`,
  );
  await browser.deleteAllCookies();
  // Also clear the app's mirrored token on the app origin.
  await browser.url(`${baseUrl()}/login`);
  await browser.execute(() => {
    try {
      window.sessionStorage.clear();
      window.localStorage.clear();
    } catch {
      /* ignore */
    }
  });
  await browser.deleteAllCookies();
  // Reload /login → Keycloak authorize → (no SSO) → hosted login form.
  await browser.url(`${baseUrl()}/login`);
  await $("#username").waitForDisplayed({ timeout: 30000 });
  await keycloakLogin(username, password);
}

// Given: registered account + wallet holding one token (the sender).
Given(
  /^There is a registered account: (\S+), and there is an wallet named: (\S+), and there is one token in this wallet$/,
  async (email: string, walletName: string) => {
    const acct: SeededAccount = {
      email,
      password: SEND_TOKEN_PASSWORD,
      walletName,
    };
    seededAccounts[email] = acct;
    await seedAccount(acct, true);
  },
);

// Given: registered account + wallet (the receiver).
Given(
  /^There is a registered account: (\S+), and there is an wallet named: (\S+)$/,
  async (email: string, walletName: string) => {
    const acct: SeededAccount = {
      email,
      password: SEND_TOKEN_PASSWORD,
      walletName,
    };
    seededAccounts[email] = acct;
    await seedAccount(acct, false);
  },
);

// When: user 1 logs in and sends 1 token from their wallet to user 2's wallet.
When(
  /^(\S+) login and click the send token button, and pick: (\S+) as sender and (\S+) as receiver, and input (\d+) token to send, and submit$/,
  async (
    email: string,
    senderWallet: string,
    receiverWallet: string,
    amount: string,
  ) => {
    const acct = seededAccounts[email];
    await switchUser(acct.email, acct.password);

    // Open the send page via the bottom-nav send button.
    await $("[data-test=bottom-nav-send]").waitForDisplayed({ timeout: 15000 });
    await $("[data-test=bottom-nav-send]").click();
    await $("[data-test=send-page]").waitForDisplayed({ timeout: 15000 });

    // The source select is disabled until wallets load; the page then defaults
    // the source to the user's (only) wallet. Wait for that default to settle —
    // which also satisfies "pick <senderWallet> as sender".
    await browser.waitUntil(
      async () =>
        (await $("[data-test=send-source-wallet]").getText()).includes(
          senderWallet,
        ),
      {
        timeout: 20000,
        interval: 500,
        timeoutMsg: `source wallet ${senderWallet} did not load as the default`,
      },
    );

    // Recipient + amount + submit (target the inner <input> of each MUI field).
    await $("[data-test=send-recipient] input").setValue(receiverWallet);
    // The amount field already holds the default "1"; setValue doesn't reliably
    // clear a controlled MUI input (it would append → "11"). Select-all + delete,
    // then type the desired amount.
    const amt = await $("[data-test=send-amount] input");
    await amt.click();
    await browser.keys([
      process.platform === "darwin" ? "Meta" : "Control",
      "a",
    ]);
    await browser.keys("Backspace");
    await amt.addValue(amount);
    const submit = await $("[data-test=send-submit]");
    await submit.waitForEnabled({ timeout: 10000 });
    // Use JavaScript click to avoid element overlay issues (send icon SVG on top of button)
    await browser.execute(el => (el as HTMLElement).click(), submit);

    // Success either flashes the snackbar or redirects to /transfers (the page
    // navigates ~1.2s after success). Treat either as done; fail fast on error.
    await browser.waitUntil(
      async () => {
        if (await $("[data-test=send-error]").isExisting()) {
          throw new Error(
            `send failed: ${await $("[data-test=send-error]").getText()}`,
          );
        }
        if (await $("[data-test=send-success]").isExisting()) return true;
        return (await browser.getUrl()).includes("/transfers");
      },
      {
        timeout: 25000,
        interval: 400,
        timeoutMsg: "send did not complete (no success/redirect)",
      },
    );
  },
);

// Then: user 2 logs in and opens Notifications. Also resolve the just-sent
// transfer (+ its token) via the API so later steps can target it precisely.
Then(
  /^(\S+) login and click: noticiation navigation bar$/,
  async (email: string) => {
    const acct = seededAccounts[email];

    // Find the pending transfer into user 2's wallet (newest first).
    const token = await tokenFor(acct);
    await browser.waitUntil(
      async () => {
        for (const state of ["pending", "requested"]) {
          const res = await getTransfers(token, {
            state,
            wallet: acct.walletName,
            limit: 100,
          });
          const list = res.transfers ?? [];
          if (list.length > 0) {
            sendTokenTransferId = list[0].id;
            return true;
          }
        }
        return false;
      },
      {
        timeout: 20000,
        interval: 1500,
        timeoutMsg: `no pending transfer found for wallet ${acct.walletName}`,
      },
    );
    const tk = await getTransferTokens(token, sendTokenTransferId);
    sendTokenReceivedTokenId = tk.tokens?.[0]?.id ?? "";

    // Switch to user 2 in the browser and open Notifications.
    await switchUser(acct.email, acct.password);
    await $("[data-test=bottom-nav-notifications]").waitForDisplayed({
      timeout: 15000,
    });
    await $("[data-test=bottom-nav-notifications]").click();
    await $("[data-test=notifications-page]").waitForDisplayed({
      timeout: 15000,
    });
  },
);

// Then: the pending-token message is shown.
Then(/^there is a message of pending token$/, async () => {
  await $("[data-test=notifications-page]").waitForDisplayed({
    timeout: 15000,
  });

  // Manual-inspection pause: set BDD_PAUSE to hold the browser on the
  // notifications page so you can see what it renders.
  if (process.env.BDD_PAUSE) {
    console.log(
      "\n⏸  Paused on the notifications page — inspect the browser (Ctrl-C / kill to stop).\n",
    );

    while (true) {
      await browser.pause(3_600_000);
    }
  }

  const countItems = () =>
    browser.execute(
      () =>
        document.querySelectorAll("[data-test^='notification-item-']").length,
    );
  await browser.waitUntil(
    async () => {
      if ((await countItems()) > 0) return true;
      await browser.refresh();
      await browser.pause(2500); // let the transfers fetch finish post-reload
      return (await countItems()) > 0;
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: "no pending-token notification appeared",
    },
  );
  // Capture the rendered notification's transfer id (fresh user 2 has exactly
  // one incoming pending transfer, so the first item is the right one).
  const item = await $("[data-test^='notification-item-']");
  const dt = (await item.getAttribute("data-test")) || "";
  sendTokenTransferId = dt.replace("notification-item-", "");

  console.log(`[DIAG] notification id=${sendTokenTransferId}`);
});

// When: user clicks the message.
When(/^the user click the message$/, async () => {
  await $(`[data-test=notification-item-${sendTokenTransferId}]`).click();
});

// Then: on the message detail page.
Then(/^the user is on the message detail page\s*$/, async () => {
  await $("[data-test=message-detail-page]").waitForDisplayed({
    timeout: 15000,
  });
});

// When: user clicks accept.
When(/^the user click the accept button$/, async () => {
  const btn = await $("[data-test=message-accept]");
  await btn.waitForDisplayed({ timeout: 15000 });
  // The button is disabled while the transfer detail is still loading; clicking
  // it then would be a no-op (onAccept never fires). Wait until it's enabled.
  await btn.waitForEnabled({ timeout: 15000 });
  await btn.click();
});

// Then: confirmation "you received token [token id]".
Then(
  /^there is a confirmation message: 'you received token \[token id\]'$/,
  async () => {
    const el = $("[data-test=received-confirmation]");
    await el.waitForDisplayed({ timeout: 20000 });
    await browser.waitUntil(
      async () => /you received token/i.test(await el.getText()),
      {
        timeout: 10000,
        timeoutMsg: "confirmation message text did not match",
      },
    );
    // Capture the exact token id from the confirmation ("you received token <id>")
    // so the final wallet assertion targets the token that was actually received.
    const m = (await el.getText()).match(/you received token\s+(\S+)/i);
    if (m) sendTokenReceivedTokenId = m[1];
  },
);

// Then: on the receiver wallet page.
Then(/^on the (\S+) page$/, async (walletName: string) => {
  await browser.url(
    `${baseUrl()}/wallet/details?name=${encodeURIComponent(walletName)}`,
  );
  await $("[data-test=wallet-details-page]").waitForDisplayed({
    timeout: 15000,
  });
});

// And: the token sent by user 1 is present in the receiver wallet.
Then(/^there is the token sent by the user 1$/, async () => {
  const sel = `[data-test=token-item-${sendTokenReceivedTokenId}]`;
  await browser.waitUntil(
    async () => {
      if (await $(sel).isExisting()) return true;
      await browser.refresh();
      await browser.pause(2000); // let getTokens fetch + render post-reload
      return $(sel).isExisting();
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: `received token ${sendTokenReceivedTokenId} not found in wallet`,
    },
  );
});

// Then: user logs in and opens the /transfers page directly (no bottom-nav
// entry exists for it — the app only reaches it via the post-send redirect).
Then(/^(\S+) login and view the transfers page$/, async (email: string) => {
  const acct = seededAccounts[email];
  await switchUser(acct.email, acct.password);
  await browser.url(`${baseUrl()}/transfers`);
  await $("[data-test=transfers-page]").waitForDisplayed({ timeout: 15000 });
});

// Then: an incoming transfer (Accept/Decline row) is visible; capture its id.
Then(/^there is an incoming pending transfer to respond to$/, async () => {
  await $("[data-test=transfers-page]").waitForDisplayed({ timeout: 15000 });
  const countItems = () =>
    browser.execute(
      () =>
        document.querySelectorAll("[data-test^='transfer-decline-']").length,
    );
  await browser.waitUntil(
    async () => {
      if ((await countItems()) > 0) return true;
      await browser.refresh();
      await browser.pause(2000);
      return (await countItems()) > 0;
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: "no incoming pending transfer appeared",
    },
  );
  const btn = await $("[data-test^='transfer-decline-']");
  const dt = (await btn.getAttribute("data-test")) || "";
  sendTokenTransferId = dt.replace("transfer-decline-", "");
});

// When: user clicks decline on the captured transfer.
When(/^the user click the decline button$/, async () => {
  const btn = await $(`[data-test=transfer-decline-${sendTokenTransferId}]`);
  await btn.waitForDisplayed({ timeout: 15000 });
  await btn.waitForEnabled({ timeout: 15000 });
  await btn.click();
});

// Then: an outgoing transfer (Cancel row) is visible; capture its id. Navigates
// directly to /transfers rather than relying on the app's own post-send
// setTimeout redirect, so this is robust to redirect timing.
Then(/^there is an outgoing pending transfer to cancel$/, async () => {
  await browser.url(`${baseUrl()}/transfers`);
  await $("[data-test=transfers-page]").waitForDisplayed({ timeout: 15000 });
  const countItems = () =>
    browser.execute(
      () => document.querySelectorAll("[data-test^='transfer-cancel-']").length,
    );
  await browser.waitUntil(
    async () => {
      if ((await countItems()) > 0) return true;
      await browser.refresh();
      await browser.pause(2000);
      return (await countItems()) > 0;
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: "no outgoing pending transfer appeared",
    },
  );
  const btn = await $("[data-test^='transfer-cancel-']");
  const dt = (await btn.getAttribute("data-test")) || "";
  sendTokenTransferId = dt.replace("transfer-cancel-", "");
});

// When: user clicks cancel on the captured transfer.
When(/^the user click the cancel button$/, async () => {
  const btn = await $(`[data-test=transfer-cancel-${sendTokenTransferId}]`);
  await btn.waitForDisplayed({ timeout: 15000 });
  await btn.waitForEnabled({ timeout: 15000 });
  await btn.click();
});

// Then: the acted-on row is no longer in the active list (it moves to the
// history section or its state changes, so it's not in incoming/outgoing anymore).
Then(/^the transfer is no longer listed$/, async () => {
  const sel = `[data-test=transfer-item-${sendTokenTransferId}]`;
  // Poll for the row to no longer exist in the incoming/outgoing sections.
  // After decline/cancel, the backend moves it to history (state=cancelled/declined),
  // so it disappears from the active list. If it still exists after waiting, it's
  // a backend/sync issue.
  await browser.waitUntil(
    async () => {
      const incomingCount = await browser.execute(
        () =>
          document.querySelectorAll(
            "[data-test='transfers-incoming'] [data-test^='transfer-item-']",
          ).length,
      );
      const outgoingCount = await browser.execute(
        () =>
          document.querySelectorAll(
            "[data-test='transfers-outgoing'] [data-test^='transfer-item-']",
          ).length,
      );
      // If neither section has any items, the row is gone.
      if (incomingCount === 0 && outgoingCount === 0) return true;
      await browser.refresh();
      await browser.pause(2000);
      return false;
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: `transfer ${sendTokenTransferId} still in active list`,
    },
  );
});

// And: declined transfer must not have moved any token into the receiver's wallet.
Then(/^there is no token from \S+ in the wallet$/, async () => {
  // Let the wallet's token-list fetch settle before asserting absence — a
  // waitUntil that exits as soon as count===0 could pass on a still-loading
  // page that would shortly render a token.
  await browser.pause(3000);
  const count = await browser.execute(
    () => document.querySelectorAll("[data-test^='token-item-']").length,
  );
  if (count !== 0) {
    throw new Error(`expected wallet to have no tokens, found ${count}`);
  }
});

// And: a cancelled transfer must leave the token in the sender's wallet.
Then(/^there is the token still in the wallet$/, async () => {
  const countItems = () =>
    browser.execute(
      () => document.querySelectorAll("[data-test^='token-item-']").length,
    );
  await browser.waitUntil(
    async () => {
      if ((await countItems()) > 0) return true;
      await browser.refresh();
      await browser.pause(2000);
      return (await countItems()) > 0;
    },
    {
      timeout: 45000,
      interval: 1000,
      timeoutMsg: "expected wallet to still contain a token, but none found",
    },
  );
});

//#endregion SEND-TOKEN

// ============================================================================
// [SETTINGS] Account, Security, and Logout flows
// ============================================================================
//#region SETTINGS

When(/^(\S+) login and click the settings nav icon$/, async (email: string) => {
  await browser.url("http://localhost:3000/login");
  const accountData = seededAccounts[email];
  if (!accountData) {
    throw new Error(`No seeded account found for ${email}`);
  }
  await keycloakLogin(accountData.email, accountData.password);
  // Click settings nav icon
  const settingsNav = await $('[data-test="bottom-nav-settings"]');
  await settingsNav.waitForDisplayed({ timeout: 10000 });
  await settingsNav.click();
});

Then(/^the user is on the settings page$/, async () => {
  const settingsPage = await $('[data-test="settings-page"]');
  await settingsPage.waitForDisplayed({ timeout: 10000 });
});

When(/^the user click the Account item$/, async () => {
  const accountItem = await $('[data-test="settings-account-item"]');
  await accountItem.waitForDisplayed({ timeout: 5000 });
  await accountItem.click();
});

Then(/^the user is on the account page$/, async () => {
  const accountPage = await $('[data-test="settings-account-page"]');
  await accountPage.waitForDisplayed({ timeout: 10000 });
});

Then(/^the account email shown is (\S+)$/, async (email: string) => {
  const emailElement = await $('[data-test="settings-account-email"]');
  await emailElement.waitForDisplayed({ timeout: 10000 });
  const text = await emailElement.getText();
  if (text !== email) {
    throw new Error(`expected email "${email}", got "${text}"`);
  }
});

Then(/^a "Member since" date is shown$/, async () => {
  const createdElement = await $('[data-test="settings-account-created"]');
  await createdElement.waitForDisplayed({ timeout: 10000 });
  const text = await createdElement.getText();
  if (!text || text.trim().length === 0) {
    throw new Error("Member since date is empty or not displayed");
  }
});

When(/^the user click the security link$/, async () => {
  const securityLink = await $('[data-test="settings-security-link"]');
  await securityLink.waitForDisplayed({ timeout: 5000 });
  await securityLink.click();
  // Give time for new tab to open
  await browser.pause(2000);
});

Then(/^a new tab opens to the Keycloak account console$/, async () => {
  const handles = await browser.getWindowHandles();
  if (handles.length < 2) {
    throw new Error("Expected a new tab to open, but only one tab exists");
  }
  // Switch to the new tab (last one)
  const newTabHandle = handles[handles.length - 1];
  await browser.switchToWindow(newTabHandle);
  await browser.pause(2000);

  const currentUrl = await browser.getUrl();
  if (!currentUrl.includes("/realms/") || !currentUrl.includes("/account")) {
    throw new Error(
      `Expected Keycloak account console URL, got: ${currentUrl}`,
    );
  }

  // Switch back to the original tab
  await browser.switchToWindow(handles[0]);
  await browser.pause(1000);
});

When(/^the user click the logout button$/, async () => {
  const logoutButton = await $('[data-test="settings-logout-button"]');
  await logoutButton.waitForDisplayed({ timeout: 5000 });
  await logoutButton.click();
});

Then(/^the user is redirected to the login page$/, async () => {
  // Wait for the Keycloak login page to load - the #username field is the definitive indicator
  const usernameField = await $("#username");
  await usernameField.waitForDisplayed({ timeout: 20000 });

  // Verify the URL is either the local /login page or Keycloak's auth endpoint
  const currentUrl = await browser.getUrl();
  const isLoginPage =
    currentUrl.includes("/login") ||
    currentUrl.includes("/protocol/openid-connect/auth");
  if (!isLoginPage) {
    throw new Error(`Expected login page, got: ${currentUrl}`);
  }
});

// Generic settings steps for use after registration (no login required)
When(/^I click the settings nav icon$/, async () => {
  const settingsNav = await $('[data-test="bottom-nav-settings"]');
  await settingsNav.waitForDisplayed({ timeout: 10000 });
  await settingsNav.click();
});

When(/^I click the Account item$/, async () => {
  const accountItem = await $('[data-test="settings-account-item"]');
  await accountItem.waitForDisplayed({ timeout: 5000 });
  await accountItem.click();
});

Then(/^account email is displayed$/, async () => {
  const emailElement = await $('[data-test="settings-account-email"]');
  await emailElement.waitForDisplayed({ timeout: 10000 });
  const text = await emailElement.getText();
  if (!text || text.trim().length === 0) {
    throw new Error("Email is empty or not displayed");
  }
});

When(/^I click the security link$/, async () => {
  const securityLink = await $('[data-test="settings-security-link"]');
  await securityLink.waitForDisplayed({ timeout: 5000 });
  await securityLink.click();
  await browser.pause(2000);
});

When(/^I click the logout button$/, async () => {
  const logoutButton = await $('[data-test="settings-logout-button"]');
  await logoutButton.waitForDisplayed({ timeout: 5000 });
  await logoutButton.click();
});

//#endregion SETTINGS

// ============================================================================
// [CUSTOMIZE] Customize Wallet flows
// ============================================================================
//#region CUSTOMIZE

When(
  /^(\S+) login and navigate to wallet details$/,
  async (accountKey: string) => {
    const account = seededAccounts[accountKey];
    if (!account) throw new Error(`Account not found: ${accountKey}`);

    await switchUser(account.email, account.password);
    // After login, navigate to wallet page
    await browser.url("http://localhost:3000/wallet");
    // Wait for first wallet item to appear (not just the container)
    await $("[data-test^=wallet-list-item-]").waitForDisplayed({
      timeout: 20000,
    });
    // Click first wallet (assuming it's the one we created)
    const walletItems = await $$("[data-test^=wallet-list-item-]");
    if (!walletItems || (walletItems as any).length === 0) {
      throw new Error("No wallets found");
    }
    await (walletItems as any)[0].click();
    await $("[data-test=wallet-details-page]").waitForDisplayed({
      timeout: 10000,
    });
  },
);

When(/^the user click the customize wallet button$/, async () => {
  const customizeBtn = await $('[data-test="wallet-customize-open"]');
  await customizeBtn.waitForDisplayed({ timeout: 5000 });
  await customizeBtn.click();
});

Then(/^the user is on the customize wallet page$/, async () => {
  const pageElement = await $("[data-test=customize-wallet-page]");
  await pageElement.waitForDisplayed({ timeout: 10000 });
});

When(/^the user enter display name: (.+)$/, async (displayName: string) => {
  const input = await $('[data-test="customize-display-name"]');
  await input.waitForDisplayed({ timeout: 5000 });
  await browser.execute(
    (elem, val) => {
      (elem as HTMLInputElement).value = val;
      (elem as HTMLInputElement).dispatchEvent(
        new Event("change", { bubbles: true }),
      );
    },
    input,
    displayName,
  );
});

When(/^the user enter about text: (.+)$/, async (aboutText: string) => {
  const editor = await $('[data-test="customize-about"]');
  await editor.waitForDisplayed({ timeout: 5000 });
  // Clear existing content
  await browser.execute(elem => {
    (elem as HTMLElement).innerHTML = "";
  }, editor);
  // Set new content
  await editor.click();
  await browser.keys(aboutText.split(""));
});

When(/^the user enter about text with formatting:$/, async (table: any) => {
  const editor = await $('[data-test="customize-about"]');
  await editor.waitForDisplayed({ timeout: 5000 });
  await browser.execute(elem => {
    (elem as HTMLElement).innerHTML = "";
  }, editor);

  const rows = table.hashes();
  for (const row of rows) {
    const format = row.format.toLowerCase();
    const text = row.text;

    await editor.click();

    if (format === "bold") {
      // Select text, then apply bold
      await browser.keys(text.split(""));
      // Use Ctrl+A to select all in contentEditable
      await browser.keys(["Control", "a"]);
      // Apply bold
      await browser.execute(() => {
        document.execCommand("bold", false, undefined);
      });
    } else if (format === "italic") {
      await browser.keys(text.split(""));
      await browser.keys(["Control", "a"]);
      await browser.execute(() => {
        document.execCommand("italic", false, undefined);
      });
    } else {
      // Normal text
      await browser.keys(text.split(""));
    }

    // Add space after each format block
    await browser.keys([" "]);
  }
});

When(
  /^the user upload a logo file with size: (\d+)KB$/,
  async (size: string) => {
    const sizeInBytes = parseInt(size) * 1024;
    await browser.execute(bytes => {
      // Create a test image blob
      const pngHeader = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde,
      ]);
      const padding = new Uint8Array(Math.max(0, bytes - 100));
      const imageBuffer = new Uint8Array(pngHeader.length + padding.length);
      imageBuffer.set(pngHeader, 0);
      imageBuffer.set(padding, pngHeader.length);

      const blob = new Blob([imageBuffer], { type: "image/png" });
      const file = new File([blob], "test-logo.png", { type: "image/png" });

      const input = document.querySelector(
        '[data-test="customize-logo-upload"] input[type="file"]',
      ) as HTMLInputElement;
      if (!input) throw new Error("Logo input not found");

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, sizeInBytes);
    await browser.pause(500);
  },
);

When(
  /^the user upload a hero image file with size: (\d+)KB$/,
  async (size: string) => {
    const sizeInBytes = parseInt(size) * 1024;
    await browser.execute(bytes => {
      const pngHeader = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde,
      ]);
      const padding = new Uint8Array(Math.max(0, bytes - 100));
      const imageBuffer = new Uint8Array(pngHeader.length + padding.length);
      imageBuffer.set(pngHeader, 0);
      imageBuffer.set(padding, pngHeader.length);

      const blob = new Blob([imageBuffer], { type: "image/png" });
      const file = new File([blob], "test-hero.png", { type: "image/png" });

      const input = document.querySelector(
        '[data-test="customize-hero-upload"] input[type="file"]',
      ) as HTMLInputElement;
      if (!input) throw new Error("Hero input not found");

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, sizeInBytes);
    await browser.pause(500);
  },
);

When(
  /^the user try to upload a logo file with size: (\d+)MB$/,
  async (size: string) => {
    const sizeInBytes = parseInt(size) * 1024 * 1024;
    await browser.execute(bytes => {
      const pngHeader = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde,
      ]);
      const padding = new Uint8Array(Math.max(0, bytes - 100));
      const imageBuffer = new Uint8Array(pngHeader.length + padding.length);
      imageBuffer.set(pngHeader, 0);
      imageBuffer.set(padding, pngHeader.length);

      const blob = new Blob([imageBuffer], { type: "image/png" });
      const file = new File([blob], "oversized-logo.png", {
        type: "image/png",
      });

      const input = document.querySelector(
        '[data-test="customize-logo-upload"] input[type="file"]',
      ) as HTMLInputElement;
      if (!input) throw new Error("Logo input not found");

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, sizeInBytes);
    await browser.pause(500);
  },
);

Then(/^the logo preview is displayed$/, async () => {
  const logoSection = await $(
    "[data-test=customize-logo-upload]",
  ).parentElement();
  const previewImg = await logoSection.$("img");
  await previewImg.waitForDisplayed({ timeout: 5000 });
});

Then(/^the hero preview is displayed$/, async () => {
  const heroSection = await $(
    "[data-test=customize-hero-upload]",
  ).parentElement();
  const previewImg = await heroSection.$("img");
  await previewImg.waitForDisplayed({ timeout: 5000 });
});

When(/^the user click the customize save button$/, async () => {
  const saveBtn = await $('[data-test="customize-save"]');
  await saveBtn.waitForDisplayed({ timeout: 5000 });
  // Scroll page to ensure button is fully visible and not obscured
  await browser.execute(() => {
    const btn = document.querySelector(
      '[data-test="customize-save"]',
    ) as HTMLElement;
    if (btn) {
      btn.scrollIntoView({ behavior: "instant", block: "end" });
    }
  });
  await browser.pause(1000);
  // Use JavaScript click to bypass WebDriver element interception
  await browser.execute(() => {
    const btn = document.querySelector(
      '[data-test="customize-save"]',
    ) as HTMLButtonElement;
    if (btn) btn.click();
  });
  await browser.pause(500);
});

Then(/^a success message is shown$/, async () => {
  const successAlert = await $('[data-test="customize-success"]');
  await successAlert.waitForDisplayed({ timeout: 10000 });
  const text = await successAlert.getText();
  expect(text.toLowerCase()).toContain("success");
});

Then(/^an error message is shown: (.+)$/, async (errorMsg: string) => {
  const errorAlert = await $('[data-test="customize-error"]');
  await errorAlert.waitForDisplayed({ timeout: 10000 });
  const text = await errorAlert.getText();
  expect(text).toContain(errorMsg);
});

Then(/^no preview is displayed for logo$/, async () => {
  const logoSection = await $(
    "[data-test=customize-logo-upload]",
  ).parentElement();
  const previewImg = await logoSection.$("img");
  const isDisplayed = await previewImg.isDisplayed().catch(() => false);
  expect(isDisplayed).toBeFalsy();
});

Then(/^the user is redirected to wallet details$/, async () => {
  const detailsPage = await $("[data-test=wallet-details-page]");
  await detailsPage.waitForDisplayed({ timeout: 10000 });
});

Then(/^the display name is updated to: (.+)$/, async (expectedName: string) => {
  const displayNameElement = await $('[data-test="wallet-details-name"]');
  await displayNameElement.waitForDisplayed({ timeout: 5000 });
  const actualName = await displayNameElement.getText();
  expect(actualName).toContain(expectedName);
});

//#endregion CUSTOMIZE
