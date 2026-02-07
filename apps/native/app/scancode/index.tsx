import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScanCodeView from "@components/ui/qrcode/ScanCodeView";

type TabType = "scan" | "request";

export default function ScanCodeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("scan");

  const handleGallery = () => {
    // Gallery logic will be added later
    console.log("Open gallery");
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScanCodeView onGallery={handleGallery} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
