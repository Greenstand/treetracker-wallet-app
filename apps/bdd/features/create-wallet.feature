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


  @web
  Scenario: As a user, I can create a new wallet
    Given I am on the register page
    When I fill in the registration form with [random user name]@greenstand.org password: Abcde123$
    And I click on the register button
    Then I should see a confirmation message
    And I am on the wallet page
    When I create a new wallet
    Then I should see my new wallet in the list of wallets
    And An notification saying: "Thank you for creating your wallet, we will gift you 1 token for your first wallet, please check your wallet details"
    When I click on the wallet to view its details
    Then I should see there are 1 tokens in my wallet as gift by system for creating wallet for the first time
    When I click the token item on the list of tokens in the wallet details page
    Then I should see the token details page with token info
    And I should see the tree section on the token details page
    When I click the location icon on the token details page
    Then I should see the map page with the location of the token in a new tab
    # the map page url is like: https://map.treetracker.org/tokens/[token_id], for dev, the domain is https://dev.map.treetracker.org/tokens/[token_id]
