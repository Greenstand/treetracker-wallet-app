"use client";

import * as React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import CustomSubmitButton from "@/components/common/CustomSubmitButton";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = React.useState<number>(10);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment error:", error);
      setLoading(false);
      alert(`Error: ${error.message}`);
      return;
    }

    console.log("PaymentMethod created:", paymentMethod);

    // Simulate backend processing
    setTimeout(() => {
      setLoading(false);
      alert("Success! Token purchased (Mock).");
    }, 1000);
  };

  return (
    <Card
      sx={{
        maxWidth: 480,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            inputProps={{ min: 1 }}
          />

          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              mb: 3,
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>

          <CustomSubmitButton
            text={loading ? "Processing..." : `Buy ${amount} Tokens`}
            isDisabled={!stripe || loading}
            testId="checkout-submit-button"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
