import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const OnboardingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>OnBoarding Screen</Text>
      <Button title="Login" onPress={() => router.push("/(auth)/login")} />
    </View>
  );
};

export default OnboardingScreen;
