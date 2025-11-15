import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { WalletList } from "../../../components/wallet/WalletList";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const router = useRouter();

  const handleWalletPress = (walletId: string) => {
    const selectedWallet = mockWallets.find(wallet => wallet.id === walletId);

    router.push({
      pathname: "/(tabs)/wallet/[walletId]",
      params: {
        walletId,
        name: selectedWallet?.name ?? "",
        balance: selectedWallet?.balance?.toString() ?? "0",
        date: selectedWallet?.date ?? "",
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <WalletList wallets={mockWallets} onWalletPress={handleWalletPress} />
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
});
