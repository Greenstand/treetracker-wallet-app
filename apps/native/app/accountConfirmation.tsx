import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { ThemedSafeAreaView } from "@/components/ThemeSafeArea";
import { ThemedText } from "@/components/ThemedText";

import GirlManagingTree from "@/assets/svg/GirlManagingTrees.svg"; 
import { Button } from "../components/Button";

const { width, height } = Dimensions.get('screen');

export default function Index() {

  const handleGoTo = () => {
    // Do something
  }

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ThemedStatusBar/>
      <ThemedView style={[styles.container]}>
        <View style={styles.content}>
          <ThemedText type="title" style={[styles.commonText]}>Account created!</ThemedText>

          <GirlManagingTree width={(width*90)/100} height={(height*40)/100} />

          <ThemedText type="default" style={[styles.commonText, styles.description]}>
            Welcome! Thank you for joining our mission to reforest the planet and contribute to a healthier environment.
          </ThemedText>
        </View>

        <Button onPress={handleGoTo} title="CONTINUE" />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32
  },
  content: {
    marginTop: 32,
  },
  commonText: {
    textAlign: 'center',
    color: '#222629DE'
  },
  description: {
    fontSize: 20,
  }
});
