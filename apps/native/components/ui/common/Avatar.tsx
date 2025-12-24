import getInitials from "@utils/getInitials";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { THEME, TypographyWeight } from "@/theme";

const { colors, typography } = THEME;

interface UserAvatarProps {
  id: string;
  name?: string;
  avatarUrl?: string | null;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  fallbackImage?: any;
}

function Avatar({
  id,
  name = "",
  avatarUrl = null,
  size = 40,
  backgroundColor = colors.gray74,
  fallbackImage = require("../../../assets/images/greenstandLogo.png"),
}: UserAvatarProps) {
  const initials = getInitials(name);
  const [useFallback, setUseFallback] = useState(false);

  const showInitials = !avatarUrl && !useFallback;

  return (
    <View style={styles.container}>
      {showInitials ? (
        <View
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginVertical: 10,
              backgroundColor: showInitials ? backgroundColor : "transparent",
            },
          ]}
        >
          <Text
            style={{
              fontWeight: typography.weight.regular as TypographyWeight,
              textTransform: "uppercase",
              fontSize: typography.size.base,
              color: colors.white,
            }}
          >
            {initials}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginVertical: 10,
              backgroundColor: showInitials ? backgroundColor : "transparent",
            },
          ]}
        >
          <Image
            key={id}
            source={useFallback ? fallbackImage : { uri: avatarUrl! }}
            contentFit="contain"
            style={[
              styles.image,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
            onError={(e) => {
              console.log(e);
              console.warn(
                "❌ Avatar failed to load, using fallback:",
                avatarUrl,
                e.error,
              );
              setUseFallback(true);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
  },
});

export default Avatar;
