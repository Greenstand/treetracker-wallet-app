Feature: Create wallet
  A user can create his/her own wallet, and for first wallet created, system award N tokens

  @skip
  Scenario Outline: As a user, I can create a new wallet
    Given I am on the wallet creation page
    When I fill in the wallet creation form with valid data
      | wallet_name | password  |
      | MyWallet    | secure123 |
    And I click on the create wallet button
    Then I should see a confirmation message that my wallet has been created
    And I should see my new wallet in the list of wallets
    When I click on the wallet to view its details
    Then I should see there are N tokens in my wallet

  @skip
  Scenario: Wallet creation with invalid data
    Given I am on the wallet creation page
    When I fill in the wallet creation form with valid data
      | wallet_name | password |
      |             |          |
    And I click on the create wallet button
    Then I should see text "Wallet name is required"
