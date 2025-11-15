import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import Leafs from "@/components/svg/Leaf";
// import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/ui/common/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgProps } from "react-native-svg";
import Wallet from "@/components/svg/wallet";
import Cloud from "@/components/svg/Cloud";

const { width, height } = Dimensions.get("window");

type OnboardingItem = {
  id: string;
  icon: React.ComponentType<SvgProps>;
  title: string;
  description: string;
};

const DATA: OnboardingItem[] = [
  {
    id: "1",
    icon: Leafs,
    title: "Join the Greenstand movement!",
    description: "Start making a positive impact on the environment today.",
  },
  {
    id: "2",
    icon: Wallet,
    title: "Experience the convenience",
    description: "Digital wallet transfers on the go.",
  },
  {
    id: "3",
    icon: Cloud,
    title: "Enjoy the ease and convenience of secure and reliable token",
    description: "exchanges through our intuitive app interface.",
  },
];

function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  let flashListRef = React.useRef(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(slideIndex);
    },
    [],
  );

  const handleSignUp = async () => {
    await AsyncStorage.setItem("hasLaunched", "true");
    router.push("/(auth)/register");
  };

  const handleLogIn = async () => {
    await AsyncStorage.setItem("hasLaunched", "true");
    router.push("/(auth)/login");
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    const Icon = item.icon;
    return (
      <View style={styles.slide}>
        <Icon width={120} height={120} style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={styles.safeArea}
        testID="onboardingScreen"
        accessibilityLabel="onboardingScreen"
        accessible={true}
      >
        <FlashList
          ref={flashListRef}
          data={DATA}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScroll}
          showsHorizontalScrollIndicator={false}
          // @ts-ignore
          estimatedItemSize={height * 0.6}
          keyExtractor={(item: any) => item.id}
        />

        <View style={styles.pagination}>
          {DATA.map((_, index) => (
            <TouchableOpacity
              key={index}
              accessibilityLabel="onboardingNextButton"
              testID="onboardingNextButton"
              onPress={() =>
                flashListRef.current?.scrollToIndex({ index, animated: true })
              }
              style={[
                styles.circleWrapper,
                currentIndex === index ? styles.activeCircle : null,
              ]}
            >
              <View
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton title="SIGN UP" onPress={handleSignUp} />

          <CustomButton
            title="LOG IN"
            variant="secondary"
            // @ts-ignore
            testID="loginButton"
            onPress={handleLogIn}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    width,
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  icon: {
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 30,
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginHorizontal: 1,
  },
  activeCircle: {
    borderRadius: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: "#FF7A00",
  },
  inactiveDot: {
    backgroundColor: "#BDBDBD",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default OnboardingScreen;
