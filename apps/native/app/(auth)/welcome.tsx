import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const handleContinue = async () => {
    await AsyncStorage.setItem("isAuth", "true");
    router.replace("/(tabs)/home");
    console.log("Continue pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account created!</Text>

      <View style={styles.iconContainer}>
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Welcome and thank you for joining our reforestation mission and becoming
        part of our global community dedicated to positive environmental impact.
      </Text>

      <Text style={styles.description}>
        Upon creating your account, you will automatically receive your wallet,
        which you can rename later.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    color: "#333333",
    textAlign: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  checkmark: {
    width: 50,
    height: 50,
    backgroundColor: "#78BE20",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 12,
    lineHeight: 22,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#5A7E3F",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
