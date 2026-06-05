import { generateGiftToken } from '../generateGiftToken';

jest.setTimeout(30000);

describe('generateGiftToken (e2e)', () => {
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
    expect(payload.iss).toContain('treetracker');
    expect(payload).toHaveProperty('client_id', 'wallet-app-user-dev-svc');
  });
});