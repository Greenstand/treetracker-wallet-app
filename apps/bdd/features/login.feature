Feature: Wallet app login
  In order to access my wallet

  Scenario: Wrong login
    Given I am on the login page
    When I login with foobar and barfoo
    Then I should see text Login failed

  @skip
  Scenario: Correct login
    Given I am on the login page
    And test@greenstand.org is a registered user
    When I login with test@greenstand.org and abc.123
    Then I am on the home page

  @skip
  Scenario: As a user, I can log into the wallet app with my social account
    Given I am on the login page
    And My social account is linked
    When I login with my social account
    Then I should see text "You logged into a secure area!"
