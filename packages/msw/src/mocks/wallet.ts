export const mockWallets = [
  {
    id: "wallet-1",
    name: "Primary Wallet",
    about: "Main wallet",
    logo_url: null,
    created_at: "2024-01-01T00:00:00.000Z",
    tokens_in_wallet: 10,
  },
  {
    id: "wallet-2",
    name: "Secondary Wallet",
    about: "Secondary wallet",
    logo_url: null,
    created_at: "2024-01-02T00:00:00.000Z",
    tokens_in_wallet: 5,
  },
];

export const mockTokens = [
  {
    id: "token-1",
    wallet: "Primary Wallet",
    tree_id: "tree-1",
    created_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "token-2",
    wallet: "Primary Wallet",
    tree_id: "tree-2",
    created_at: "2024-01-02T00:00:00.000Z",
  },
];

export const mockTransfers = [
  {
    id: "transfer-1",
    type: "send",
    amount: 1,
    sender_wallet: "Primary Wallet",
    receiver_wallet: "Secondary Wallet",
    created_at: "2024-01-01T00:00:00.000Z",
    state: "completed",
  },
];
