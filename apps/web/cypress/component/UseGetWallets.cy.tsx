import React, { Suspense, useState } from "react";
import { createStore, Provider } from "jotai";
import { tokenAtom } from "core";
import {
  useGetWallets,
  useIncomingTransfers,
  Wallet,
} from "@treetracker/wallet";

function WalletsProbe({ id = "wallets" }: { id?: string }) {
  const { wallets, isWalletLoading, error, reload } = useGetWallets();
  const [result, setResult] = useState<boolean | null>(null);
  return (
    <section data-test={id}>
      <output>
        {JSON.stringify({ wallets, isWalletLoading, error, result })}
      </output>
      <button onClick={async () => setResult(await reload())}>Reload</button>
    </section>
  );
}

function IncomingProbe() {
  const { incoming, isLoading } = useIncomingTransfers();
  return (
    <output data-test="incoming">
      {JSON.stringify({ incoming, isLoading })}
    </output>
  );
}

describe("useGetWallets compatibility", () => {
  const wallet = {
    id: "wallet-id",
    name: "my-wallet",
    display_name: "My wallet",
    about: "Wallet description",
    logo_url: "logo.png",
    cover_url: "cover.png",
    tokens_in_wallet: 7,
    created_at: "2026-01-01T12:00:00Z",
  };

  type HookState = {
    wallets: Wallet[];
    isWalletLoading: boolean;
    error: string | null;
    result: boolean | null;
  };

  // Parse inside should so Cypress retries against the latest React render.
  const assertState = (assertion: (value: HookState) => void, id = "wallets") =>
    cy.get(`[data-test="${id}"] output`).should(($output) => {
      assertion(JSON.parse($output.text()));
    });

  const mount = (token: string | null, children = <WalletsProbe />) => {
    const store = createStore();
    store.set(tokenAtom, token as Parameters<typeof tokenAtom.write>[2]);
    cy.mount(
      <Provider store={store}>
        <Suspense fallback="Loading session">{children}</Suspense>
      </Provider>,
    );
    return store;
  };

  it("skips unauthenticated requests and loads again when the token changes", () => {
    cy.intercept("GET", "**/wallets?*", (req) => {
      expect(req.query.limit).to.eq("10");
      req.reply({ wallets: [wallet] });
    }).as("load");
    const store = mount(null);
    cy.contains("button", "Reload").click();
    assertState((value) => {
      expect(value).to.deep.equal({
        wallets: [],
        isWalletLoading: false,
        error: null,
        result: false,
      });
    });
    cy.get("@load.all").should("have.length", 0);
    for (const token of ["first-token", "refreshed-token"]) {
      cy.then(() => {
        store.set(tokenAtom, token as Parameters<typeof tokenAtom.write>[2]);
      });
      cy.wait("@load")
        .its("request.headers.authorization")
        .should("eq", `Bearer ${token}`);
      cy.get('[data-test="wallets"] output').should(
        "contain.text",
        "My wallet",
      );
    }
    assertState((value) => {
      expect(value.wallets[0]).to.deep.equal({
        ...wallet,
        created_at: new Date(wallet.created_at).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    });
  });

  it("reports initial errors and recovers to an empty wallet list on reload", () => {
    cy.intercept("GET", "**/wallets?*", {
      statusCode: 500,
      body: { message: "Wallets unavailable" },
    }).as("load");
    mount("test-token");
    cy.wait("@load");
    cy.get('[data-test="wallets"] output').should(
      "contain.text",
      "Wallets unavailable",
    );
    cy.intercept("GET", "**/wallets?*", { wallets: [] }).as("retry");
    cy.contains("button", "Reload").click();
    cy.wait("@retry");
    assertState((value) => {
      expect(value).to.deep.equal({
        wallets: [],
        isWalletLoading: false,
        error: null,
        result: true,
      });
    });
  });

  it("refreshes only the requesting instance and keeps existing data after failure", () => {
    cy.intercept("GET", "**/wallets?*", { wallets: [wallet] }).as("load");
    mount(
      "test-token",
      <>
        <WalletsProbe id="first" />
        <WalletsProbe id="second" />
      </>,
    );
    cy.wait(["@load", "@load"]);
    cy.intercept("GET", "**/wallets?*", {
      wallets: [{ ...wallet, display_name: "Changed" }],
    }).as("refresh");
    cy.get('[data-test="first"] button').click();
    cy.wait("@refresh");
    assertState(
      (value) => expect(value.wallets[0].display_name).to.eq("Changed"),
      "first",
    );
    assertState(
      (value) => expect(value.wallets[0].display_name).to.eq("My wallet"),
      "second",
    );
    cy.intercept("GET", "**/wallets?*", {
      statusCode: 500,
      body: { message: "Refresh unavailable" },
    }).as("failure");
    cy.get('[data-test="first"] button').click();
    cy.wait("@failure");
    assertState((value) => {
      expect(value.wallets[0].display_name).to.eq("Changed");
      expect(value.error).to.eq("Refresh unavailable");
      expect(value.isWalletLoading).to.eq(false);
      expect(value.result).to.eq(false);
    }, "first");
  });

  it("preserves incoming-transfer filtering used by the notification badge", () => {
    cy.intercept("GET", "**/wallets?*", { wallets: [wallet] });
    cy.intercept("GET", "**/transfers?*", (req) => {
      req.reply({
        transfers:
          req.query.state === "pending"
            ? [
                { id: "mine", destination_wallet: "my-wallet" },
                { id: "other", destination_wallet: "another-wallet" },
              ]
            : [],
      });
    });
    mount("test-token", <IncomingProbe />);
    cy.get('[data-test="incoming"]').should(
      "contain.text",
      '"isLoading":false',
    );
    cy.get('[data-test="incoming"]').should(($output) => {
      expect(JSON.parse($output.text()).incoming).to.deep.equal([
        { id: "mine", destination_wallet: "my-wallet" },
      ]);
    });
  });
});
