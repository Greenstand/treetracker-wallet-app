import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router, Link } from "expo-router";
import CustomTextInput from "@/components/ui/common/CustomTextInput";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
// import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const isResetButtonEnabled = email.length > 0;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleReset = () => {
    router.push("/(auth)/checkEmail");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <View style={styles.iconContainer}>
        <Link replace href="/login">
          <Feather name="arrow-left" size={28} color={"#2226298F"} />
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <ThemedText
          type="title"
          style={[styles.titleText]}
          lightColor="black"
          darkColor="white"
        >
          Forgot your password?
        </ThemedText>
        <ThemedText
          type="default"
          style={[styles.commonText]}
          lightColor="black"
          darkColor="white"
        >
          Confirm your email and we'll send you a link to create a brand new
          password.
        </ThemedText> */}
        <CustomTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          error={!isValidEmail}
          helperText={!isValidEmail ? "Please enter a valid email address" : ""}
        />

        <View style={styles.buttonContainer}>
          <CustomSubmitButton
            title="SEND THE LINK"
            onPress={handleReset}
            disabled={isResetButtonEnabled && isValidEmail}
            style={
              (isResetButtonEnabled
                ? styles.buttonActive
                : styles.buttonDisabled,
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

export default ForgotPasswordScreen;
