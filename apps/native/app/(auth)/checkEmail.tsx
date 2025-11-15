import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router, Link } from "expo-router";
import CustomSubmitButton from "@common/CustomSubmitButton";
// import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

const CheckEmailScreen = () => {
  const handleBackToLogin = () => {
    router.push("/(auth)/login");
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
          Check your email
        </ThemedText> */}
        {/* <ThemedText
          type="default"
          style={[styles.commonText]}
          lightColor="black"
          darkColor="white"
        >
          Use the link we sent to samsmith@gmail.com to sent a new password.
          Can’t see it? Try your spam folder or ask us to resend the link.
        </ThemedText> */}

        <View style={styles.buttonContainer}>
          <CustomSubmitButton
            title="BACK TO LOGIN"
            onPress={handleBackToLogin}
            style={[styles.buttonActive, { textTransform: "uppercase" }]}
            disabled={true}
          />
        </View>
        <View>
          <Link href={"/forgotPassword"}>
            {/* <ThemedText
              type="title"
              style={[styles.sendText]}
              lightColor="black"
              darkColor="white"
            >
              RESEND LINK?
            </ThemedText> */}
          </Link>
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
    color: "white",
  },
  buttonActive: {
    backgroundColor: "#61892F",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    color: "#fff",
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
  },
  titleText: {
    color: "#222629DE",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 16,
  },
  commonText: {
    color: "#222629DE",
    fontSize: 16,
  },
  sendText: {
    color: "#222629DE",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CheckEmailScreen;
