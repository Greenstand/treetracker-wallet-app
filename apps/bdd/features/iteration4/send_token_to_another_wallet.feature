@skip @web @mobile_native
Feature: send token to another wallet

  Scenario: as token owner, I can pick a token and add my friend's wallet address then send it to him/her
    Given I have a wallet: wallet-1, and there is a token in it: token-1
    And I am on the home page
    When I click send button
    And I select token-1 to send
    And I input my friend's wallet address
    Then I should see a confirmation message that the token has been sent
    And the token should not be in my wallet anymore
    And the token should be in my friend's wallet
