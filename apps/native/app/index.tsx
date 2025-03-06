import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return shouldShowOnboarding ? <Redirect href="/onboarding" /> : null;
}
