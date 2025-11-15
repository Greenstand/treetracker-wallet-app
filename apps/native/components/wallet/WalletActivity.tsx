import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

export type WalletTransaction = {
    id: string;
    title: string;
    amount: number;
    date: string;
};

interface WalletActivityProps {
    pendingTransactions: WalletTransaction[];
    completedTransactions: WalletTransaction[];
    pendingSubtitle?: string;
    completedSubtitle?: string;
}

export function WalletActivity({
    pendingTransactions,
    completedTransactions,
    pendingSubtitle,
    completedSubtitle,
}: WalletActivityProps) {
    return (
        <View style={styles.container}>
            <ActivitySection
                title="Pending"
                transactions={pendingTransactions}
                emptyMessage="No pending transactions"
                subtitle={pendingSubtitle}
            />
            <ActivitySection
                title="Completed"
                transactions={completedTransactions}
                emptyMessage="No completed transactions"
                subtitle={completedSubtitle}
            />
        </View>
    );
}

interface ActivitySectionProps {
    title: string;
    transactions: WalletTransaction[];
    emptyMessage: string;
    subtitle?: string;
}

function ActivitySection({
    title,
    transactions,
    emptyMessage,
    subtitle,
}: ActivitySectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {subtitle ? (
                    <Text style={styles.sectionSubtitle}>{subtitle}</Text>
                ) : null}
            </View>
            {transactions.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>{emptyMessage}</Text>
                </View>
            ) : (
                <View style={styles.card}>
                    {transactions.map((transaction, index) => (
                        <View key={transaction.id}>
                            <TransactionItem transaction={transaction} />
                            {index < transactions.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

interface TransactionItemProps {
    transaction: WalletTransaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
    const { title, amount, date } = transaction;
    const isPositive = amount >= 0;
    const formattedAmount = `${isPositive ? "+" : "-"}${Math.abs(amount).toLocaleString(
        "en-US",
    )}`;
    const initials = getInitials(title);

    return (
        <View style={styles.transactionRow}>
            <View style={styles.avatarWrapper}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{title}</Text>
                <Text style={styles.transactionDate}>{date}</Text>
            </View>
            <Text
                style={[
                    styles.transactionAmount,
                    isPositive ? styles.amountPositive : styles.amountNegative,
                ]}>
                {formattedAmount}
            </Text>
        </View>
    );
}

function getInitials(value: string) {
    return value
        .split(" ")
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join("");
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
    },
    section: {
        gap: 12,
    },
    sectionHeader: {
        gap: 4,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.1,
        color: Colors.charcoal,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1,
        color: Colors.darkGray,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingVertical: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#E3E3E3",
        overflow: "hidden",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        marginLeft: 64,
    },
    emptyState: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingVertical: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyStateText: {
        fontSize: 14,
        color: Colors.darkGray,
    },
    transactionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 16,
    },
    avatarWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#C4C4C4",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: Colors.white,
        fontWeight: "600",
        fontSize: 14,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.charcoal,
    },
    transactionDate: {
        fontSize: 14,
        color: Colors.darkGray,
        marginTop: 4,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "right",
    },
    amountPositive: {
        color: Colors.green,
    },
    amountNegative: {
        color: Colors.darkGray,
    },
});
