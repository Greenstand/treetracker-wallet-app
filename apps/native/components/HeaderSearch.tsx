import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useAtom, useSetAtom } from "jotai";
import { Ionicons } from "@expo/vector-icons";
import {
  searchQueryAtom,
  isSearchingAtom,
  startSearchAtom,
  cancelSearchAtom,
  performSearchAtom,
  searchLoadingAtom,
} from "core/src/atoms/search";
import { THEME } from "@/theme";
import { WINDOW_WIDTH } from "@utils/dimensions";

export default function HeaderSearch() {
  const [query, setQuery] = useAtom(searchQueryAtom);

  const [isSearching] = useAtom(isSearchingAtom);
  const [isLoading] = useAtom(searchLoadingAtom);

  const startSearch = useSetAtom(startSearchAtom);
  const cancelSearch = useSetAtom(cancelSearchAtom);
  const performSearch = useSetAtom(performSearchAtom);

  const HEADER_HEIGHT = WINDOW_WIDTH * 0.25;

  const { colors, typography, layout } = THEME;

  const handleSearchChange = (text: string) => {
    setQuery(text);

    if (text.length > 0) {
      performSearch(text);
    } else {
      performSearch("");
    }
  };

  const handleStartSearch = () => {
    startSearch();
  };

  const handleCancelSearch = () => {
    cancelSearch();
  };

  const handleSubmitSearch = () => {
    if (query.trim()) {
      performSearch(query);
    }
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingHorizontal: layout.screenPadding,
          backgroundColor: isSearching ? colors.white : colors.lightGreen,
          height: HEADER_HEIGHT,
        },
      ]}
    >
      <StatusBar
        barStyle={isSearching ? "dark-content" : "light-content"}
        backgroundColor={colors.lightGreen}
      />

      <View style={[styles.leftArea, { width: isSearching ? 30 : 60 }]}>
        {!isSearching && (
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/images/greenstandLogo.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
        )}
        {isSearching && (
          <Pressable
            accessibilityLabel="Close search"
            onPress={handleCancelSearch}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
          </Pressable>
        )}
      </View>

      <View
        style={[styles.centerArea, { paddingHorizontal: isSearching ? 0 : 8 }]}
      >
        {isSearching && (
          <View style={[styles.searchBox, { backgroundColor: colors.gray100 }]}>
            <Ionicons
              name="search"
              size={20}
              color={colors.darkGray}
              style={styles.leftIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                {
                  color: colors.darkGray,
                  fontSize: typography.size.base,
                  fontFamily: typography.weight.regular,
                },
              ]}
              placeholder="name, company, wallet..."
              placeholderTextColor={colors.darkGray}
              value={query}
              onChangeText={handleSearchChange}
              onSubmitEditing={handleSubmitSearch}
              autoFocus
              returnKeyType="search"
            />
            {isLoading && (
              <ActivityIndicator size="small" color={colors.gray500} />
            )}
          </View>
        )}
      </View>

      <View style={[styles.rightArea, { width: isSearching ? 0 : 40 }]}>
        {!isSearching && (
          <TouchableOpacity
            accessibilityLabel="Open search"
            onPress={handleStartSearch}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="search" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 45,
  },
  leftArea: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
  },
  rightArea: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  leftIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
});
