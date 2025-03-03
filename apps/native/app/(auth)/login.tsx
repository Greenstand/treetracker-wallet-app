import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import SocialButton from "@/components/SocialButton";
import CustomTextInput from "@/components/ui/common/CustomTextInput";
import CustomTitle from "@/components/ui/common/CustomTitle";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoginEnabled = email.length > 0 && password.length > 0;
  console.log(isLoginEnabled);
  const router = useRouter();

  const handleLogIn = () => {
    console.log("Logging in...");
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
            style={
              (isLoginEnabled ? styles.buttonActive : styles.buttonDisabled,
              [{ textTransform: "uppercase" }])
            }
          />
        </View>

        <View style={styles.forgotPasswordSection}>
          <Text style={styles.forgotPasswordLabel}>Forgot password? </Text>
          <TouchableOpacity>
            <Text style={styles.resetLink}>Reset</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dividerText}>or</Text>

        {/* Add the SocialButton component here */}

        <SocialButton
          iconName="google"
          title="Log in with Gmail"
          onPress={() => console.log("Gmail Login")}
        />

        <SocialButton
          iconName="facebook-square"
          title="Log in with Facebook"
          onPress={() => console.log("Facebook Login")}
        />

        <SocialButton
          iconName="github"
          title="Log in with GitHub"
          onPress={() => console.log("GitHub Login")}
        />

        <View style={styles.signupSection}>
          <Text style={styles.signupPrompt}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.signupActionLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  dividerText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 15,
  },
  forgotPasswordSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  forgotPasswordLabel: {
    color: "#333",
  },
  resetLink: {
    color: "#6B8E23",
  },
  signupSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupPrompt: {
    color: "#333",
  },
  signupActionLink: {
    color: "#6B8E23",
  },
});

export default LoginScreen;
