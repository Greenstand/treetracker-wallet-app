import React from "react";
import { createStore, Provider } from "jotai";
import { tokenAtom } from "core";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import WalletDetailsPage from "../../src/app/(protected)/wallet/details/page";

describe("Wallet details profile refresh", () => {
  const wallet = {
    id: "wallet-id",
    name: "test-wallet",
    display_name: "Original name",
    about: "Original description",
    created_at: "2026-01-01T00:00:00Z",
  };

  beforeEach(() => {
    cy.intercept("GET", "**/wallets?*", { wallets: [wallet] }).as("wallets");
    cy.intercept("GET", "**/tokens?*", { tokens: [] });
    const store = createStore();
    store.set(tokenAtom, "test-token" as Parameters<typeof tokenAtom.write>[2]);
    const router = {
      back: cy.stub(),
      forward: cy.stub(),
      refresh: cy.stub().as("refreshPage"),
      push: cy.stub().as("push"),
      replace: cy.stub().as("replace"),
      prefetch: cy.stub(),
    };
    cy.mount(
      <Provider store={store}>
        <AppRouterContext.Provider value={router}>
          <SearchParamsContext.Provider
            value={new URLSearchParams("name=test-wallet")}
          >
            <WalletDetailsPage />
          </SearchParamsContext.Provider>
        </AppRouterContext.Provider>
      </Provider>,
    );
    cy.wait("@wallets");
    cy.get('[data-test="wallet-details-name"]').should(
      "have.text",
      wallet.display_name,
    );
    cy.get('[data-test="wallet-edit-open"]').click();
  });

  it("updates the heading and reopened drawer after repeated saves without navigation", () => {
    for (const name of ["Updated name", "Updated again"]) {
      const about = `${name} description`;
      cy.get('input[name="display_name"]').clear().type(name);
      cy.get('input[name="about"]').clear().type(about);
      cy.intercept("PATCH", "**/wallets/wallet-id", {
        ...wallet,
        display_name: name,
        about,
      }).as("save");
      cy.intercept("GET", "**/wallets?*", {
        wallets: [{ ...wallet, display_name: name, about }],
      }).as("refresh");
      cy.get('[data-test="profile-save"]').click();
      cy.wait("@save");
      cy.wait("@refresh");
      cy.get('[data-test="wallet-details-name"]').should("have.text", name);
      cy.get('[data-test="wallet-details-about"]').should("have.text", about);
      cy.get('[data-test="wallet-edit-saved"]').should("be.visible");
      cy.get('[data-test="wallet-edit-open"]').click();
      cy.get('input[name="display_name"]').should("have.value", name);
      cy.get('input[name="about"]').should("have.value", about);
    }
    cy.get("@push").should("not.have.been.called");
    cy.get("@replace").should("not.have.been.called");
    cy.get("@refreshPage").should("not.have.been.called");
  });

  it("keeps the drawer open and shows an update failure", () => {
    cy.intercept("PATCH", "**/wallets/wallet-id", {
      statusCode: 500,
      body: { message: "Update unavailable" },
    });
    cy.get('input[name="display_name"]').clear().type("Updated name");
    cy.get('[data-test="profile-save"]').click();
    cy.get('[data-test="profile-error"]').should(
      "contain.text",
      "Update unavailable",
    );
    cy.get('input[name="display_name"]').should("have.value", "Updated name");
    cy.get('[data-test="wallet-edit-saved"]').should("not.exist");
  });

  it("distinguishes a saved update from a failed refresh", () => {
    cy.intercept("PATCH", "**/wallets/wallet-id", { ...wallet });
    cy.intercept("GET", "**/wallets?*", {
      statusCode: 500,
      body: { message: "Refresh unavailable" },
    });
    cy.get('input[name="display_name"]').clear().type("Updated name");
    cy.get('[data-test="profile-save"]').click();
    cy.get('[data-test="profile-error"]').should(
      "contain.text",
      "Wallet profile was saved, but could not be refreshed",
    );
    cy.get('input[name="display_name"]').should("have.value", "Updated name");
    cy.get('[data-test="wallet-edit-saved"]').should("not.exist");
  });
});
