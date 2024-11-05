import React from "react";
import { SafeAreaView, Button } from "react-native";


import { HelloWave } from "@/components/HelloWave";
import { router, useRouter } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView>
      <HelloWave />
      <Button title="Go to Onboarding" onPress={() => router.push("/onboarding/onboardingscreen")} />
    </SafeAreaView>
  );
}
