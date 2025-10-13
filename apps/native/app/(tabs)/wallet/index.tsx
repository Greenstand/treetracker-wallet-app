import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useModal } from "@/context/ModalContext";
import { YourWallets } from "../../../components/wallet/YourWallets";

const mockWallets = [
  { id: "1", name: "Wallet 2", balance: 1000, date: "May 22, 2024" },
  { id: "2", name: "Wallet 1", balance: 3455, date: "May 16, 2024" },
];

export default function Wallet() {
  const router = useRouter();
  const { setModalVisible } = useModal();

  const handleWalletPress = (walletId: string) => {
    const wallet = mockWallets.find(item => item.id === walletId);
    if (!wallet) {
      return;
    }

    router.push({
      pathname: "/(tabs)/wallet/[id]",
      params: {
        id: wallet.id,
        name: wallet.name,
        balance: wallet.balance.toString(),
        date: wallet.date,
      },
    });
  };

  const handleCreateWallet = () => {
    console.log("Create wallet tapped");
  };

  const handleInfoPress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.createWalletButton}
              onPress={handleCreateWallet}
              activeOpacity={0.7}>
              <Ionicons
                name="add"
                size={18}
                color="rgba(34, 38, 41, 0.6)"
                style={styles.createWalletIcon}
              />
              <Text style={styles.createWalletText}>Create wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleInfoPress}
              accessibilityRole="button"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="rgba(34, 38, 41, 0.6)"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.walletsSection}>
          <YourWallets
            wallets={mockWallets}
            onWalletPress={handleWalletPress}
          />
        </View>
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
  contentContainer: {
    paddingBottom: 24,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createWalletButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  createWalletIcon: {
    marginRight: 8,
  },
  createWalletText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.25,
    textTransform: "uppercase",
    color: "rgba(34, 38, 41, 0.6)",
  },
  infoButton: {
    padding: 4,
  },
  walletsSection: {
    marginTop: 16,
  },
});
