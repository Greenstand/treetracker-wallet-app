export const SELECTORS = {
  walletCreateOpen: "wallet-create-open",
  walletNameInput: "wallet-create-name",
  walletCreateSubmitButton: "wallet-create-submit",
  walletList: "wallet-list",
  errorHelperText: "error-helper-text",
} as const;

export function loadWalletFixture() {
  return cy.fixture("wallet.json").as("walletData");
}
