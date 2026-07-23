import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Fetch a single transfer's details. Mirrors GET /transfers/:id.
export async function getTransfer(token: string, id: string) {
  try {
    const response = await axios.get(
      `${TREETRACKER_WALLET_API}/transfers/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the transfer object
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get transfer";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
