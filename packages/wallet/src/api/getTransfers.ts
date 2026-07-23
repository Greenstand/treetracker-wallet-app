import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

export type GetTransfersParams = {
  limit?: number;
  offset?: number;
  state?: string; // requested | pending | completed | cancelled | failed
  wallet?: string; // filter by wallet (sender or receiver)
  before?: string; // ISO date
  after?: string; // ISO date
  sort_by?: string;
  order?: "asc" | "desc";
};

export async function getTransfers(
  token: string,
  limitOrParams: number | GetTransfersParams = 5,
) {
  // Back-compat: getTransfers(token, 5) still works; getTransfers(token, {state, wallet, ...}) for filters.
  const p: GetTransfersParams =
    typeof limitOrParams === "number"
      ? { limit: limitOrParams }
      : limitOrParams;

  const query = new URLSearchParams();
  query.set("limit", String(p.limit ?? 5));
  if (p.offset !== undefined) query.set("offset", String(p.offset));
  if (p.state) query.set("state", p.state);
  if (p.wallet) query.set("wallet", p.wallet);
  if (p.before) query.set("before", p.before);
  if (p.after) query.set("after", p.after);
  query.set("sort_by", p.sort_by ?? "created_at");
  query.set("order", p.order ?? "desc");

  try {
    const response = await axios.get(
      `${TREETRACKER_WALLET_API}/transfers?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data; // { transfers: [...], query, total }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get transfers";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
