import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

// Component for rendering the "Create Wallet" button with info icon
interface CreateWalletProps {
  onPress: () => void; // callback when button is pressed
  isActive?: boolean;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({
  onPress,
  isActive = false,
}) => {
  // Placeholder for info icon functionality (can show tooltip or modal later)
  const handleInfoPress = () => {
    console.log("Info icon pressed"); // placeholder for now
  };

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
      <TouchableOpacity style={styles.infoCircle} onPress={handleInfoPress}>
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling for button layout and design
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
    letterSpacing: 1,
  },
  activeText: {
    color: Colors.green,
  },
  infoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#7A7D80",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
});
