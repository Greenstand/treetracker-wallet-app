import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import TokenIconAsset from "../../assets/svg/tokenIcon.svg";

interface WalletDetailsProps {
    balance: number;
    unitLabel?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function WalletDetails({
    balance,
    unitLabel = "Tokens",
    onEdit,
    onDelete,
}: WalletDetailsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceValue}>
                    {balance.toLocaleString("en-US")}
                </Text>
                <View style={styles.balanceMeta}>
                    <TokenIcon />
                    <Text style={styles.balanceLabel}>{unitLabel}</Text>
                </View>
            </View>

            <View style={styles.actionsCard}>
                <ActionButton
                    icon={<Feather name="edit-2" size={18} color={Colors.darkGray} />}
                    label="Edit wallet"
                    accessibilityLabel="Edit wallet"
                    onPress={onEdit}
                />
                <View style={styles.actionDivider} />
                <ActionButton
                    icon={<Feather name="trash-2" size={18} color={Colors.darkGray} />}
                    label="Delete wallet"
                    accessibilityLabel="Delete wallet"
                    onPress={onDelete}
                />
            </View>
        </View>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    accessibilityLabel: string;
    onPress?: () => void;
}

function ActionButton({ icon, label, accessibilityLabel, onPress }: ActionButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            style={({ pressed }) => [
                styles.actionButton,
                pressed && { opacity: 0.6 },
            ]}
            hitSlop={12}
        >
            <View style={styles.actionIcon}>{icon}</View>
            <Text style={styles.actionLabel}>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />
        </Pressable>
    );
}

function TokenIcon() {
    return (
        <View style={styles.tokenIconContainer}>
            <TokenIconAsset width={32} height={24} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    balanceCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    balanceValue: {
        fontSize: 32,
        fontWeight: "600",
        color: Colors.charcoal,
    },
    balanceMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    balanceLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.darkGray,
    },
    actionsCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#E3E3E3",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    actionIcon: {
        width: 32,
        alignItems: "center",
    },
    actionLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: Colors.charcoal,
    },
    actionDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#E3E3E3",
        marginLeft: 20,
    },
    tokenIconContainer: {
        width: 32,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
});
