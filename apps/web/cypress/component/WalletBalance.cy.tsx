import React from "react";
import { WalletBalance } from "../../src/components/WalletBalance";

describe("WalletBalance Component", () => {
  it("displays correct wallet amount", () => {
    cy.mount(<WalletBalance walletAmount={500} />);
    cy.contains("Wallet").should("exist");
    cy.contains("500").should("exist");
  });
});
