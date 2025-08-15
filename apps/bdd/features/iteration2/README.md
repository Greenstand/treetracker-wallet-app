# Iteration 2: first version of mobile native

Basically, first mobile native version is the same as the first web version as
defined in iteration 1.

We will reuse the tree feature defined in the feature folder:

- login.feature
- register.feature
- create-wallet.feature

And add tag to the feature file to indicate that it is for mobile native or/and
web.

Example:

```
  @mobile_native @web
  Scenario: As a user, I can log into the wallet app with my social account
    Given I am on the login page
    And My social account is linked
    When I login with my social account
    Then I should see text "You logged into a secure area!"
```
