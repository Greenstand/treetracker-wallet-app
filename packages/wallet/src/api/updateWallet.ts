import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";
import { WalletProfileUpdate } from "../types/wallet";

// Update a wallet's profile. PATCH /wallets/:id REQUIRES multipart/form-data
// (the API rejects application/json), so send a FormData even for text-only edits.
// cover_image / logo_image are optional File blobs (browser only).
export async function updateWallet(
  token: string,
  walletId: string,
  fields: WalletProfileUpdate,
  images?: { cover_image?: Blob; logo_image?: Blob },
) {
  const form = new FormData();
  if (fields.display_name !== undefined)
    form.append("display_name", fields.display_name);
  if (fields.about !== undefined) form.append("about", fields.about);
  if (fields.add_to_web_map !== undefined)
    form.append("add_to_web_map", String(fields.add_to_web_map));
  if (images?.cover_image) form.append("cover_image", images.cover_image);
  if (images?.logo_image) form.append("logo_image", images.logo_image);

  try {
    const response = await axios.patch(
      `${TREETRACKER_WALLET_API}/wallets/${walletId}`,
      form,
      {
        headers: {
          // Let the browser set the multipart boundary; only send auth here.
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the updated wallet
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to update wallet";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
