import React from "react";
import WalletDrawerForm from "../../src/app/wallet/WalletDrawerForm";

describe("WalletDrawerForm Component", () => {
  it("renders form fields and title", () => {
    cy.mount(
      <WalletDrawerForm
        name=""
        setName={() => {}}
        description=""
        setDescription={() => {}}
        onClose={() => {}}
        existingWallets={[]}
        open={true}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("Provide Wallet Details").should("exist");
    cy.get("input[placeholder='Name']").should("exist");
    cy.get("input[placeholder='Description']").should("exist");
    cy.contains("button", "Create Wallet").should("exist");
  });

  it("disables Create Wallet button when name is empty", () => {
    cy.mount(
      <WalletDrawerForm
        name=""
        setName={() => {}}
        description=""
        setDescription={() => {}}
        onClose={() => {}}
        existingWallets={[]}
        open={true}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("button", "Create Wallet").should(
      "have.css",
      "pointer-events",
      "none",
    );
    cy.contains("button", "Create Wallet").should(
      "have.css",
      "background-color",
      "rgb(204, 204, 204)",
    );
  });

  it("enables Create Wallet button when name is valid and unique", () => {
    cy.mount(
      <WalletDrawerForm
        name="New Wallet"
        setName={() => {}}
        description=""
        setDescription={() => {}}
        onClose={() => {}}
        existingWallets={[]}
        open={true}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("button", "Create Wallet").should(
      "not.have.css",
      "pointer-events",
      "none",
    );
    cy.contains("button", "Create Wallet").should(
      "not.have.css",
      "background-color",
      "rgb(204, 204, 204)",
    );
  });

  it("shows error for non-unique wallet name", () => {
    cy.mount(
      <WalletDrawerForm
        name="Existing Wallet"
        setName={() => {}}
        description=""
        setDescription={() => {}}
        onClose={() => {}}
        existingWallets={[
          { name: "Existing Wallet", createdAt: "2024-01-01", amount: 0 },
        ]}
        open={true}
        onAddWallet={() => {}}
      />,
    );
    cy.contains("Wallet name should be unique").should("exist");
    cy.get("input[placeholder='Name']")
      .parent()
      .find("svg[data-testid='ErrorOutlineIcon']")
      .should("exist");
  });

  it("calls onAddWallet when Create Wallet is clicked with valid input", () => {
    const onAddWallet = cy.spy().as("onAddWalletSpy");
    cy.mount(
      <WalletDrawerForm
        name="New Wallet"
        setName={() => {}}
        description="Test description"
        setDescription={() => {}}
        onClose={() => {}}
        existingWallets={[]}
        open={true}
        onAddWallet={onAddWallet}
      />,
    );
    cy.contains("button", "Create Wallet").click();
    cy.get("@onAddWalletSpy").should("have.been.calledWith", {
      name: "New Wallet",
      description: "Test description",
    });
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = cy.spy().as("onCloseSpy");
    cy.mount(
      <WalletDrawerForm
        name=""
        setName={() => {}}
        description=""
        setDescription={() => {}}
        onClose={onClose}
        existingWallets={[]}
        open={true}
        onAddWallet={() => {}}
      />,
    );
    cy.get("button").find("svg[data-testid='CloseIcon']").click();
    cy.get("@onCloseSpy").should("have.been.calledOnce");
  });
});
