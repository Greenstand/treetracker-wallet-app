import React from "react";
import CreateWalletDrawer from "../../src/app/wallet/CreateWalletDrawer";

describe("CreateWalletDrawer Component", () => {
  it("renders drawer when open", () => {
    cy.mount(
      <CreateWalletDrawer
        open={true}
        onClose={() => {}}
        wallets={[]}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("Provide Wallet Details").should("exist");
    cy.get("input[placeholder='Name']").should("exist");
  });

  it("does not render drawer when closed", () => {
    cy.mount(
      <CreateWalletDrawer
        open={false}
        onClose={() => {}}
        wallets={[]}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("Provide Wallet Details").should("not.exist");
  });

  it("shows discard modal when closing with changes", () => {
    cy.mount(
      <CreateWalletDrawer
        open={true}
        onClose={() => {}}
        wallets={[]}
        onAddWallet={() => {}}
      />,
    );
    cy.get("input[placeholder='Name']").type("Test Wallet");
    cy.get("button").find("svg[data-testid='CloseIcon']").click();
    cy.contains("Discard changes?").should("exist");
  });

  it("closes without modal when no changes", () => {
    const onClose = cy.spy().as("onCloseSpy");
    cy.mount(
      <CreateWalletDrawer
        open={true}
        onClose={onClose}
        wallets={[]}
        onAddWallet={() => {}}
      />,
    );
    cy.get("button").find("svg[data-testid='CloseIcon']").click();
    cy.get("@onCloseSpy").should("have.been.calledOnce");
    cy.contains("Discard changes?").should("not.exist");
  });

  it("keeps drawer open when Keep Changes is clicked", () => {
    cy.mount(
      <CreateWalletDrawer
        open={true}
        onClose={() => {}}
        wallets={[]}
        onAddWallet={() => {}}
      />,
    );
    cy.get("input[placeholder='Name']").type("Test Wallet");
    cy.get("button").find("svg[data-testid='CloseIcon']").click();
    cy.contains("button", "keep changes").click();
    cy.contains("Provide Wallet Details").should("exist");
    cy.get("input[placeholder='Name']").should("have.value", "Test Wallet");
  });
});
