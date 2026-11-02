import React from "react";
import { ClaimWalletPicker } from "../../src/components/ClaimWalletPicker";

const wallets = [{ name: "Primary wallet" }, { name: "Secondary wallet" }];

describe("ClaimWalletPicker Component", () => {
  it("lists wallets and confirms the selected destination", () => {
    const onConfirm = cy.stub().as("onConfirm");

    cy.mount(
      <ClaimWalletPicker
        wallets={wallets}
        selectedWallet="Secondary wallet"
        onWalletChange={cy.stub()}
        onConfirm={onConfirm}
      />,
    );

    cy.get('[data-test="claim-wallet-select"]').should(
      "contain.text",
      "Secondary wallet",
    );
    cy.contains("Secondary wallet").should("exist");
    cy.contains("Claim tokens").click();
    cy.get("@onConfirm").should("have.been.calledOnce");
  });

  it("defaults to the first wallet when no selection is provided", () => {
    cy.mount(
      <ClaimWalletPicker
        wallets={wallets}
        selectedWallet=""
        onWalletChange={cy.stub()}
        onConfirm={cy.stub().as("onConfirm")}
      />,
    );

    cy.get('[data-test="claim-wallet-select"]').should(
      "contain.text",
      "Primary wallet",
    );
    cy.contains("Claim tokens").click();
    cy.get("@onConfirm").should("have.been.calledOnce");
  });
});
