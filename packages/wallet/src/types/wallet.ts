export type Wallet = {
  id?: string;
  name: string;
  display_name?: string;
  about?: string;
  logo_url?: string;
  cover_image_url?: string;
  created_at?: string;
  tokens_in_wallet?: number;
};

// A transfer record as returned by the wallet-api GET /transfers* endpoints.
export type Transfer = {
  id: string;
  state: string; // requested | pending | completed | cancelled | failed
  type?: string; // send | deduct | managed
  // The API uses *_wallet_id on detail and source/destination_wallet on list —
  // keep both optional so the same type covers list + detail responses.
  sender_wallet_id?: string;
  receiver_wallet_id?: string;
  source_wallet?: string;
  destination_wallet?: string;
  originating_wallet?: string;
  destination_wallet_id?: string;
  token_count?: number;
  parameters?: {
    bundle?: { bundleSize?: number };
    tokens?: string[];
  };
  created_at?: string;
  closed_at?: string;
};

// One entry from GET /tokens/:id/transactions ({ history: [...] }).
export type Transaction = {
  id: string;
  token_id?: string;
  transfer_id?: string;
  source_wallet_id?: string;
  destination_wallet_id?: string;
  source_wallet_name?: string;
  destination_wallet_name?: string;
  processed_at?: string;
  [key: string]: unknown;
};

// Fields accepted by PATCH /wallets/:id (text portion; images handled separately).
export type WalletProfileUpdate = {
  display_name?: string;
  about?: string;
  add_to_web_map?: boolean;
};
