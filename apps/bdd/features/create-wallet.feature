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


  @discovery
  Scenario: As a user, I can create a new wallet (but has problem)
    #Given test@greenstand.org is registered in the system
    Given I am on the login page
    And I login with an account
    And I am on the wallet page
    When I create a new wallet
    Then I noticed that I can click the create button, and the pop-up dialog disappear but nothing happens, no new wallet shows up, and in the devtool network panel, there are 404 error shown below:
    #http://localhost:3000/wallets
    #Request Method
    #POST
    #Status Code 404 Not Found

