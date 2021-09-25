//To test /wallets/[walletName] page
import log from 'loglevel';
import path from 'path';
import tokenA from '../../fixtures/tokenA';
import tokenB from '../../fixtures/tokenB';

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

    //the the content has been loaded by API correctly
    cy.contains('SustainablyRun');
    cy.contains('2 tokens');
    cy.contains(tokenA.capture_id);
    cy.contains(tokenA.planter_name);
    cy.contains(tokenB.capture_id);
    cy.contains(tokenB.planter_name);
  });
});
