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
import CustomTitle from "@/components/ui/common/CustomTitle";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const isLoginEnabled = email.length > 0 && password.length > 0;
  console.log(isLoginEnabled);

  const handleLogIn = () => {
    setAuth(true);
    if (isAuth) {
      router.push("/(tabs)/home");

      AsyncStorage.setItem("isAuth", `${isAuth}`);
    }
    console.log("login....");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CustomTitle title="Log In" />
        <CustomTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={false}
        />

        <CustomTextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={false}
        />

        <View style={styles.buttonContainer}>
          <CustomSubmitButton
            title="log in"
            onPress={handleLogIn}
            disabled={isLoginEnabled}
            style={[
              isLoginEnabled ? styles.buttonActive : styles.buttonDisabled,
              { textTransform: "uppercase" },
            ]}
          />
        </View>

        <View>
          <ThemedText type="title" darkColor="dark" style={[styles.commonText]}>
            Forgot password?{" "}
            <Link replace href="/reset">
              <ThemedText
                type="link"
                darkColor="green"
                style={[styles.commonText, styles.resetText]}>
                Reset
              </ThemedText>
            </Link>
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
  commonText: {
    textAlign: "center",
    color: "#222629DE",
    fontSize: 19,
  },
  resetText: {
    color: "#61892F",
    fontWeight: "bold",
  },
});

export default LoginScreen;
