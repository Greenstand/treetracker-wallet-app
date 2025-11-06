import React from "react";
import WalletCreateDrawer from "../../src/components/WalletCreateDrawer";

describe("WalletCreateDrawer Component", () => {
  const mountDrawer = (
    props: Partial<React.ComponentProps<typeof WalletCreateDrawer>> = {},
  ) => {
    const onClose = cy.spy().as("onClose");
    const onCreate = cy.spy().as("onCreate");
    const defaultProps = {
      open: true,
      onClose,
      onCreate,
      existingNames: [] as string[],
    };
    cy.mount(<WalletCreateDrawer {...defaultProps} {...props} />);
    return { onClose, onCreate };
  };

  const getNameInput = () => cy.get('input[name="name"]');
  const getDescInput = () => cy.get('input[name="description"]');
  const getCreateBtn = () => cy.contains("button", "Create Wallet");
  const getCloseBtn = () => cy.get('button[aria-label="close"]');
  const getErrorHelper = () => cy.get('[data-test="error-helper-text"]');

  it("renders when open and closes immediately when clean (no confirm)", () => {
    const { onClose } = mountDrawer({ open: true });

    cy.contains("Provide wallet details").should("exist");

    getCloseBtn().click();
    cy.get("@onClose").should("have.been.calledOnce");
  });

  it("does not render when open = false", () => {
    cy.mount(
      <WalletCreateDrawer
        open={false}
        onClose={cy.spy().as("onClose")}
        onCreate={cy.spy().as("onCreate")}
        existingNames={[]}
      />,
    );
    cy.contains("Provide wallet details").should("not.exist");
  });

  it('disables "Create Wallet" when name is empty/whitespace; enables when valid', () => {
    mountDrawer();

    getCreateBtn().should("be.disabled");

    getNameInput().type("   ");
    getCreateBtn().should("be.disabled");

    getNameInput().clear().type("My Wallet");
    getCreateBtn().should("not.be.disabled");
  });

  it("calls onCreate with trimmed payload, then calls onClose", () => {
    const { onCreate, onClose } = mountDrawer();

    getNameInput().type("  My Wallet  ");
    getDescInput().type("  A test description  ");

    getCreateBtn().click();

    cy.get("@onCreate").should("have.been.calledOnce");
    cy.get("@onCreate")
      .its("firstCall.args.0")
      .should((payload: any) => {
        expect(payload).to.deep.equal({
          name: "My Wallet",
          description: "A test description",
        });
      });

    cy.get("@onClose").should("have.been.calledOnce");
  });

  it("shows duplicate helper text and disables Create when name exists (case-insensitive)", () => {
    mountDrawer({ existingNames: ["My Wallet"] });

    getNameInput().type("my wallet");
    getErrorHelper().should("contain.text", "Wallet name should be unique.");
    getCreateBtn().should("be.disabled");
  });

  it("dirty close shows confirm dialog; KEEP leaves open; DISCARD triggers onClose", () => {
    const { onClose } = mountDrawer();

    getNameInput().type("Temp");

    getCloseBtn().click();
    cy.contains("Discard changes?").should("be.visible");
    cy.contains("Are you sure you want to discard the new wallet?").should(
      "be.visible",
    );

    cy.contains("button", "KEEP CHANGES").click();
    cy.contains("Provide wallet details").should("exist");
    cy.get("@onClose").should("not.have.been.called");

    getCloseBtn().click();
    cy.contains("button", "DISCARD").click();
    cy.get("@onClose").should("have.been.calledOnce");
  });
});
