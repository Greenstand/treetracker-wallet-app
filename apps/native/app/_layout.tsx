import ActionSelectionModal from "@/components/ActionSelectionModal";
import { ModalProvider } from "@/context/ModalContext";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/dev";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
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
