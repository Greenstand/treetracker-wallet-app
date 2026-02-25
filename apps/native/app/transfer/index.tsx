import React, { useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { selectCategoryAtom } from "core/src/atoms/search";
import { SEARCH_CATEGORIES } from "core/src/types/search";
import HeaderSearch from "@/components/HeaderSearch";
import SearchResults from "@/components/ui/SearchResults";
import Heading from "@components/ui/common/Heading";
import { THEME, TypographyWeight } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

const mapParamsToString = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : (param ?? "");

export default function TransferRecipientScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [, selectCategory] = useAtom(selectCategoryAtom);
  const { colors, typography, spacing } = THEME;

  const mode =
    mapParamsToString(params.mode) === SEARCH_CATEGORIES.REQUEST
      ? SEARCH_CATEGORIES.REQUEST
      : SEARCH_CATEGORIES.SEND;

  useEffect(() => {
    selectCategory(mode);
  }, [mode, selectCategory]);

  return (
    <View style={styles.root}>
      <HeaderSearch />
      <View style={[styles.container, { paddingHorizontal: spacing.md }]}>
        <View
          style={[
            styles.topWalletsRow,
            { marginVertical: 30, paddingHorizontal: 10, gap: spacing.sm },
          ]}
        >
          <Pressable onPress={() => router.replace("/home")}>
            <Ionicons name="arrow-back" size={26} color={colors.gray500} />
          </Pressable>
          <Heading
            title="Top wallets"
            style={{
              fontWeight: typography.weight.medium as TypographyWeight,
            }}
          />
        </View>

        <SearchResults
          onItemPress={(item) => {
            router.push({
              pathname: "/transfer/entry",
              params: {
                mode,
                recipientId: item.id,
                recipientName: item.name,
                recipientAvatar:
                  typeof item.avatar === "string" ? item.avatar : undefined,
              },
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topWalletsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
