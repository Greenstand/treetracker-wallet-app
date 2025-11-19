import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import WalletFilterModal from "@/components/wallet/WalletFilterModal";
import type { FilterOptions } from "@/components/wallet/WalletFilterModal";

// Mock data for wallet transactions
const mockTransactions = [
  {
    id: "1",
    type: "received",
    amount: 250,
    from: "Restaurant XY",
    date: "May 22, 2024",
  },
  {
    id: "2",
    type: "sent",
    amount: 100,
    to: "Coffee Shop",
    date: "May 20, 2024",
  },
  {
    id: "3",
    type: "received",
    amount: 500,
    from: "Greenstand",
    date: "May 18, 2024",
  },
];

export default function WalletDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions | null>(
    null,
  );

  // Mock wallet data - in real app, fetch based on id
  const walletData = {
    id: id as string,
    name: `Wallet ${id}`,
    balance: 1000,
    date: "May 22, 2024",
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setAppliedFilters(filters);
    console.log("Applied filters:", filters);
    // In a real app, you would filter the transactions here
  };

  const getFilterSummary = () => {
    if (!appliedFilters || appliedFilters.dateFilter === "all") {
      return "All transactions";
    }

    if (appliedFilters.dateFilter === "custom") {
      if (appliedFilters.startDate && appliedFilters.endDate) {
        return `${appliedFilters.startDate.toLocaleDateString()} - ${appliedFilters.endDate.toLocaleDateString()}`;
      }
      return "Custom date range";
    }

    const filterLabels = {
      past90days: "Past 90 days",
      may: "May",
      "2024": "2024",
    };

    return filterLabels[appliedFilters.dateFilter as keyof typeof filterLabels];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wallet Details</Text>

        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Open filters"
          accessibilityRole="button"
          testID="filter-button"
        >
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Info Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletAvatar}>
              <Text style={styles.walletAvatarText}>
                {walletData.name.charAt(0)}
              </Text>
            </View>
          </View>

          <Text style={styles.walletName}>{walletData.name}</Text>
          <Text style={styles.walletDate}>{walletData.date}</Text>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>{walletData.balance}</Text>
            <Text style={styles.balanceUnit}>tokens</Text>
          </View>
        </View>

        {/* Filter Summary */}
        {appliedFilters && appliedFilters.dateFilter !== "all" && (
          <View style={styles.filterSummary}>
            <MaterialIcons name="filter-list" size={16} color={Colors.green} />
            <Text style={styles.filterSummaryText}>{getFilterSummary()}</Text>
            <TouchableOpacity
              onPress={() =>
                setAppliedFilters({
                  dateFilter: "all",
                  startDate: null,
                  endDate: null,
                })
              }
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="close" size={16} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Transactions</Text>

          {mockTransactions.map((transaction, index) => (
            <View
              key={transaction.id}
              style={[
                styles.transactionItem,
                index === mockTransactions.length - 1 && styles.lastItem,
              ]}
            >
              <View style={styles.transactionIcon}>
                <MaterialIcons
                  name={
                    transaction.type === "received"
                      ? "arrow-downward"
                      : "arrow-upward"
                  }
                  size={20}
                  color={
                    transaction.type === "received" ? Colors.green : Colors.red
                  }
                />
              </View>

              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>
                  {transaction.type === "received"
                    ? `From ${transaction.from}`
                    : `To ${(transaction as any).to}`}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === "received"
                    ? styles.amountReceived
                    : styles.amountSent,
                ]}
              >
                {transaction.type === "received" ? "+" : "-"}
                {transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <WalletFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  walletCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  walletHeader: {
    marginBottom: 16,
  },
  walletAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  walletAvatarText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  walletName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  walletDate: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24,
  },
  balanceContainer: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    width: "100%",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.green,
  },
  balanceUnit: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  filterSummary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8f0",
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  filterSummaryText: {
    flex: 1,
    fontSize: 14,
    color: Colors.green,
    fontWeight: "500",
  },
  transactionsSection: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  amountReceived: {
    color: Colors.green,
  },
  amountSent: {
    color: Colors.red,
  },
});
