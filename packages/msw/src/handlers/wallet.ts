import { http, HttpResponse } from "msw";
import { mockWallets, mockTokens, mockTransfers } from "../mocks";

const walletHandlers = [
  http.get("*/wallets", () =>
    HttpResponse.json({ wallets: mockWallets, total: mockWallets.length }),
  ),

  http.post("*/wallets", async ({ request }) => {
    const body = (await request.json()) as { wallet: string; about?: string };
    return HttpResponse.json(
      {
        id: "new-wallet-id",
        name: body.wallet,
        about: body.about ?? "",
        logo_url: null,
        created_at: new Date().toISOString(),
        tokens_in_wallet: 0,
      },
      { status: 201 },
    );
  }),

  http.get("*/tokens", () =>
    HttpResponse.json({ tokens: mockTokens, total: mockTokens.length }),
  ),

  http.get("*/tokens/:id", ({ params }) =>
    HttpResponse.json({ ...mockTokens[0], id: params["id"] }),
  ),

  http.get("*/transfers", () =>
    HttpResponse.json({
      transfers: mockTransfers,
      query: {},
      total: mockTransfers.length,
    }),
  ),
];

export default walletHandlers;
