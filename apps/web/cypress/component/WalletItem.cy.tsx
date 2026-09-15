import React from "react";
import WalletItem from "../../src/components/WalletItem";

describe("WalletItem Component", () => {
  it("shows the edited display name while preserving the wallet identifier", () => {
    cy.mount(<WalletItem name="wallet-id" display_name="Updated wallet" />);
    cy.get('[data-test="wallet-item-name-wallet-id"]').should(
      "have.text",
      "Updated wallet",
    );
  });

  it("falls back to the wallet name when the display name is empty", () => {
    cy.mount(<WalletItem name="wallet-id" display_name="" />);
    cy.get('[data-test="wallet-item-name-wallet-id"]').should(
      "have.text",
      "wallet-id",
    );
  });

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
});
