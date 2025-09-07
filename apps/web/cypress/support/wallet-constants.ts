export const SELECTORS = {
  walletCreateOpen: "wallet-create-open",
  walletNameInput: "wallet-name-input",
  walletCreateSubmitButton: "wallet-create-submit",
  walletList: "wallet-list",
  errorHelperText: "error-helper-text",
} as const;

export function loadWalletFixture() {
  return cy.fixture("wallet.json").as("walletData");
}
