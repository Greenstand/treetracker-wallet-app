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
