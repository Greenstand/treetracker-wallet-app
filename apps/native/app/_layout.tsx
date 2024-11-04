import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

export {
  ErrorBoundary,
} from 'expo-router';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    ...FontAwesome.font,
  });


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const options = {
  headerShown: false,
};

function RootLayoutNav() {

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="accountConfirmation" options={options}/>
      </Stack>
    </PaperProvider>
  );
}