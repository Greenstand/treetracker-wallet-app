@mobile_native @skip
Feature: The first page of the native app

  Scenario : As a user I can open the app
    Given I am on the phone home screen
    When I open the app
    Then I should see the app's landing page
