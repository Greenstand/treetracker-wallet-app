Feature: Send and Receive Token between Wallets

  @web
  Scenario: Send token from one wallet to another
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
