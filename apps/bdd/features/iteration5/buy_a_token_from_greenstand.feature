@skip @web @mobile_native
Feature: buy a token from Greenstand

  Scenario: As a user, I can buy a token from Greenstand
    Given I am on the home page
    And I have a wallet: wallet-1
    When I click on the "Buy Token" button
    And I select the amount of tokens to buy
    And I input my payment details and click "Submit"
    Then I should see a confirmation message that the token has been purchased
    And the token should be in my wallet: wallet-1
