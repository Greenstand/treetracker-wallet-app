"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Stack,
  Alert,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import {
  useGetWallets,
  useSendTransfer,
  generateActionToken,
  Wallet,
} from "@treetracker/wallet";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export default function SendPage() {
  const router = useRouter();
  const { wallets, isWalletLoading } = useGetWallets();
  const { sendTransfer } = useSendTransfer();
  const authToken = useAtomValue(tokenAtom);

  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("1");
  const [claim, setClaim] = useState(false);
  const [shareByLink, setShareByLink] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Default the source wallet to the first one once wallets load.
  useEffect(() => {
    if (!sender && wallets.length > 0) {
      setSender((wallets[0] as Wallet).name);
    }
  }, [wallets, sender]);

  const senderWallet = wallets.find((w) => (w as Wallet).name === sender) as
    | Wallet
    | undefined;
  const available = senderWallet?.tokens_available;
  const pending = senderWallet?.tokens_pending ?? 0;

  const amountNum = Number(amount);
  const overAvailable =
    available !== undefined &&
    Number.isInteger(amountNum) &&
    amountNum > available;
  // Say why before the request, rather than after the API's 409.
  const amountError = overAvailable
    ? pending > 0
      ? `Only ${available} available, ${pending} are in a pending transfer`
      : `Only ${available} available`
    : undefined;
  const amountValid =
    Number.isInteger(amountNum) && amountNum >= 1 && !overAvailable;
  const valid = shareByLink
    ? Boolean(sender) && amountValid
    : Boolean(sender) &&
      Boolean(recipient.trim()) &&
      amountValid &&
      recipient.trim() !== sender;

  async function onSend() {
    if (!valid || submitting || success) return;
    setSubmitting(true);
    setError(null);
    try {
      if (shareByLink) {
        // No receiver: issue an action token and show a claim link on the next
        // view. Whoever opens the link claims the tokens on first wallet creation.
        if (!authToken) throw new Error("User not authenticated");
        const res = await generateActionToken(authToken, {
          bundle_size: amountNum,
          sender_wallet: sender,
          recipient_email: "link-recipient@greenstand.org",
        });
        const base =
          BASE_URL ||
          (typeof window !== "undefined" ? window.location.origin : "");
        setShareLink(`${base}/claim?action_token=${res.action_token}`);
      } else {
        await sendTransfer({
          sender_wallet: sender,
          receiver_wallet: recipient.trim(),
          bundle_size: amountNum,
          claim,
        });
        setSuccess(true);
        // Give the snackbar a beat, then go to the pending list.
        setTimeout(() => router.push("/transfers"), 1200);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send");
    } finally {
      setSubmitting(false);
    }
  }

  // Prefer the system share sheet on a phone, since this link is usually sent
  // through a messaging app. Fall back to the clipboard elsewhere.
  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: shareLink });
        return;
      }
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
    } catch {
      // A cancelled share sheet lands here too, so say nothing.
    }
  };

  // "Next page": once a link is generated, show it instead of the form.
  if (shareLink) {
    return (
      <Box sx={{ p: 2 }} data-test="share-result-page">
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Share this link
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Anyone who opens this link can claim the tokens when they create a
          wallet.
        </Typography>
        <Box
          data-test="share-qr"
          sx={{ display: "inline-block", p: 1.5, mb: 1, bgcolor: "#fff" }}
        >
          <QRCodeSVG value={shareLink} size={200} />
        </Box>
        <Paper sx={{ p: 1.5, wordBreak: "break-all" }} data-test="share-link">
          {shareLink}
        </Paper>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={onShare} data-test="share-copy">
            Share link
          </Button>
          <Button
            variant="text"
            onClick={() => router.push("/home")}
            sx={{ color: "green" }}
            data-test="share-done"
          >
            Done
          </Button>
        </Stack>

        <Snackbar
          open={copied}
          autoHideDuration={3000}
          onClose={() => setCopied(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" data-test="share-copied">
            Link copied
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }} data-test="send-page">
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Send tokens
      </Typography>

      <TextField
        select
        fullWidth
        label="From wallet"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        disabled={isWalletLoading || wallets.length === 0}
        sx={{ mb: 2 }}
        data-test="send-source-wallet"
      >
        {wallets.map((w, i) => {
          const name = (w as Wallet).name;
          return (
            <MenuItem key={i} value={name} data-test={`send-source-${name}`}>
              {name}
              {(w as Wallet).tokens_available !== undefined
                ? ` (${(w as Wallet).tokens_available} available)`
                : (w as Wallet).tokens_in_wallet !== undefined
                  ? ` (${(w as Wallet).tokens_in_wallet} tokens)`
                  : ""}
            </MenuItem>
          );
        })}
      </TextField>

      {!shareByLink && (
        <TextField
          fullWidth
          label="Recipient wallet"
          placeholder="Recipient wallet name"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          sx={{ mb: 2 }}
          data-test="send-recipient"
        />
      )}

      <TextField
        fullWidth
        type="number"
        label="Amount (number of tokens)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ min: 1, step: 1 }}
        error={Boolean(amountError)}
        helperText={amountError}
        sx={{ mb: 1 }}
        data-test="send-amount"
      />

      {!shareByLink && (
        <FormControlLabel
          control={
            <Checkbox
              checked={claim}
              onChange={(e) => setClaim(e.target.checked)}
              data-test="send-claim"
            />
          }
          label="Claim tokens (transfer ownership)"
        />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={shareByLink}
            onChange={(e) => setShareByLink(e.target.checked)}
            data-test="send-share-qr"
          />
        }
        label="Share by QR code"
      />

      {error && (
        <Typography color="error" variant="body2" data-test="send-error">
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={!valid || submitting || success}
        onClick={onSend}
        sx={{ mt: 2, textTransform: "uppercase" }}
        data-test="send-submit"
      >
        {submitting ? "Sending…" : shareByLink ? "Create link" : "Send"}
      </Button>

      <Snackbar
        open={success}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" data-test="send-success">
          Transfer initiated. The recipient can accept it from their pending
          transfers.
        </Alert>
      </Snackbar>
    </Box>
  );
}
