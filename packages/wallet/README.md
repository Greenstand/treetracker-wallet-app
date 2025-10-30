# @treetracker/wallet

Wallet management package for Treetracker Wallet App

## Overview

This package provides hooks and API functions for wallet management, including
creating wallets, fetching wallet data, and managing wallet state in the
Treetracker Wallet App.

## Installation

This package is part of the Treetracker Wallet App monorepo. To install
dependencies:

```bash
yarn
```

## Package Structure

```
packages/wallet/
├── src/
│   ├── api/           # API functions (createWallet, getWallets)
│   ├── hooks/         # React hooks (useCreateWallet, useGetWallets)
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── index.ts       # Package exports
├── tests/             # End-to-end tests
├── package.json       # Package configuration
└── README.md          # This file
```

## API Functions

| Function       | Description                                |
| -------------- | ------------------------------------------ |
| `createWallet` | Create a new wallet for authenticated user |
| `getWallets`   | Fetch wallets for authenticated user       |

## React Hooks

| Hook              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `useCreateWallet` | Hook for creating wallets with authentication state management |
| `useGetWallets`   | Hook for fetching and managing wallet list state               |

## Usage

### API Functions

#### createWallet

```typescript
import { createWallet } from "@treetracker/wallet";

const walletData = {
  name: "MyWallet",
  about: "A wallet for my trees",
};

const token = "your-auth-token";

try {
  const result = await createWallet(walletData, token);
  console.log("Wallet created:", result);
} catch (error) {
  console.error("Failed to create wallet:", error);
}
```

#### getWallets

```typescript
import { getWallets } from "@treetracker/wallet";

const token = "your-auth-token";
const numberOfWallets = 10;

try {
  const wallets = await getWallets(token, numberOfWallets);
  console.log("Wallets:", wallets);
} catch (error) {
  console.error("Failed to get wallets:", error);
}
```

### React Hooks

#### useCreateWallet

```typescript
import { useCreateWallet } from '@treetracker/wallet';

function CreateWalletComponent() {
  const { createWallet } = useCreateWallet();

  const handleCreate = async () => {
    try {
      const result = await createWallet({
        name: "MyNewWallet",
        about: "Description of my wallet"
      });
      console.log('Wallet created:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleCreate}>Create Wallet</button>;
}
```

#### useGetWallets

```typescript
import { useGetWallets } from '@treetracker/wallet';

function WalletListComponent() {
  const { wallets, isWalletLoading, error } = useGetWallets();

  if (isWalletLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {wallets.map(wallet => (
        <div key={wallet.name}>
          <h3>{wallet.name}</h3>
          <p>Tokens: {wallet.amount}</p>
          <p>Created: {wallet.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
```

## Types

### Wallet

```typescript
type Wallet = {
  id?: string;
  name: string;
  about?: string;
  logo_url?: string;
  created_at?: Date;
  tokens_in_wallet?: number;
};
```

## Testing

### e2e tests

`yarn test`

### Running tests

The package includes e2e tests for wallet creation. To run the tests:

```bash
yarn test
```

## Environment Variables

This package requires the following environment variables:

### For Web Applications

- `NEXT_PUBLIC_TREETRACKER_API` - The base URL for the Treetracker API
- `NEXT_PUBLIC_WALLET_API_KEY` - API key for wallet operations

### For Native Applications

Configure via `app.config.js`:

- `extra.apiBaseUrl` - The base URL for the Treetracker API
- `extra.treetrackerApiKey` - API key for wallet operations

### For Testing

Create a `.env` file in the `packages/wallet` directory:

```sh
NEXT_PUBLIC_WALLET_APP_API=http://localhost:8080
NEXT_PUBLIC_BASE_URL=http://localhost:3000

PRIVATE_KEYCLOAK_REALM =
PRIVATE_KEYCLOAK_BASE_URL =
PRIVATE_KEYCLOAK_CLIENT_SECRET =
PRIVATE_KEYCLOAK_CLIENT_ID =

NEXT_PUBLIC_TREETRACKER_API = http://localhost:3006
NEXT_PUBLIC_WALLET_API_KEY = "Refer treetracker-wallet-api documentation for generating this api key"
```

## Dependencies

This package depends on:

- `@treetracker/keycloak` - Keycloak integration for authentication
- `axios` - HTTP client for API requests
- `core` - Core package providing shared atoms and utilities
- `dotenv` - Environment variable management
- `joi` - Data validation
- `jotai` - State management for authentication tokens

## Authentication

All API functions and hooks require a valid authentication token. The hooks
automatically retrieve the token from the global state using `tokenAtom` from
the `core` package.

If the user is not authenticated, hooks will throw an error:
`"User not authenticated"`
