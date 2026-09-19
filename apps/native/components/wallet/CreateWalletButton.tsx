import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CustomModal from "../ui/common/CustomModal";

// Component for rendering the "Create Wallet" button with info icon
interface CreateWalletProps {
  onPress: () => void; // callback when button is pressed
  isActive?: boolean;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({
  onPress,
  isActive = false,
}) => {
  // Good-to-know info sheet visibility
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Main Create Wallet button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons
          name="add"
          size={20}
          color={isActive ? Colors.green : "#999"}
          style={{ marginRight: 6 }}
        />
        <Text style={[styles.text, isActive && styles.activeText]}>
          CREATE WALLET
        </Text>
      </TouchableOpacity>

      {/* Small info circle beside the button */}
      <TouchableOpacity
        style={styles.infoCircle}
        onPress={() => setInfoVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="More wallet information"
        hitSlop={8}
      >
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>

      {/* Good-to-know bottom sheet */}
      <CustomModal
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
        containerStyle={styles.infoSheet}
      >
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>Good-to-know</Text>
          <TouchableOpacity
            onPress={() => setInfoVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={10}
          >
            <Ionicons name="close" size={22} color={Colors.charcoal} />
          </TouchableOpacity>
        </View>
        <Text style={styles.infoBody}>You can have up to 2 wallets.</Text>
      </CustomModal>
    </View>
  );
};

// Styling for button layout and design
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  activeText: {
    color: Colors.green,
  },
  infoCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#7A7D80",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17,
  },
  // Good-to-know sheet
  infoSheet: {
    height: undefined,
    paddingBottom: 32,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.charcoal,
  },
  infoBody: {
    fontSize: 16,
    color: Colors.charcoal,
    lineHeight: 22,
  },
});