import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CustomModal from "@/components/ui/common/CustomModal";

// Component for rendering the "Create Wallet" button with info icon
interface CreateWalletProps {
  onPress: () => void; // callback when button is pressed
  isActive?: boolean;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({
  onPress,
  isActive = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
        onPress={() => setShowTooltip(true)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>

      <CustomModal
        visible={showTooltip}
        onClose={() => setShowTooltip(false)}
        containerStyle={styles.tooltipSheet}
      >
        <View style={styles.tooltipHeader}>
          <Text style={styles.tooltipTitle}>Good-to-know</Text>
          <TouchableOpacity
            onPress={() => setShowTooltip(false)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        <Text style={styles.tooltipMessage}>You can have up to 2 wallets.</Text>
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
  tooltipSheet: {
    height: 180,
  },
  tooltipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tooltipTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
    color: "#212121",
    lineHeight: 32,
    letterSpacing: 0.15,
  },
  tooltipMessage: {
    fontSize: 16,
    color: "#424242",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});
