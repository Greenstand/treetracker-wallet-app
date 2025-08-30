describe("Search Page - Send and Request Actions via Bottom Nav", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/home");
  });

  it("can complete the Send action flow", () => {
    cy.get('[data-test="bottom-nav-send"]').click();

    cy.get('[data-test="choose-action-send"]').click();

    cy.get('[data-cy="wallet-item"]').first().click();

    cy.contains("button", "2").click();
    cy.contains("button", "2").click();

    cy.get('[data-test="send-button"]').click();

    cy.get('[data-cy="wallet-item-list"]', { timeout: 5000 })
      .should("have.length.greaterThan", 0)
      .first()
      .should("be.visible")
      .click();

    cy.get('[data-test="button-submit"]').click();
  });

  it("can complete the Request action flow", () => {
    cy.get('[data-test="bottom-nav-send"]').click();

    cy.get('[data-test="choose-action-request"]').click();

    cy.get('[data-cy="wallet-item"]').first().click();

    cy.contains("button", "2").click();
    cy.contains("button", "2").click();

    cy.get('[data-test="request-button"]').click();

    cy.get('[data-test="button-submit"]').click();

    cy.get('[data-test="transaction-snackbar"]').should("be.visible");
  });
});
