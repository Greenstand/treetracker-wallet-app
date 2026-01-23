import React from "react";
import { View, StyleSheet } from "react-native";
import SearchResults from "@components/ui/SearchResults";
import { THEME, TypographyWeight } from "@/theme";
import Heading from "@components/ui/common/Heading";

import { useRouter } from "expo-router";
import QRCodeDisplay from "@components/ui/QRCodeDisplay";

function Search() {
  const { typography, spacing } = THEME;
  const router = useRouter();

  function handlePress() {
    router.push("/scancode");
  }

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.md }]}>
      <QRCodeDisplay onPress={handlePress} />
      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 30,
        }}
      >
        <Heading
          title="Top wallets"
          style={{
            fontWeight: typography.weight.medium as TypographyWeight,
          }}
        />
      </View>

      <SearchResults />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
