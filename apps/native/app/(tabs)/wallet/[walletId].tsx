import React, { useLayoutEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { WalletActivity } from "@/components/wallet/WalletActivity";
import { WalletDetails } from "@/components/wallet/WalletDetails";
import { WalletFilterModal } from "@/components/wallet/WalletFilterModal";
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
    showsVerticalScrollIndicator={false}
  >
    {content}
  </ScrollView>
);

export default function WalletDetail() {
  const params = useLocalSearchParams();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const walletId = mapParamsToString(params.walletId);
  const walletName = mapParamsToString(params.name);
  const headerTitle =
    walletName || (walletId ? `Wallet ${walletId}` : "Wallet");
  const balanceValue = Number.parseFloat(mapParamsToString(params.balance));
  const walletBalance = Number.isFinite(balanceValue) ? balanceValue : 0;
  const [activeTab, setActiveTab] = useState<WalletTab>(WALLET_TABS[0].value);
  const [filterVisible, setFilterVisible] = useState(false);
  const isActivityTab = activeTab === "activity";

  const { pending, completed, completedLabel } =
    getPlaceholderWalletActivity(walletId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerRight: () =>
        isActivityTab ? (
          <HeaderFilterButton onPress={() => setFilterVisible(true)} />
        ) : null,
    });
  }, [navigation, headerTitle, isActivityTab]);

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

      <WalletFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
      />
    </SafeAreaView>
  );
}

type HeaderFilterButtonProps = {
  onPress: () => void;
};

function HeaderFilterButton({ onPress }: HeaderFilterButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open filters"
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [
        styles.headerIconButton,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.filterIcon}>
        <View style={styles.filterLineLong} />
        <View style={styles.filterLineMid} />
        <View style={styles.filterLineShort} />
      </View>
    </Pressable>
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
      ]}
    >
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
  headerIconButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.7,
  },
  filterIcon: {
    width: 20,
    height: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterLineLong: {
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
  filterLineMid: {
    width: 14,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
  filterLineShort: {
    width: 8,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.darkGray,
  },
});
