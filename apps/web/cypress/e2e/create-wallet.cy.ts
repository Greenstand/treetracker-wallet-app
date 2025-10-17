// apps/web/cypress/e2e/create-wallet.cy.ts
import { SELECTORS } from "../support/wallet-constants";

let walletData: {
  routes: { wallets: string };
  mocks: { initialList: any[]; createdWallet: { id: string; name: string } };
};

describe("Wallet - Create flow (integration, all requests mocked)", () => {
  before(() => {
    cy.fixture("wallet.json").then(data => {
      walletData = data;
    });
  });

  beforeEach(() => {
    cy.intercept("GET", "/wallets*", {
      statusCode: 200,
      body: walletData?.mocks?.initialList ?? [],
    }).as("getWallets");

    cy.visit(walletData.routes.wallets, {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(
          "token",
          JSON.stringify("fake-token-for-tests"),
        );
      },
    });
  });

  it("happy path: jump -> input wallet name -> create", () => {
    const name = walletData.mocks.createdWallet.name;

    cy.getByData(SELECTORS.walletCreateOpen).click();

    cy.getByData(SELECTORS.walletNameInput).clear().type(name);

    cy.intercept("POST", "/wallets", req => {
      expect(req.body).to.have.property("wallet", name);
      req.reply({ statusCode: 201, body: walletData.mocks.createdWallet });
    }).as("createWallet");

    cy.getByData(SELECTORS.walletCreateSubmitButton).click();

    cy.contains(name).should("exist");
  });

  it("client-side duplicate check: shows helper text and disables submit", () => {
    const dupName = walletData.mocks.createdWallet.name;

    cy.getByData(SELECTORS.walletCreateOpen).click();
    cy.getByData(SELECTORS.walletNameInput).type(dupName);

    cy.intercept("POST", "/wallets", req => {
      expect(req.body).to.have.property("wallet", dupName);
      req.reply({ statusCode: 201, body: walletData.mocks.createdWallet });
    }).as("createWallet");

    cy.getByData(SELECTORS.walletCreateSubmitButton).click();
    cy.contains(dupName).should("exist");

    cy.getByData(SELECTORS.walletCreateOpen).click();
    cy.getByData(SELECTORS.walletNameInput).type(dupName);
    cy.getByData(SELECTORS.errorHelperText).should("contain.text", "unique");
    cy.getByData(SELECTORS.walletCreateSubmitButton).should("be.disabled");
  });
});
