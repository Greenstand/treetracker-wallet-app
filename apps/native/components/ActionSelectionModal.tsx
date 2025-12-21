import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { useModal } from "@/context/ModalContext";
import CustomModal from "./ui/common/CustomModal";
import { MaterialIcons } from "@expo/vector-icons";

import { selectCategoryAtom } from "core/src/atoms/search";
import { useAtom } from "jotai";
import { Link, useRouter } from "expo-router";
import { SEARCH_CATEGORIES } from "core/src/types/search";
import { THEME, TypographyWeight } from "@/theme";

export default function ActionSelectionModal() {
  const router = useRouter();
  const { modalVisible, setModalVisible } = useModal();
  const [, selectCategory] = useAtom(selectCategoryAtom);

  const { colors, spacing, typography } = THEME;
  const handleCategorySelect = (
    category: typeof SEARCH_CATEGORIES.SEND | typeof SEARCH_CATEGORIES.REQUEST,
  ) => {
    selectCategory(category);
  };

  return (
    <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={[styles.title]}>Choose Action</Text>
        <Pressable onPress={() => setModalVisible(false)}>
          <MaterialIcons name="close" size={24} />
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.tint,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
            },
          ]}
          onPress={() => {
            handleCategorySelect(SEARCH_CATEGORIES.SEND);
            setModalVisible(false);
            router.push("/search");
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontWeight: typography.weight.medium as TypographyWeight,
              fontSize: 16,
            }}
          >
            Send
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.tint,
              paddingVertical: 12,
              paddingHorizontal: 24,
            },
          ]}
          onPress={() => {
            handleCategorySelect(SEARCH_CATEGORIES.REQUEST);
            setModalVisible(false);
            router.push("/search");
          }}
        >
          <Text
            style={{ color: colors.white, fontWeight: "600", fontSize: 16 }}
          >
            Request
          </Text>
        </Pressable>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: "column",
    gap: 12,
  },
  button: {
    borderRadius: 8,
    alignItems: "center",
  },
});
