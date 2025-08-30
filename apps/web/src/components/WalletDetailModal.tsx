"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const dataWalletList = [
  { id: "1", title: "Wallet_1", wallet: "0x1234...abcd" },
  { id: "2", title: "Wallet_2", wallet: "0x2345...bcde" },
];

interface WalletDetailModalProps {
  open: boolean;
  onClose: () => void;
  wallet: {
    walletName: string;
    walletAddress: string;
  };
  defaultAction?: "request" | "send" | null;
  onTransactionComplete?: (transaction: any) => void;
}

const WalletList = ({
  wallets,
}: {
  wallets: { id: string; title: string; wallet: string }[];
}) => {
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  return (
    <Box>
      {wallets.map(wallet => (
        <Box
          key={wallet.id}
          data-cy={`wallet-item-list`}
          onClick={() => setSelectedWalletId(wallet.id)}
          sx={{
            display: "flex",
            p: 3,
            borderBottom: "1px solid #eee",
            cursor: "pointer",
            backgroundColor:
              selectedWalletId === wallet.id ? "#F7E5C4" : undefined,
            "&:hover": {
              backgroundColor:
                selectedWalletId === wallet.id ? "#F7E5C4" : "#f5f5f5",
            },
          }}>
          <Typography variant="body1">{wallet.title}</Typography>
          <Box sx={{ ml: "auto" }}></Box>
          <ArrowForwardIosIcon sx={{ fontSize: "16px", color: "#666" }} />
        </Box>
      ))}
    </Box>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

const ActionButton = ({
  disabled,
  children,
  onClick,
  sx,
  ...props // <-- collect all extra props
}: {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  sx?: object;
  [key: string]: any; // <-- allow any other prop
}) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{
      color: "#fff",
      minWidth: "100px",
      height: "40px",
      fontSize: "0.875rem",
      ...sx,
    }}
    disabled={disabled}
    {...props} // <-- forward all extra props, including data-test
  >
    {children}
  </Button>
);

const TransactionActionButton = ({
  action,
  amount,
  selectedAction,
  defaultAction,
  dataTest,
  onActionSelect,
  onSubmit,
}: {
  action: "send" | "request";
  amount: string;
  dataTest: string;
  selectedAction: "send" | "request" | null;
  defaultAction?: "send" | "request" | null;
  onActionSelect: (action: "send" | "request") => void;
  onSubmit: () => void;
}) => {
  const isSelected = selectedAction === action || defaultAction === action;

  const handleClick = () => {
    onActionSelect(action);
    onSubmit();
  };

  return (
    <ActionButton
      onClick={handleClick}
      data-test={dataTest}
      sx={{
        bgcolor: "#61892F",
        "&:disabled": { bgcolor: "#cccccc", color: "#666666" },
      }}
      disabled={!isSelected || amount === "0" || amount.length === 0}>
      {action === "request" ? "Request" : "Send"}
    </ActionButton>
  );
};

const Keypad = ({
  onButtonClick,
}: {
  onButtonClick: (key: string) => void;
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        width: "75%",
      }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "clear"].map(
        (key, index) => (
          <Button
            key={index}
            onClick={() => onButtonClick(key === "clear" ? "clear" : key)}
            sx={{
              height: 55,
              fontSize: "1.4rem",
              fontWeight: "bold",
              bgcolor: "#FAFAFA",
              borderRadius: "6px",
              color: "#000",
            }}>
            {key === "clear" ? (
              <BackspaceIcon sx={{ mr: 1, color: "#000" }} />
            ) : (
              key
            )}
          </Button>
        ),
      )}
    </Box>
  </Box>
);

