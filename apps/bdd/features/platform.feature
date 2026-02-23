# the feature to define the whole platform of greenstand
Feature: Platform

  # the scenario to define the platform of greenstand
  @native
  Scenario: Tree Capture
    Given the user installed the tree capture app
    Then the user can open the app and start populating the user info
