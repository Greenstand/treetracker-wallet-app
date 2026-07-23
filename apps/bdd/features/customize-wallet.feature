Feature: Customize Wallet

  @web
  Scenario: Update wallet display name and about section
    Given There is a registered account: customize-test-1@greenstand.org, and there is an wallet named: customize-test-1-wallet
    When customize-test-1@greenstand.org login and navigate to wallet details
    And the user click the customize wallet button
    Then the user is on the customize wallet page
    When the user enter display name: My Custom Wallet
    And the user enter about text: This is my awesome wallet for tree tokens
    And the user click the customize save button
    Then a success message is shown
    And the user is redirected to wallet details
    And the display name is updated to: My Custom Wallet

  @web
  Scenario: Upload wallet logo with valid file
    Given There is a registered account: customize-test-2@greenstand.org, and there is an wallet named: customize-test-2-wallet
    When customize-test-2@greenstand.org login and navigate to wallet details
    And the user click the customize wallet button
    And the user upload a logo file with size: 100KB
    Then the logo preview is displayed
    When the user click the customize save button
    Then a success message is shown
    And the user is redirected to wallet details

  @web
  Scenario: Upload wallet hero image with valid file
    Given There is a registered account: customize-test-3@greenstand.org, and there is an wallet named: customize-test-3-wallet
    When customize-test-3@greenstand.org login and navigate to wallet details
    And the user click the customize wallet button
    And the user upload a hero image file with size: 200KB
    Then the hero preview is displayed
    When the user click the customize save button
    Then a success message is shown
    And the user is redirected to wallet details

  @web
  Scenario: Reject file upload exceeding 5MB limit
    Given There is a registered account: customize-test-4@greenstand.org, and there is an wallet named: customize-test-4-wallet
    When customize-test-4@greenstand.org login and navigate to wallet details
    And the user click the customize wallet button
    And the user try to upload a logo file with size: 6MB
    Then an error message is shown: Logo file must be less than 5MB
    And no preview is displayed for logo

  @web
  Scenario: Use rich text editor formatting
    Given There is a registered account: customize-test-5@greenstand.org, and there is an wallet named: customize-test-5-wallet
    When customize-test-5@greenstand.org login and navigate to wallet details
    And the user click the customize wallet button
    And the user enter about text with formatting:
      | format      | text                       |
      | bold        | Important note             |
      | normal      | about this wallet          |
      | italic      | sustainable trees          |
    When the user click the customize save button
    Then a success message is shown
