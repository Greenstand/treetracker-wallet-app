import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";
import { ActionTokenSummary } from "../types/wallet";

// List the caller's issued share links (action tokens). Mirrors GET /action-tokens.
export type GetActionTokensParams = {
  state?: string; // active | redeemed | cancelled
  limit?: number;
  offset?: number;
};

export type GetActionTokensResult = {
  action_tokens: ActionTokenSummary[];
  query?: unknown;
  total: number;
};

export async function getActionTokens(
  token: string,
  params: GetActionTokensParams = {},
): Promise<GetActionTokensResult> {
  const query = new URLSearchParams();
  if (params.state) query.set("state", params.state);
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.offset !== undefined) query.set("offset", String(params.offset));
  const qs = query.toString();

  try {
    const response = await axios.get(
      `${TREETRACKER_WALLET_API}/action-tokens${qs ? `?${qs}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // { action_tokens, query, total }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get share links";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
