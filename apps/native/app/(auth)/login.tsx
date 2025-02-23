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

  const handleLogIn = () => {};

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

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password? </Text>
          <TouchableOpacity onPress={() => router.navigate("/(auth)/login")}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or</Text>

        <SocialButton
          iconName="google"
          title="LOG IN WITH GMAIL"
          onPress={() => console.log("Gmail Login")}
        />

        <SocialButton
          iconName="facebook-square"
          title="LOG IN WITH FACEBOOK"
          onPress={() => console.log("Facebook Login")}
        />

        <SocialButton
          iconName="github"
          title="LOG IN WITH GITHUB"
          onPress={() => console.log("GitHub Login")}
        />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
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
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 20,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#333",
  },
  signupLink: {
    color: "#6B8E23",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#333",
  },
  resetText: {
    color: "#6B8E23",
  },
});

export default LoginScreen;
