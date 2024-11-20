import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import Leafs from "@/assets/svg/leafs.svg";
import Wallet from "@/assets/svg/wallet.svg";
import Cloud from "@/assets/svg/cloud.svg";
import { SvgProps } from "react-native-svg";

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

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
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
    <SafeAreaView style={styles.safeArea}>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={height}
      />
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.circleWrapper,
              currentIndex === index ? styles.activeCircle : null,
            ]}>
            <View
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {currentIndex === DATA.length - 1 ? (
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={styles.button}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Text style={styles.skipText}>SKIP THE TOUR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    marginHorizontal: 5,
  },
  activeCircle: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
  inactiveDot: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
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
