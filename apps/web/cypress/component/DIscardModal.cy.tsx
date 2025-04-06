import React from "react";
import DiscardModal from "../../src/app/wallet/DiscardModal";

describe("DiscardModal Component", () => {
  it("renders correctly when open", () => {
    cy.mount(
      <DiscardModal
        open={true}
        onKeep={cy.stub().as("keepStub")}
        onDiscard={cy.stub().as("discardStub")}
      />,
    );
    cy.contains("Discard changes?").should("be.visible");
    cy.contains("Are you sure you want to discard this wallet?").should(
      "be.visible",
    );
  });

  it("doesn't render when closed", () => {
    cy.mount(
      <DiscardModal open={false} onKeep={cy.stub()} onDiscard={cy.stub()} />,
    );
    cy.contains("Discard changes?").should("not.exist");
  });

  it("calls onKeep when keep button is clicked", () => {
    cy.mount(
      <DiscardModal
        open={true}
        onKeep={cy.stub().as("keepStub")}
        onDiscard={cy.stub().as("discardStub")}
      />,
    );
    cy.contains("keep changes").click();
    cy.get("@keepStub").should("be.called");
  });

  it("calls onDiscard when discard button is clicked", () => {
    cy.mount(
      <DiscardModal
        open={true}
        onKeep={cy.stub().as("keepStub")}
        onDiscard={cy.stub().as("discardStub")}
      />,
    );
    cy.contains("DISCARD").click();
    cy.get("@discardStub").should("be.called");
  });

  it("calls onKeep when close icon is clicked", () => {
    cy.mount(
      <DiscardModal
        open={true}
        onKeep={cy.stub().as("keepStub")}
        onDiscard={cy.stub().as("discardStub")}
      />,
    );
    cy.get("svg").first().click(); // Assuming this is the CloseIcon
    cy.get("@keepStub").should("be.called");
  });
});
