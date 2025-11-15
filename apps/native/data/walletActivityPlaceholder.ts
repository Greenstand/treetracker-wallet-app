import type { WalletTransaction } from "../components/wallet/WalletActivity";

export type WalletActivityPlaceholder = {
    pending: WalletTransaction[];
    completed: WalletTransaction[];
    completedLabel?: string;
};

/**
 * Temporary placeholder data for wallet activity.
 *
 * Delete this file once the real API is wired up.
 */
export const PLACEHOLDER_WALLET_ACTIVITY: Record<string, WalletActivityPlaceholder> = {
    default: {
        pending: [
            {
                id: "p1",
                title: "Restaurant XY",
                amount: 200,
                date: "May 22",
            },
        ],
        completed: [
            {
                id: "c1",
                title: "Restaurant XY",
                amount: 100,
                date: "May 16",
            },
            {
                id: "c2",
                title: "Greenstand",
                amount: -200,
                date: "May 15",
            },
        ],
        completedLabel: "May 2024",
    },
    "1": {
        pending: [
            {
                id: "p1",
                title: "Restaurant XY",
                amount: 200,
                date: "May 22",
            },
        ],
        completed: [
            {
                id: "c1",
                title: "Restaurant XY",
                amount: 100,
                date: "May 16",
            },
            {
                id: "c2",
                title: "Greenstand",
                amount: -200,
                date: "May 15",
            },
        ],
        completedLabel: "May 2024",
    },
    "2": {
        pending: [
            {
                id: "p2",
                title: "Supplies Co",
                amount: 85,
                date: "Jun 10",
            },
        ],
        completed: [
            {
                id: "c3",
                title: "Community Store",
                amount: -45,
                date: "Jun 01",
            },
            {
                id: "c4",
                title: "Greenstand",
                amount: 250,
                date: "May 30",
            },
        ],
        completedLabel: "May 2024",
    },
};

export const getPlaceholderWalletActivity = (
    walletId: string,
): WalletActivityPlaceholder => {
    return PLACEHOLDER_WALLET_ACTIVITY[walletId] ?? PLACEHOLDER_WALLET_ACTIVITY.default;
};
