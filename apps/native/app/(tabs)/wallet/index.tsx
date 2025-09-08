import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";

export default function Wallet() {
  const handleCreateWallet = () => {
    console.log("Create wallet pressed");
  };

  const handleInfoPress = () => {
    console.log("Info icon pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header - commented out because header should not be implemented but ready to be added back or replaced.
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>
      */}

      <View style={styles.container}>
        <View style={styles.createWalletSection}>
          <TouchableOpacity style={styles.createWalletButton} onPress={handleCreateWallet}>
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.createWalletText}>CREATE WALLET</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoIcon} onPress={handleInfoPress}>
            <Text style={styles.infoIconText}>i</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletsSection}>
          <Text style={styles.walletsTitle}>Your wallets</Text>

          <View style={styles.walletsContainer}>
            <TouchableOpacity style={styles.walletItem}>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>Wallet 2</Text>
                <Text style={styles.walletDate}>May 22, 2024</Text>
              </View>
              <View style={styles.walletRight}>
                <Text style={styles.walletAmount}>1000</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.walletItem}>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>Wallet 1</Text>
                <Text style={styles.walletDate}>May 16, 2024</Text>
              </View>
              <View style={styles.walletRight}>
                <Text style={styles.walletAmount}>3455</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // Header styles - commented out but ready to use
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   backgroundColor: "#f5f5f5",
  // },
  // headerTitle: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   color: "#333",
  // },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  createWalletSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  createWalletButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  plusIcon: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#999",
    marginRight: 8,
    lineHeight: 32,
  },
  createWalletText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 1,
    lineHeight: 32,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  infoIconText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  walletsSection: {
    marginTop: 24,
  },
  walletsTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  walletsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  walletItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  walletDate: {
    fontSize: 14,
    color: "#666",
  },
  walletRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7CB342",
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: "#666",
    fontWeight: "300",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  content: {
    marginTop: 32,
  },
  commonText: {
    textAlign: "center",
    color: "#222629DE",
  },
  description: {
    fontSize: 20,
  },
});
