"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Avatar,
    Modal,
    Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const getInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
};

interface SendRequestModalProps {
    open: boolean;
    onClose: () => void;
    recipientName: string;
}

const availableWallets = [
    { id: 1, name: "Wallet_1" },
    { id: 2, name: "Wallet_2" },
];

export default function SendRequestModal({
    open,
    onClose,
    recipientName,
}: SendRequestModalProps) {
    const [description, setDescription] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [showWalletSelection, setShowWalletSelection] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<string>("");
    const [isDescriptionLocked, setIsDescriptionLocked] = useState(false);

    const handleSend = () => {
        if (!showWalletSelection) {
            if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
                alert("Please enter a valid token amount");
                return;
            }
            if (!description.trim()) {
                alert("Please enter a description");
                return;
            }
            setIsDescriptionLocked(true);
            setShowWalletSelection(true);
        } else {
            if (!selectedWallet) {
                alert("Please select a wallet");
                return;
            }
            console.log("Send transaction", {
                recipientName,
                description,
                tokenAmount,
                fromWallet: selectedWallet,
            });
            handleClose();
        }
    };

    const handleRequest = () => {
        if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
            alert("Please enter a valid token amount");
            return;
        }
        if (!description.trim()) {
            alert("Please enter a description");
            return;
        }
        console.log("Request clicked", { recipientName, description, tokenAmount });
        handleClose();
    };

    const handleWalletSelect = (walletName: string) => {
        setSelectedWallet(walletName);
    };

    const handleBack = () => {
        if (showWalletSelection) {
            setShowWalletSelection(false);
            setSelectedWallet("");
            setIsDescriptionLocked(false); // Make description editable again
        }
    };

    const handleClose = () => {
        onClose();
        // Reset state
        setShowWalletSelection(false);
        setTokenAmount("");
        setDescription("");
        setSelectedWallet("");
        setIsDescriptionLocked(false);
    };

    const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
            setTokenAmount(value);
        }
    };

    const isFormValid =
        tokenAmount && parseFloat(tokenAmount) > 0 && description.trim();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
            }}>
            <Box
                sx={{
                    width: "100%",
                    height: "calc(100vh - 80px)",
                    marginTop: "80px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    outline: "none",
                    overflow: "hidden",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderBottom: "1px solid #e0e0e0",
                        flexShrink: 0,
                    }}>
                    {showWalletSelection ? (
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ width: 48 }} />
                    )}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "auto",
                        minHeight: 0,
                    }}>
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            px: 3,
                            py: 2,
                            minHeight: "calc(100vh - 160px)",
                        }}>
                        <Box sx={{ textAlign: "center", mb: 3 }}>
                            <Typography variant="h4" sx={{ mb: 3, fontWeight: "normal" }}>
                                {recipientName}
                            </Typography>

                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mb: 3,
                                    backgroundColor: "#bdbdbd",
                                    fontSize: "2rem",
                                    mx: "auto",
                                }}>
                                {getInitials(recipientName)}
                            </Avatar>

                            {showWalletSelection ? (
                                <>
                                    <Typography variant="h3" sx={{ mb: 1, fontWeight: "normal" }}>
                                        {tokenAmount}
                                    </Typography>
                                    <Typography variant="h5" sx={{ mb: 3, color: "#666" }}>
                                        Tokens
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <TextField
                                        placeholder="0"
                                        variant="standard"
                                        value={tokenAmount}
                                        onChange={handleTokenAmountChange}
                                        type="number"
                                        inputProps={{
                                            min: 0,
                                            step: "any",
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                fontSize: "3rem",
                                                textAlign: "center",
                                                fontWeight: "normal",
                                            },
                                        }}
                                        sx={{
                                            mb: 2,
                                            "& input": {
                                                textAlign: "center",
                                                "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
                                                    WebkitAppearance: "none",
                                                    margin: 0,
                                                },
                                                "&[type=number]": {
                                                    MozAppearance: "textfield",
                                                },
                                            },
                                        }}
                                    />
                                    <Typography variant="h5" sx={{ mb: 3, color: "#666" }}>
                                        Tokens
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <TextField
                            placeholder="What's this for?"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            disabled={isDescriptionLocked}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "&.Mui-disabled": {
                                        backgroundColor: "#f5f5f5",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#e0e0e0",
                                        },
                                    },
                                },
                                "& .Mui-disabled": {
                                    color: "#666 !important",
                                    WebkitTextFillColor: "#666 !important",
                                },
                            }}
                        />

                        {showWalletSelection && (
                            <Box sx={{ mb: 3 }}>
                                {availableWallets.map(wallet => (
                                    <Box
                                        key={wallet.id}
                                        onClick={() => handleWalletSelect(wallet.name)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            p: 2,
                                            mb: 2,
                                            cursor: "pointer",
                                            backgroundColor:
                                                selectedWallet === wallet.name
                                                    ? "#f7e5c4"
                                                    : "transparent",
                                            border:
                                                selectedWallet === wallet.name
                                                    ? "1px solid #f7e5c4"
                                                    : "1px solid #e0e0e0",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor:
                                                    selectedWallet === wallet.name
                                                        ? "#f7e5c4"
                                                        : "#f5f5f5",
                                            },
                                        }}>
                                        <Typography
                                            sx={{
                                                fontSize: "1.1rem",
                                                color: "#666",
                                            }}>
                                            {wallet.name}
                                        </Typography>
                                        <ChevronRightIcon sx={{ color: "#bdbdbd" }} />
                                    </Box>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ flex: 1 }} />

                        <Box sx={{ pb: 3, pt: 2 }}>
                            {showWalletSelection ? (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSend}
                                    disabled={!selectedWallet}
                                    sx={{
                                        backgroundColor: selectedWallet ? "#689f38" : "#ccc",
                                        color: "white",
                                        py: 2,
                                        fontSize: "1.1rem",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            backgroundColor: selectedWallet ? "#5a8c32" : "#ccc",
                                        },
                                        "&:disabled": {
                                            color: "white",
                                        },
                                    }}>
                                    SEND
                                </Button>
                            ) : (
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleSend}
                                        disabled={!isFormValid}
                                        sx={{
                                            backgroundColor: isFormValid ? "#689f38" : "#ccc",
                                            color: "white",
                                            py: 2,
                                            fontSize: "1.1rem",
                                            fontWeight: "bold",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor: isFormValid ? "#5a8c32" : "#ccc",
                                            },
                                            "&:disabled": {
                                                color: "white",
                                            },
                                        }}>
                                        SEND
                                    </Button>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleRequest}
                                        disabled={!isFormValid}
                                        sx={{
                                            backgroundColor: isFormValid ? "#689f38" : "#ccc",
                                            color: "white",
                                            py: 2,
                                            fontSize: "1.1rem",
                                            fontWeight: "bold",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                backgroundColor: isFormValid ? "#5a8c32" : "#ccc",
                                            },
                                            "&:disabled": {
                                                color: "white",
                                            },
                                        }}>
                                        REQUEST
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
