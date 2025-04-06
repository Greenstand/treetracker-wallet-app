import React from "react";
import WalletPage from "../../src/app/wallet/page";

describe("WalletPage Component", () => {
  it("renders wallet list and create button", () => {
    cy.mount(<WalletPage />);
    cy.contains("Your Wallets").should("exist");
    cy.contains("button", "CREATE WALLET").should("exist");
    cy.contains("Wallet 1").should("exist");
    cy.contains("Wallet 2").should("exist");
  });

  it("opens CreateWalletDrawer when Create Wallet button is clicked", () => {
    cy.mount(<WalletPage />);
    cy.contains("button", "CREATE WALLET").click();
    cy.contains("Provide Wallet Details").should("exist");
  });

  it("closes CreateWalletDrawer when close button is clicked with no changes", () => {
    cy.mount(<WalletPage />);
    cy.contains("button", "CREATE WALLET").click();
    cy.get("button").find("svg[data-testid='CloseIcon']").click();
    cy.contains("Provide Wallet Details").should("not.exist");
  });
});
