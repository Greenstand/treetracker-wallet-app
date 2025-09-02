# this is not a real feature, just use this to test if the step definitions are working
Feature: step sandbox

  # this is just to test if the step defined in 'Given' is working
  # it should create a user test@greenstand.org in the system
  @skip
  Scenario: Test if the login account step works
    Given test@greenstand.org is a registered user
    When nothing to do
    Then nothing to do
