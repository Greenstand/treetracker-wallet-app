'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { tokenAtom } from 'core';
import {
  isNoWalletError,
  redeemActionToken,
  useGetWallets,
  type Wallet,
} from '@treetracker/wallet';
import {
  savePendingActionToken,
  clearPendingActionToken,
} from '@/utils/actionToken';

// Public landing for a shared token link: {BASE_URL}/claim?action_token=<jwt>.
// The recipient may not be registered, so this route is intentionally outside
// the (protected)/(public) auth gates. A signed-out visitor gets the link saved
// and chooses sign in or register; PendingClaimHandler redeems it once they are
// signed in with a wallet, or wallet creation does on their first wallet. A
// signed-in visitor redeems here, because /signup would bounce them to Home and
// strand the token. A signed-in visitor with no wallet yet gets the link saved
// and is sent to create one; wallet creation redeems it.
function Claim() {
  const router = useRouter();
  const authToken = useAtomValue(tokenAtom);
  const {
    wallets: loadedWallets,
    isWalletLoading,
    error: walletError,
  } = useGetWallets();
  const wallets = loadedWallets as Wallet[];
  const [status, setStatus] = useState<
    'working' | 'choosing' | 'claimed' | 'failed' | 'needsAuth' | 'needsWallet'
  >('working');
  const [error, setError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [claimedWallet, setClaimedWallet] = useState('');
  const claimInProgress = useRef(false);
  // Read the action token after mount so this page does not remain stuck in a
  // useSearchParams Suspense fallback while resolving a share link.
  const [actionToken, setActionToken] = useState<string | null>(null);
  const [paramsReady, setParamsReady] = useState(false);

  useEffect(() => {
    setActionToken(
      new URLSearchParams(window.location.search).get('action_token'),
    );
    setParamsReady(true);
  }, []);

  const showWalletChoice =
    !walletError &&
    !isWalletLoading &&
    wallets.length > 1 &&
    status !== 'claimed' &&
    status !== 'failed';

  const claimIntoWallet = useCallback(
    async (walletName: string) => {
      if (!authToken || !actionToken || claimInProgress.current) return;

      claimInProgress.current = true;
      setStatus('working');
      try {
        await redeemActionToken(authToken, actionToken, walletName);
        clearPendingActionToken();
        setClaimedWallet(walletName);
        setStatus('claimed');
      } catch (e) {
        if (isNoWalletError(e)) {
          savePendingActionToken(actionToken);
          setStatus('needsWallet');
          return;
        }
        setError(
          e instanceof Error ? e.message : 'Could not claim the tokens.',
        );
        setStatus('failed');
      }
    },
    [actionToken, authToken],
  );

  useEffect(() => {
    if (!paramsReady) return undefined;

    if (!actionToken) {
      router.replace('/login');
      return undefined;
    }

    if (!authToken) {
      // The session is per tab, so a link opened from a messaging app looks
      // signed out even for an existing user. Offer both, rather than
      // assuming they are new and sending them to register.
      savePendingActionToken(actionToken);
      setStatus('needsAuth');
      return undefined;
    }

    if (isWalletLoading) return undefined;
    if (walletError) {
      setError(walletError);
      setStatus('failed');
      return undefined;
    }
    if (wallets.length === 0) {
      savePendingActionToken(actionToken);
      setStatus('needsWallet');
      return undefined;
    }
    if (wallets.length === 1) {
      void claimIntoWallet(wallets[0].name);
      return undefined;
    }

    setSelectedWallet((current) => current || wallets[0].name);
    setStatus('choosing');
    return undefined;
  }, [
    actionToken,
    authToken,
    claimIntoWallet,
    isWalletLoading,
    paramsReady,
    router,
    walletError,
    wallets,
  ]);

  if (status === 'failed') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600} color="error">
          This link could not be claimed
        </Typography>
        <Typography
          variant="body1"
          color="error"
          sx={{ mt: 1 }}
          data-test="claim-error"
        >
          {error}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.replace('/home')}
          sx={{ mt: 3, color: 'green', borderColor: 'green' }}
          data-test="claim-home"
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  if (status === 'needsAuth') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          You&apos;ve received tokens!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          Sign in to claim them, or create an account if you are new.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => router.replace('/login')}
            data-test="claim-sign-in"
          >
            I already have an account
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.replace('/signup')}
            sx={{ color: 'green', borderColor: 'green' }}
            data-test="claim-register"
          >
            Create an account
          </Button>
        </Stack>
      </Box>
    );
  }

  if (status === 'needsWallet') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          You&apos;ve received tokens!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          Create a wallet to claim these tokens.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.replace('/wallet')}
          sx={{ mt: 3 }}
          data-test="claim-create-wallet"
        >
          Create a wallet
        </Button>
      </Box>
    );
  }

  if (status === 'claimed') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          Tokens claimed
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          The tokens have been added to &quot;{claimedWallet}&quot;.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.replace('/wallet')}
          sx={{ mt: 3 }}
          data-test="claim-view-wallet"
        >
          View your wallets
        </Button>
      </Box>
    );
  }

  if (showWalletChoice || status === 'choosing') {
    const walletToClaim = selectedWallet || wallets[0]?.name || '';

    return (
      <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          Choose a wallet
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Choose which wallet should receive these tokens.
        </Typography>
        <TextField
          select
          fullWidth
          label="Receive tokens in"
          value={walletToClaim}
          onChange={(event) => setSelectedWallet(event.target.value)}
          sx={{ mt: 3, textAlign: 'left' }}
          data-test="claim-wallet-select"
        >
          {wallets.map((wallet) => (
            <MenuItem key={wallet.name} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          disabled={!walletToClaim}
          onClick={() => void claimIntoWallet(walletToClaim)}
          sx={{ mt: 3 }}
          data-test="claim-confirm"
        >
          Claim tokens
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }} data-test="claim-page">
      <Typography variant="h6" fontWeight={600}>
        You&apos;ve received tokens!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
        Claiming your tokens…
      </Typography>
      <Box sx={{ mt: 3 }} data-test="claim-saved">
        <CircularProgress />
      </Box>
    </Box>
  );
}

export default function ClaimPage() {
  return <Claim />;
}
