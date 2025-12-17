"use client";

import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Typography, Box } from "@mui/material";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function BuyPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }} data-test="buy-page">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Buy Greenstand Tokens
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Purchase tokens to support tree planting initiatives.
        </Typography>
      </Box>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
}
