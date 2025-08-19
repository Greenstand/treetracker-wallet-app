Feature: Register
  New user register by email, social media

  @skip
  Scenario Outline: As a new user, I can register new account by email address
    Given I am on the register page
    And test@greenstand.org is not registered in the system
    When I fill in the registration form with valid data
      | email               | password |
      | test@greenstand.org | abc.123  |
    And I click on the register button
    Then I should see a confirmation message

  @skip 
  Scenario Outline: As a new user, I can register new account by social media
    Given I am on the register page
    When I click on the social media login button
      | social_media |
      | Google       |
    Then I should be redirected to the social media authentication page
    And I should be able to log in with my social media account
