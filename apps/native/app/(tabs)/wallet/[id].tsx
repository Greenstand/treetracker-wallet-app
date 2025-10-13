import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import TokenIconAsset from "@/assets/svg/tokenIcon.svg";

type ActivityTab = "activity" | "details";

interface TransactionItem {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: "pending" | "completed";
}

const pendingTransactions: TransactionItem[] = [
  {
    id: "pending-1",
    name: "Restaurant XY",
    date: "May 22",
    amount: 200,
    status: "pending",
  },
];

const completedTransactions: TransactionItem[] = [
  {
    id: "completed-1",
    name: "Restaurant XY",
    date: "May 16",
    amount: 100,
    status: "completed",
  },
  {
    id: "completed-2",
    name: "Greenstand",
    date: "May 15",
    amount: -200,
    status: "completed",
  },
];

const getInitials = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join("");
  return initials || "XY";
};

export default function WalletDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<ActivityTab>("activity");

  const walletId = typeof params.id === "string" ? params.id : undefined;
  const name = typeof params.name === "string" ? params.name : undefined;
  const balance =
    typeof params.balance === "string" ? params.balance : undefined;
  const date = typeof params.date === "string" ? params.date : undefined;

  const parsedBalance = useMemo(() => {
    if (!balance) {
      return "0";
    }

    const numericBalance = Number(balance);
    if (Number.isNaN(numericBalance)) {
      return balance;
    }

    return numericBalance.toLocaleString();
  }, [balance]);

  const walletName = name ?? "Wallet";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.header}
          onPress={router.back}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Ionicons
            name="arrow-back"
            size={22}
            color="rgba(130, 130, 130, 1)"
          />
          <Text style={styles.headerTitle}>{walletName}</Text>
        </TouchableOpacity>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={styles.tabTouchable}
            onPress={() => setActiveTab("activity")}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.tabItem,
                activeTab === "activity"
                  ? styles.tabActive
                  : styles.tabInactive,
              ]}>
              Activity
            </Text>
            {activeTab === "activity" ? (
              <View style={styles.tabUnderline} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabTouchable}
            onPress={() => setActiveTab("details")}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.tabItem,
                activeTab === "details" ? styles.tabActive : styles.tabInactive,
              ]}>
              Details
            </Text>
            {activeTab === "details" ? (
              <View style={styles.tabUnderline} />
            ) : null}
          </TouchableOpacity>
        </View>

        {activeTab === "details" ? (
          <>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceValue}>{parsedBalance}</Text>
              <View style={styles.balanceUnitWrapper}>
                <View style={styles.tokensIconWrapper}>
                  <TokenIconAsset
                    width={30}
                    height={24}
                    color="rgba(130, 130, 130, 1)"
                  />
                </View>
                <Text style={styles.balanceUnitText}>Tokens</Text>
              </View>
            </View>

            <View style={styles.actionsCard}>
              <TouchableOpacity
                style={styles.actionRow}
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Wire up edit wallet flow when ready
                }}>
                <View style={styles.actionLeftContent}>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color="rgba(79, 79, 79, 0.9)"
                    style={styles.actionIcon}
                  />
                  <Text style={styles.actionText}>Edit wallet</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="rgba(130, 130, 130, 1)"
                />
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity
                style={styles.actionRow}
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Wire up delete wallet flow when ready
                }}>
                <View style={styles.actionLeftContent}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="rgba(79, 79, 79, 0.9)"
                    style={styles.actionIcon}
                  />
                  <Text style={styles.actionText}>Delete wallet</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="rgba(130, 130, 130, 1)"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Pending</Text>
            </View>

            {pendingTransactions.map(item => (
              <View key={item.id} style={styles.transactionCard}>
                <View style={styles.transactionLeft}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>
                      {getInitials(item.name)}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>{item.name}</Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                  </View>
                </View>
                <Text style={styles.transactionAmountPending}>
                  {item.amount.toLocaleString()}
                </Text>
              </View>
            ))}

            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Completed</Text>
              <Text style={styles.sectionSubtitle}>May 2024</Text>
            </View>

            {completedTransactions.map(item => (
              <View key={item.id} style={styles.transactionCard}>
                <View style={styles.transactionLeft}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>
                      {getInitials(item.name)}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>{item.name}</Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                  </View>
                </View>
                <Text
                  style={
                    item.amount >= 0
                      ? styles.transactionAmountPositive
                      : styles.transactionAmountNegative
                  }>
                  {item.amount > 0
                    ? `+${item.amount.toLocaleString()}`
                    : item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(130, 130, 130, 1)",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  tabTouchable: {
    alignItems: "center",
    marginRight: 32,
  },
  tabItem: {
    fontSize: 14,
    letterSpacing: 1.25,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  tabInactive: {
    color: "rgba(130, 130, 130, 1)",
  },
  tabActive: {
    color: "#68B030",
    fontWeight: "700",
  },
  tabUnderline: {
    height: 2,
    width: 56,
    backgroundColor: "#68B030",
    marginTop: 4,
    borderRadius: 1,
  },
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "400",
    color: "rgba(34, 38, 41, 0.87)",
  },
  balanceUnitWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  tokensIconWrapper: {
    marginRight: 8,
  },
  balanceUnitText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(130, 130, 130, 1)",
  },
  sectionHeaderContainer: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(34, 38, 41, 0.87)",
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(130, 130, 130, 1)",
  },
  actionsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  actionLeftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: "rgba(34, 38, 41, 0.87)",
  },
  actionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  transactionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionInfo: {
    marginLeft: 16,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  transactionName: {
    fontSize: 16,
    color: "rgba(34, 38, 41, 0.87)",
  },
  transactionDate: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(130, 130, 130, 1)",
  },
  transactionAmountPending: {
    fontSize: 16,
    color: "rgba(130, 130, 130, 1)",
    fontWeight: "500",
  },
  transactionAmountPositive: {
    fontSize: 16,
    color: "#68B030",
    fontWeight: "600",
  },
  transactionAmountNegative: {
    fontSize: 16,
    color: "#EB5757",
    fontWeight: "600",
  },
});
