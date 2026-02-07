import React from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "@/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ScanTabProps {
  onGallery?: () => void;
}

export default function ScanTab({ onGallery }: ScanTabProps) {
  const { colors, typography, spacing } = THEME;

  const handleGallery = () => {
    if (onGallery) {
      onGallery();
    } else {
      console.log("Open gallery");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <View style={styles.scanFrame}>
          {/* <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} /> */}
        </View>
      </View>

      {/* Gallery Button */}
      <View style={styles.bottomActions}>
        <Pressable
          onPress={handleGallery}
          style={styles.galleryButton}
          android_ripple={{ color: colors.gray200, radius: 40 }}
        >
          <View
            style={[
              styles.galleryIcon,
              { backgroundColor: colors.gray300 },
            ]}
          >
            <MaterialIcons
              name="photo-library"
              size={28}
              color={colors.white}
            />
          </View>
          <Text
            style={[
              styles.galleryText,
              {
                color: colors.gray500,
                fontSize: typography.size.sm,
                fontFamily: typography.weight.regular,
                marginTop: spacing.xs,
              },
            ]}
          >
            Gallery
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  cameraPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: SCREEN_WIDTH - 80,
    maxHeight: SCREEN_HEIGHT * 0.5,
    backgroundColor: "#D1D5DB",
    borderRadius: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  scanFrame: {
    width: "70%",
    aspectRatio: 1,
    position: "relative",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#61892F",
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#61892F",
    borderTopRightRadius: 8,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#61892F",
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#61892F",
    borderBottomRightRadius: 8,
  },
  bottomActions: {
    paddingBottom: 32,
    paddingTop: 16,
    alignItems: "center",
  },
  galleryButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  galleryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  galleryText: {
    marginTop: 4,
  },
});
