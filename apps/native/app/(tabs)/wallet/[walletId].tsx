import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { WalletActivity } from "../../../components/wallet/WalletActivity";
import { WalletDetails } from "../../../components/wallet/WalletDetails";
import { Colors } from "../../../constants/Colors";
import { getPlaceholderWalletActivity } from "../../../data/walletActivityPlaceholder";

const mapParamsToString = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param.join("") : param ?? "";

export default function WalletDetail() {
    const params = useLocalSearchParams();
    const walletId = mapParamsToString(params.walletId);
    const walletName = mapParamsToString(params.name) || "Wallet";
    const balanceValue = Number.parseFloat(mapParamsToString(params.balance));
    const walletBalance = Number.isFinite(balanceValue) ? balanceValue : 0;
    const [activeTab, setActiveTab] = useState<"activity" | "details">(
        "activity",
    );

    const { pending, completed, completedLabel } = useMemo(
        () => getPlaceholderWalletActivity(walletId),
        [walletId],
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: walletName,
                    headerShown: true,
                    headerShadowVisible: false,
                }}
            />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.tabBar}>
                        <TabButton
                            label="Activity"
                            isActive={activeTab === "activity"}
                            onPress={() => setActiveTab("activity")}
                        />
                        <TabButton
                            label="Details"
                            isActive={activeTab === "details"}
                            onPress={() => setActiveTab("details")}
                        />
                    </View>

                    {activeTab === "activity" ? (
                        <WalletActivity
                            pendingTransactions={pending}
                            completedTransactions={completed}
                            completedSubtitle={completedLabel}
                        />
                    ) : (
                        <WalletDetails balance={walletBalance} />
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

function TabButton({ label, isActive, onPress }: TabButtonProps) {
    return (
        <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {label}
            </Text>
            {isActive ? <View style={styles.tabIndicator} /> : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 32,
        gap: 24,
    },
    tabBar: {
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#D6D6D6",
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    tabButtonActive: {},
    tabLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "rgba(34, 38, 41, 0.45)",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    tabLabelActive: {
        color: Colors.green,
    },
    tabIndicator: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: Colors.green,
    },
});
