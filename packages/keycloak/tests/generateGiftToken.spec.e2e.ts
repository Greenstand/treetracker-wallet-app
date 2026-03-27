import { generateGiftToken } from '../generateGiftToken';

jest.setTimeout(30000);

describe('generateGiftToken (e2e)', () => {
  it('should return a JWT string', async () => {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const token = await generateGiftToken(expiresAt, {
      tokenId: 'test-token-id-123',
      senderWalletId: 'test-sender-wallet-id',
      recipientEmailAddress: 'test@example.com',
    });


    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    const parts = token.split('.');
    expect(parts).toHaveLength(3);
  });

  it('should produce a token with a decodable payload', async () => {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const token = await generateGiftToken(expiresAt, {
      tokenId: 'test-token-id-456',
      senderWalletId: 'test-sender-wallet-id',
      recipientEmailAddress: 'recipient@example.com',
    });

    const [, payloadBase64] = token.split('.');
    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadJson);
    expect(payload).toHaveProperty('exp');
    expect(payload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    expect(payload).toHaveProperty('iss');
  });
});