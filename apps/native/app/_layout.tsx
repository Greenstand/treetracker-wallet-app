import ActionSelectionModal from "@/components/ActionSelectionModal";
import { ModalProvider } from "@/context/ModalContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (areFontsLoaded || fontLoadError) {
      SplashScreen.hideAsync();
    }
  }, [areFontsLoaded, fontLoadError]);

  return (
    <ModalProvider>
      <Slot />
      <ActionSelectionModal />
    </ModalProvider>
  );
}
