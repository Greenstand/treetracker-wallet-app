it('load landing page', () => {
  cy.intercept('/api/wallets/stephanie', { fixture: 'Stephanie.json' });
  cy.visit('baseUrl');
  cy.visit('/');
  cy.contains('@Stephanie');
});
