import React from "react";
import WalletItem from "../../src/components/WalletItem";

describe("WalletItem Component", () => {
  it("displays wallet name and amount correctly", () => {
    cy.mount(
      <WalletItem name="Savings Wallet" amount={1000} createdAt="2023-04-15" />,
    );
    cy.contains("Savings Wallet").should("exist");
    cy.contains("1000").should("exist");
  });

  it("formats date correctly", () => {
    cy.mount(
      <WalletItem name="Travel Wallet" amount={500} createdAt="Apr 15, 2023" />,
    );
    cy.contains("Travel Wallet").should("exist");
    cy.contains("Apr 15, 2023").should("exist");
  });

  it("handles zero amount correctly", () => {
    cy.mount(
      <WalletItem name="Empty Wallet" amount={0} createdAt="2023-04-15" />,
    );
    cy.contains("Empty Wallet").should("exist");
    cy.contains("0").should("exist");
  });
});
