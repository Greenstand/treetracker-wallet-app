import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, THEME } from "@/theme";
import ScanTab from "./ScanTab";
// import RequestTab from "./RequestTab";

type TabType = "scan" | "request";

interface ScanCodeViewProps {
  onGallery?: () => void;
  onTabChange?: (tab: TabType) => void;
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  outlined?: boolean;
}

function TabButton({
  label,
  isActive,
  onPress,
  outlined = false,
}: TabButtonProps) {
  const { colors, typography } = THEME;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tab,
        outlined && styles.tabOutlined,
        isActive && {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <Text
        style={[
          styles.tabText,
          {
            color: isActive ? colors.white : colors.primary,
            fontFamily: typography.weight.medium,
            fontSize: typography.size.base,
            fontWeight: 500,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function ScanCodeView({
  onGallery,
  onTabChange,
}: ScanCodeViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scan");
  const { colors } = THEME;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabButton
          label="SCAN CODE"
          isActive={activeTab === "scan"}
          onPress={() => handleTabChange("scan")}
          outlined
        />
        <TabButton
          label="REQ TOKENS"
          isActive={activeTab === "request"}
          onPress={() => handleTabChange("request")}
          outlined
        />
      </View>

      {/* Camera/QR Code Area */}
      <View style={styles.content}>
        {activeTab === "scan" ? (
          <ScanTab onGallery={onGallery} />
        ) : (
          <></>
          // <RequestTab />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 20,
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  tabOutlined: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  shadow: {
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: "center",
  },
});
