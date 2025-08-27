@web @skip
Feature: send token to someone by email address
  Token owner can send tokens to another user by email address

  Scenario: as token owner, I can pick a token and add my friend's email address then send it to him/her
    Given I am on my wallet: wallet-1 page
    And there is token: token-1 in wallet: wallet-1
    When I click token-1 to view its details
    And I click on the send token button
    And I input the email address and click 'submit'
    Then I should see a confirmation message that the token has been sent
    And I should receive an email with the token details
      Email content:
        | subject                     | Greenstand Token sent to you! |
        | body                        | You have received a token from wallet-1. Please click link below to claim it. |
