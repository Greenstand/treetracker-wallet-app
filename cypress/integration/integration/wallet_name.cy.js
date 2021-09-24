//To test /wallets/[walletName] page
import log from 'loglevel';
import path from 'path';
import tokenA from '../../fixtures/tokenA';
import tokenB from '../../fixtures/tokenA';

describe('/wallets/{walletName}', () => {
  it('/wallets/{walletName}', () => {
    cy.intercept(
      'https://4861b9cd-4ac3-460e-b42f-9b14ac00c403.mock.pstmn.io/wallets/SustainablyRun',
      { fixture: 'SustainablyRun.json' },
    );
    cy.intercept(
      'https://4861b9cd-4ac3-460e-b42f-9b14ac00c403.mock.pstmn.io/wallets/SustainablyRun/tokens',
      { tokens: [tokenA, tokenB] },
    );
    cy.visit('/wallets/SustainablyRun');
    cy.contains('SustainablyRun');
    cy.contains('2 tokens');
  });
});
