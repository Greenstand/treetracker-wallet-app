import axios, { isAxiosError } from "axios";
import { TREETRACKER_QUERY_API } from "../utils/config";

export type TokenTree = {
  tree_id?: number | null;
  tree_image_url?: string | null;
  tree_species_name?: string | null;
};

export async function getTokenTree(id: string): Promise<TokenTree> {
  try {
    const response = await axios.get(`${TREETRACKER_QUERY_API}/tokens/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get the tree for this token";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
