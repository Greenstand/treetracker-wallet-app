import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CreateWalletProps {
  onPress: () => void;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({ onPress }) => {
  const handleInfoPress = () => {
    console.log("Info icon pressed"); // placeholder for now
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons
          name="add"
          size={20}
          color="#666"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.text}>CREATE WALLET</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoCircle} onPress={handleInfoPress}>
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  infoCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#7A7D80", // close to your gray
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 17,
  },
});
