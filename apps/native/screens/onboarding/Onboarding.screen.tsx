import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

const { width, height } = Dimensions.get("window");

type OnboardingItem = {
  id: string;
  icon: any;
  title: string;
  description: string;
};

const DATA: OnboardingItem[] = [
  {
    id: "1",
    icon: ".", //require("./path/to/icon1.png"),
    title: "Join the Greenstand movement!",
    description: "Start making a positive impact on the environment today.",
  },
  {
    id: "2",
    icon: ".", //require("./path/to/icon1.png"),
    title: "Experience the convenience",
    description: "Enjoy the ease of digital wallet transfers on the go.",
  },
  {
    id: "3",
    icon: ".", //require("./path/to/icon1.png"),
    title: "Secure exchanges",
    description: "Access secure and reliable wallet transactions.",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.container}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? "green" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        estimatedItemSize={height}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          style={styles.button}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 150,
    backgroundColor: "green",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "green",
  },
});

export default OnboardingScreen;