export default function WalletDetailModal({
  open,
  onClose,
  wallet,
  defaultAction,
  onTransactionComplete,
}: WalletDetailModalProps) {
  const { walletName, walletAddress } = wallet;
  const [amount, setAmount] = useState("0");
  const [selectedAction, setSelectedAction] = useState<
    "request" | "send" | null
  >(defaultAction || null);
  const [isTransactionSubmit, setTransactionSubmit] = useState(false);
  const [transactionNote, setTransactionNote] = useState("");

  const handleAmountChange = (value: string) => {
    setAmount(prevAmount => {
      let newValue = prevAmount;

      if (value === "clear") {
        return "0";
      } else if (value === "delete") {
        return newValue.slice(0, -1) || "0";
      } else if (value === ".") {
        return newValue.includes(".") ? newValue : newValue + ".";
      } else if (!isNaN(Number(value))) {
        return newValue === "0" ? value : newValue + value;
      }
      return newValue;
    });
  };

  const handleTransactionSubmit = () => {
    const currentAction = selectedAction || defaultAction;

    if (!currentAction || amount === "0") {
      alert("Please select an action and enter an amount");
      return;
    }

    const transactionData = {
      action: currentAction,
      amount: parseFloat(amount),
      walletName,
      walletAddress,
      note: transactionNote,
    };

    console.log("Transaction submitted:", transactionData);

    const transaction = {
      action: currentAction,
      amount,
      walletName,
      note: transactionNote,
    };
    sessionStorage.setItem("pendingTransaction", JSON.stringify(transaction));

    if (onTransactionComplete) onTransactionComplete(transaction);

    setAmount("0");
    setSelectedAction(null);
    setTransactionNote("");
    onClose();
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/home`;
  };

  if (!open) return null;

  return (
    <Box
      data-testid="wallet-modal"
      sx={{
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "grey.100",
        zIndex: 1300,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          flex: 1,
          overflow: "auto",
          paddingBottom: "20px",
        }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <IconButton
            onClick={() => {
              onClose();
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/search`;
            }}>
            <ArrowBackIcon sx={{ color: "#000" }} />
          </IconButton>
          <IconButton onClick={onClose} data-testid="modal-close">
            <CloseIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Typography variant="h5" sx={{ mb: 1, color: "#000" }}>
          {walletName}
        </Typography>

        <Avatar
          sx={{
            width: 50,
            height: 50,
            mx: "auto",
            mb: 2,
            bgcolor: "grey.400",
            fontSize: "1rem",
          }}>
          {getInitials(walletName)}
        </Avatar>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#000", mb: 1 }}>
          Tokens
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#000",
            borderBottom: "2px solid #000",
            display: "inline-block",
            paddingBottom: "4px",
            marginBottom: "20px",
          }}>
          {amount}
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="What's this for?"
            value={transactionNote}
            onChange={e => setTransactionNote(e.target.value)}
            sx={{ width: "100%" }}
          />
          {!isTransactionSubmit && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <TransactionActionButton
                dataTest="send-button"
                action="send"
                selectedAction={selectedAction}
                defaultAction={defaultAction}
                onActionSelect={setSelectedAction}
                onSubmit={() => setTransactionSubmit(true)}
                amount={amount}
              />
              <TransactionActionButton
                dataTest="request-button"
                action="request"
                selectedAction={selectedAction}
                defaultAction={defaultAction}
                onActionSelect={setSelectedAction}
                onSubmit={() => setTransactionSubmit(true)}
                amount={amount}
              />
            </Box>
          )}
          {isTransactionSubmit && selectedAction === "send" && (
            <WalletList wallets={dataWalletList} />
          )}
          {isTransactionSubmit && (
            <Box sx={{ mt: 1 }}>
              <ActionButton
                onClick={handleTransactionSubmit}
                sx={{ bgcolor: "#61892F", width: "100%" }}
                data-test="button-submit">
                {(selectedAction || defaultAction) === "request"
                  ? "Request"
                  : "Send"}
              </ActionButton>
            </Box>
          )}
        </Box>

        {!isTransactionSubmit && <Keypad onButtonClick={handleAmountChange} />}
      </Box>
    </Box>
  );
}
