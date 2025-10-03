import React from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import { YourWallets } from "../../../components/wallet/YourWallets";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const handleWalletPress = (walletId: string) => {
    console.log("Wallet pressed:", walletId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.headerSubtitle}>Wallet/Exceeded limit</Text>
        </View>

        <YourWallets wallets={mockWallets} onWalletPress={handleWalletPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "300",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "400",
  },
});
