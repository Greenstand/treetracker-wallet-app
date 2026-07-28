Feature: Share Token to Others

  @web @skip
  Scenario: Share token by link
    Given There is a registered account: share-token-test-1@greenstand.org, and there is an wallet named: share-token-test-1-wallet, and there is one token:6593b5ff-576c-4969-86b4-7fe2aa4af1a1 in this wallet
    And There is one person A who has no account on Greenstand
    When share-token-test-1@greenstand.org login and click the send token button, and pick: share-token-test-1-wallet as sender and enable the checkbox: 'share by QR code', and input 1 token to send, and submit
    Then the link shows up on the next page
    When the user A open the link
    # for bdd, the link is opened in another browser, the two browser don't share cash and session, so they don't share the auth and is isolated
    Then the user finish the registeration and login as share-token-receive-1@greenstand.org
    Then the user create a wallet: share-token-recieve-wallet-1
    Then the shared token is in the wallet

  #@web @skip 
  #Scenario: Share token by QR code

  #@web @skip
  #Scenario: Share token to user who has account already
