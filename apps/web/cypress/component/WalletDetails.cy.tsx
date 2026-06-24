import React from "react";
import WalletDetails from "../../src/components/WalletDetails";

describe("WalletDetails Component", () => {
  it("displays the token amount and accessible wallet actions", () => {
    cy.viewport(390, 844);
    cy.mount(<WalletDetails tokenAmount={1000} />);

    cy.get('[role="tab"][aria-selected="true"]').should(
      "contain.text",
      "Details",
    );
    cy.get('[data-test="wallet-details-balance"]').should("have.text", "1000");
    cy.contains("Tokens").should("be.visible");
    cy.get('button[aria-label="Edit wallet"]').should("be.visible");
    cy.get('button[aria-label="Delete wallet"]').should("be.visible");
  });

  it("switches between Details and Activity", () => {
    cy.mount(
      <WalletDetails
        tokenAmount={3}
        activityContent={<div>Wallet activity content</div>}
      />,
    );

    cy.get('[data-test="wallet-details-summary"]').should("be.visible");
    cy.contains('[role="tab"]', "Activity").click();
    cy.get('[data-test="wallet-activity-panel"]')
      .should("be.visible")
      .and("contain.text", "Wallet activity content");
    cy.get('[data-test="wallet-details-summary"]').should("not.exist");

    cy.contains('[role="tab"]', "Details").click();
    cy.get('[data-test="wallet-details-summary"]').should("be.visible");
  });

  it("calls the edit and delete handlers", () => {
    const onEdit = cy.stub().as("onEdit");
    const onDelete = cy.stub().as("onDelete");

    cy.mount(
      <WalletDetails tokenAmount={3} onEdit={onEdit} onDelete={onDelete} />,
    );

    cy.get('button[aria-label="Edit wallet"]').click();
    cy.get("@onEdit").should("have.been.calledOnce");

    cy.get('button[aria-label="Delete wallet"]').click();
    cy.get("@onDelete").should("have.been.calledOnce");
  });

  it("shows a labelled loading indicator", () => {
    cy.mount(<WalletDetails tokenAmount={0} isLoading />);

    cy.get('[aria-label="Loading token balance"]').should("be.visible");
  });
});
