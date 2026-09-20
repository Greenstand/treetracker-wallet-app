import React from "react";
import WalletItem from "../../src/components/WalletItem";

describe("WalletItem Component", () => {
  it("displays wallet name and amount correctly", () => {
    cy.mount(
      <WalletItem
        name="Savings Wallet"
        tokens_in_wallet={1000}
        created_at="April 15, 2023"
      />,
    );
    cy.contains("Savings Wallet").should("exist");
    cy.contains("1000").should("exist");
  });

  it("formats date correctly", () => {
    cy.mount(
      <WalletItem
        name="Travel Wallet"
        tokens_in_wallet={500}
        created_at="April 15, 2023"
      />,
    );
    cy.contains("Travel Wallet").should("exist");
    cy.contains("April 15, 2023").should("exist");
  });

  it("handles zero amount correctly", () => {
    cy.mount(
      <WalletItem
        name="Empty Wallet"
        tokens_in_wallet={0}
        created_at="April 15, 2023"
      />,
    );
    cy.contains("Empty Wallet").should("exist");
    cy.contains("0").should("exist");
  });

  it("names the pending count when a transfer is holding tokens", () => {
    cy.mount(
      <WalletItem
        name="Wallet A"
        created_at="1 Jan 2026"
        tokens_in_wallet={5}
        tokens_pending={3}
      />,
    );
    cy.get('[data-test="wallet-item-pending-Wallet A"]').should(
      "contain.text",
      "3 pending",
    );
  });

  it("shows no pending line when nothing is reserved", () => {
    cy.mount(
      <WalletItem
        name="Wallet B"
        created_at="1 Jan 2026"
        tokens_in_wallet={5}
        tokens_pending={0}
      />,
    );
    cy.get('[data-test="wallet-item-pending-Wallet B"]').should("not.exist");
  });
});
