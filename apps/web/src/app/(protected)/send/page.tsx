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
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useGetWallets, useSendTransfer, Wallet } from "@treetracker/wallet";

export default function SendPage() {
  const router = useRouter();
  const { wallets, isWalletLoading } = useGetWallets();
  const { sendTransfer } = useSendTransfer();

  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("1");
  const [claim, setClaim] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Default the source wallet to the first one once wallets load.
  useEffect(() => {
    if (!sender && wallets.length > 0) {
      setSender((wallets[0] as Wallet).name);
    }
  }, [wallets, sender]);

  const amountNum = Number(amount);
  const valid =
    Boolean(sender) &&
    Boolean(recipient.trim()) &&
    Number.isInteger(amountNum) &&
    amountNum >= 1 &&
    recipient.trim() !== sender;

  async function onSend() {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await sendTransfer({
        sender_wallet: sender,
        receiver_wallet: recipient.trim(),
        bundle_size: amountNum,
        claim,
      });
      setSuccess(true);
      // Give the snackbar a beat, then go to the pending list.
      setTimeout(() => router.push("/transfers"), 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send");
    } finally {
      setSubmitting(false);
    }
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
              {(w as Wallet).tokens_in_wallet !== undefined
                ? ` (${(w as Wallet).tokens_in_wallet} tokens)`
                : ""}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        fullWidth
        label="Recipient wallet"
        placeholder="Recipient wallet name"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        sx={{ mb: 2 }}
        data-test="send-recipient"
      />

      <TextField
        fullWidth
        type="number"
        label="Amount (number of tokens)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ min: 1, step: 1 }}
        sx={{ mb: 1 }}
        data-test="send-amount"
      />

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

      {error && (
        <Typography color="error" variant="body2" data-test="send-error">
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={!valid || submitting}
        onClick={onSend}
        sx={{ mt: 2, textTransform: "uppercase" }}
        data-test="send-submit"
      >
        {submitting ? "Sending…" : "Send"}
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
