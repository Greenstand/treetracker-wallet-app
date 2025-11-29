@native 
Feature: App Launch
  Scenario: User opens the app for the first time
    Given the app is installed
    When I launch the app
    Then I should see the first screen   