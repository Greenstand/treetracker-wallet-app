import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import CustomTextInput from "@/components/ui/common/CustomTextInput";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const isLoginEnabled = email.length > 0;

  const handleReset = () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}>
      <View style={styles.iconContainer}>
        <Link replace href="/login">
          <Feather name="arrow-left" size={28} color={"#2226298F"} />
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={[styles.titleText]} darkColor="dark">
          Forgot your password?
        </ThemedText>
        <ThemedText type="default" style={[styles.commonText]} darkColor="dark">
          Confirm your email and we'll send you a link to create a brand new
          password.
        </ThemedText>
        <CustomTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={false}
        />

        <View style={styles.buttonContainer}>
          <CustomSubmitButton
            title="SEND THE LINK"
            onPress={handleReset}
            disabled={isLoginEnabled}
            style={
              (isLoginEnabled ? styles.buttonActive : styles.buttonDisabled,
              [{ textTransform: "uppercase" }])
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  iconContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  buttonContainer: {
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#61892F",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  titleText: {
    color: "#222629DE",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 16,
  },
  commonText: {
    color: "#222629DE",
    fontSize: 18,
  },
});

export default ResetPasswordScreen;
