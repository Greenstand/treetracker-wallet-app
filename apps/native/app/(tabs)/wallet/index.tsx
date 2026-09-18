import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useCreateWallet } from "@treetracker/wallet";
import { WalletList } from "../../../components/wallet/WalletList";
import { CreateWallet } from "../../../components/wallet/CreateWalletButton";
import { WalletCreateDrawer } from "../../../components/wallet/WalletCreateDrawer";
import { Colors } from "../../../constants/Colors";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const router = useRouter();
  const { createWallet } = useCreateWallet();
  const [wallets, setWallets] = useState(mockWallets);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleWalletPress = (walletId: string) => {
    const selectedWallet = wallets.find(wallet => wallet.id === walletId);
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

  const handleCreateWalletToggle = () => setIsCreatingWallet(true);

  const handleDrawerRequestClose = (isDirty: boolean) => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      setIsCreatingWallet(false);
    }
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    setIsCreatingWallet(false);
  };

  const handleKeep = () => setShowDiscardModal(false);

  const handleFormSubmit = async (data: {
    name: string;
    description: string;
  }) => {
    const response = await createWallet({
      name: data.name,
      about: data.description,
    });

    const newWallet = {
      id: response.id || `wallet_${Date.now()}`,
      name: response.wallet || data.name,
      balance: response.tokens_in_wallet ?? 0,
      date: new Date(response.created_at ?? Date.now()).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      ),
    };

    setWallets(prev => [newWallet, ...prev]);
    setIsCreatingWallet(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <CreateWallet
          onPress={handleCreateWalletToggle}
          isActive={isCreatingWallet}
        />
        <WalletCreateDrawer
          visible={isCreatingWallet}
          onRequestClose={handleDrawerRequestClose}
          onSubmit={handleFormSubmit}
          existingWalletNames={wallets.map(w => w.name)}
          showDiscardPrompt={showDiscardModal}
          onDiscardConfirm={handleDiscard}
          onDiscardCancel={handleKeep}
        />
        <WalletList wallets={wallets} onWalletPress={handleWalletPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});
