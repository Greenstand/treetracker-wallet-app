Feature: Send and Receive Token between Wallets

  @web
  Scenario: Accept token transfer
    Given There is a registered account: send-token-test-1@greenstand.org, and there is an wallet named: send-token-test-1-wallet, and there is one token in this wallet
    And There is a registered account: send-token-test-2@greenstand.org, and there is an wallet named: send-token-test-2-wallet
    When send-token-test-1@greenstand.org login and click the send token button, and pick: send-token-test-1-wallet as sender and send-token-test-2-wallet as receiver, and input 1 token to send, and submit
    Then send-token-test-2@greenstand.org login and click: noticiation navigation bar
    Then there is a message of pending token
    When the user click the message
    Then the user is on the message detail page
    When the user click the accept button
    Then there is a confirmation message: 'you received token [token id]'
    Then on the send-token-test-2-wallet page
    And there is the token sent by the user 1

  @web
  Scenario: Decline token transfer
    Given There is a registered account: send-token-test-3@greenstand.org, and there is an wallet named: send-token-test-3-wallet, and there is one token in this wallet
    And There is a registered account: send-token-test-4@greenstand.org, and there is an wallet named: send-token-test-4-wallet
    When send-token-test-3@greenstand.org login and click the send token button, and pick: send-token-test-3-wallet as sender and send-token-test-4-wallet as receiver, and input 1 token to send, and submit
    Then send-token-test-4@greenstand.org login and view the transfers page
    Then there is an incoming pending transfer to respond to
    When the user click the decline button
    Then the transfer is no longer listed
    Then on the send-token-test-4-wallet page
    And there is no token from send-token-test-3 in the wallet

  @web
  Scenario: Cancel token transfer
    Given There is a registered account: send-token-test-5@greenstand.org, and there is an wallet named: send-token-test-5-wallet, and there is one token in this wallet
    And There is a registered account: send-token-test-6@greenstand.org, and there is an wallet named: send-token-test-6-wallet
    When send-token-test-5@greenstand.org login and click the send token button, and pick: send-token-test-5-wallet as sender and send-token-test-6-wallet as receiver, and input 1 token to send, and submit
    Then there is an outgoing pending transfer to cancel
    When the user click the cancel button
    Then the transfer is no longer listed
    Then on the send-token-test-5-wallet page
    And there is the token still in the wallet
