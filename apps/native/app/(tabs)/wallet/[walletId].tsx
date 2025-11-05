import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WalletActivity } from "@/components/wallet/WalletActivity";
import { WalletDetails } from "@/components/wallet/WalletDetails";
import { Colors } from "@/constants/Colors";
import { getPlaceholderWalletActivity } from "@/data/walletActivityPlaceholder";

const mapParamsToString = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : (param ?? "");

const WALLET_TABS = [
  { label: "Activity", value: "activity" },
  { label: "Details", value: "details" },
] as const;

type WalletTab = (typeof WALLET_TABS)[number]["value"];

const renderTabContent = (content: React.ReactNode) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}>
    {content}
  </ScrollView>
);

export default function WalletDetail() {
  const params = useLocalSearchParams();
  const walletId = mapParamsToString(params.walletId);
  const balanceValue = Number.parseFloat(mapParamsToString(params.balance));
  const walletBalance = Number.isFinite(balanceValue) ? balanceValue : 0;
  const [activeTab, setActiveTab] = useState<WalletTab>(WALLET_TABS[0].value);

  const { pending, completed, completedLabel } =
    getPlaceholderWalletActivity(walletId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>
        {WALLET_TABS.map(({ label, value }) => (
          <TabButton
            key={value}
            label={label}
            value={value}
            isActive={activeTab === value}
            onPress={() => setActiveTab(value)}
          />
        ))}
      </View>

      {activeTab === "activity"
        ? renderTabContent(
            <WalletActivity
              pendingTransactions={pending}
              completedTransactions={completed}
              completedSubtitle={completedLabel}
            />,
          )
        : renderTabContent(<WalletDetails balance={walletBalance} />)}
    </SafeAreaView>
  );
}

interface TabButtonProps {
  label: string;
  value: WalletTab;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ label, isActive, onPress }: TabButtonProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        isActive && styles.tabButtonActive,
        pressed && styles.tabButtonPressed,
      ]}>
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {label}
      </Text>
      {isActive ? <View style={styles.tabIndicator} /> : null}
    </Pressable>
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
  tabButtonPressed: {
    opacity: 0.8,
  },
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
