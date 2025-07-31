import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { router, Link } from "expo-router";
import CustomTextInput from "@/components/ui/common/CustomTextInput";
import CustomTitle from "@/components/ui/common/CustomTitle";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import SocialLoginButton from "@/components/ui/common/SocialLoginButton";
import { Colors } from "@/constants/Colors";

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

  const handleSocialLogin = (provider: string) => {
    //Functionality to handle social login
    console.log(`Logging in with ${provider}`);
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
          <ThemedText
            type="title"
            lightColor="black"
            darkColor="white"
            style={[styles.commonText]}>
            Forgot password?{" "}
            <Link href="/forgotPassword">
              <ThemedText
                type="link"
                lightColor="black"
                darkColor="white"
                style={[styles.commonText, styles.linkText]}>
                Reset
              </ThemedText>
            </Link>
          </ThemedText>
        </View>
        <Text style={styles.commonText}>or</Text>
        <SocialLoginButton
          provider="Gmail"
          onPress={() => handleSocialLogin("Gmail")}
        />
        <SocialLoginButton
          provider="Facebook"
          onPress={() => handleSocialLogin("Facebook")}
        />
        <SocialLoginButton
          provider="GitHub"
          onPress={() => handleSocialLogin("GitHub")}
        />

        <Text style={styles.commonText}>
          Don’t have an account?{" "}
          <Link href="/register">
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </Text>
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
    backgroundColor: Colors.green,
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
    color: "#222629",
    fontSize: 14,
    marginVertical: 10,
  },
  linkText: {
    color: Colors.green,
    fontSize: 16,
  },
});

export default LoginScreen;
