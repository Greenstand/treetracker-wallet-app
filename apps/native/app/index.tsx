import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, View } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";  // Import Crashlytics

export default function InitialRoute() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAppLaunchStatus = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem("hasLaunched");
      const isAuthenticated = await AsyncStorage.getItem("isAuth");

      if (hasCompletedOnboarding === null) {
        setShouldShowOnboarding(true);
      } else if (isAuthenticated && hasCompletedOnboarding === "true") {
        router.push("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    };

    verifyAppLaunchStatus();
  }, [router]);

  // Crash button click handler
  const handleCrash = () => {
    crashlytics().crash();  // This will trigger a crash for Crashlytics testing
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {shouldShowOnboarding ? (
        <Redirect href="/onboarding" />
      ) : (
        __DEV__ && <Button title="Test Crash" onPress={handleCrash} />
      )}
    </View>
  );
}
