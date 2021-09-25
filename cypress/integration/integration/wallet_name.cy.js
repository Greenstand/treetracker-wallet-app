//To test /wallets/[walletName] page
import log from 'loglevel';
import path from 'path';
import tokenA from '../../fixtures/tokenA';
import tokenB from '../../fixtures/tokenB';

describe('/wallets/{walletName}', () => {
  it('/wallets/{walletName}', () => {
    console.log('env:', Cypress.env());
    cy.intercept(
      `${Cypress.env('REACT_APP_API_WALLET')}wallets/SustainablyRun`,
      { fixture: 'SustainablyRun.json' },
    );
    cy.intercept(
      `${Cypress.env('REACT_APP_API_WALLET')}wallets/SustainablyRun/tokens`,
      { tokens: [tokenA, tokenB] },
    );
    cy.visit('/wallets/SustainablyRun');

    //the the content has been loaded by API correctly
    cy.contains('SustainablyRun');
    cy.contains('2 tokens');
    cy.contains(tokenA.capture_id);
    cy.contains(tokenA.planter_name);
    cy.contains(tokenB.capture_id);
    cy.contains(tokenB.planter_name);
  });
});
