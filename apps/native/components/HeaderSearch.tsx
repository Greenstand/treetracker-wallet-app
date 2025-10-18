import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: isSearching ? "#ffffff" : "#86c232" },
      ]}>
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
          <TouchableOpacity
            accessibilityLabel="Close search"
            onPress={() => {
              setIsSearching(false);
              setQuery("");
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="arrow-back" size={24} color="#838687" />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={[styles.centerArea, { paddingHorizontal: isSearching ? 0 : 8 }]}>
        {isSearching && (
          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={20}
              color="#838687"
              style={styles.leftIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="name, company, wallet..."
              placeholderTextColor="#838687"
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
            />
          </View>
        )}
      </View>

      <View style={[styles.rightArea, { width: isSearching ? 0 : 40 }]}>
        {!isSearching && (
          <TouchableOpacity
            accessibilityLabel="Open search"
            onPress={() => setIsSearching(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#F3F4F6",
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
    color: "#828587",
    fontSize: 16,
    paddingVertical: 8,
  },
});
