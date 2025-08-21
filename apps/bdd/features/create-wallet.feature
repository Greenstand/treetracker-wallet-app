Feature: Create wallet
  A user can create his/her own wallet, and for first wallet created, system award N tokens

  @skip
  Scenario: As a user, I can create a new wallet
    Given I am on the wallet creation page
    When I fill in the wallet creation form with valid data: wallet name: MyWallet
    And I click on the create wallet button
    Then I should see a confirmation message that my wallet has been created
    And I should see my new wallet in the list of wallets
    When I click on the wallet to view its details
    Then I should see there are N tokens in my wallet

  @skip
  Scenario: Wallet creation with duplicated name
    Given test@greenstand.org is registered in the system
    And test@greenstand.org account has a wallet: MyWallet
    And login by test@greenstand.org
    And I am on the wallet creation page
    When I fill in the wallet creation form with invalid data: wallet name: MyWallet
    And I click on the create wallet button
    Then I should see text "Wallet name already exists"
