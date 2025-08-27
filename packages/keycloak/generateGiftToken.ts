export function generateGiftToken(
  expiresAt: Date,
  payload: {
    tokenId: string;
    senderWalletId: string;
    recipientEmailAddress: string;
  },
): string {}
