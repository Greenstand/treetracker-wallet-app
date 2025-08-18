@web @skip
Feature: receive token by following the link in the email

  Scenario: As a user, I can receive a token by following the link in the email
    Given I received an email with a token link
    And I am not registered in the system
    When I click on the link in the email
    Then I should be redirected to registration page, and I follow the registration process and login wallet app, and create a new wallet, and the token should be added to my new wallet
