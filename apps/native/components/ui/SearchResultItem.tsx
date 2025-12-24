import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { THEME, TypographyWeight } from "@/theme";
import Avatar from "./common/Avatar";

interface SearchResultItemProps {
  item: any;
  onPress?: () => void;
}

function SearchResultItem({ item, onPress }: SearchResultItemProps) {
  const { colors, typography, spacing } = THEME;
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          backgroundColor: colors.white,
        },
      ]}
      onPress={handlePress}
    >
      <Avatar avatarUrl={item.avatar} name={item.name} id={item.id} size={40} />
      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            {
              fontSize: typography.size.base,
              color: colors.darkGray,
              fontWeight: typography.weight.medium as TypographyWeight,
            },
          ]}
        >
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 3,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    marginBottom: 4,
  },
});

export default SearchResultItem;
