Feature: Register
  New user register by email, social media

  @skip @web
  Scenario: As a new user, I can register new account by email address
    Given I am on the register page
    #And test@greenstand.org is not registered in the system
    When I fill in the registration form with [random user name]@greenstand.org password: Abcde123$
    And I click on the register button
    Then I should see a confirmation message

  @skip @web
  Scenario: As a new user, I can register new account by social media
    Given I am on the register page
    When I click on the social media: google login button
    Then I should be redirected to the social media authentication page
    And I login with my social media account
    And I should be able to log in with my social media account

  @web
  Scenario: After registration, user can access account settings with email and creation date
    Given I am on the register page
    When I fill in the registration form with [random user name]@greenstand.org password: Abcde123$
    And I click on the register button
    Then I should see a confirmation message
    When I click the settings nav icon
    Then the user is on the settings page
    When I click the Account item
    Then the user is on the account page
    And account email is displayed
    And a "Member since" date is shown
    When I click the security link
    Then a new tab opens to the Keycloak account console
    When I click the logout button
    Then the user is redirected to the login page
