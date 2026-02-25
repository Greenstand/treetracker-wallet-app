import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THEME, TypographyWeight } from "@/theme";
import CustomButton from "@components/ui/common/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { SEARCH_CATEGORIES } from "core/src/types/search";
import HeaderSearch from "@/components/HeaderSearch";

const mapParamsToString = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : (param ?? "");

export default function TransferNotificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, typography, spacing } = THEME;

  const recipientName = mapParamsToString(params.recipientName) || "recipient";
  const amount = mapParamsToString(params.amount) || "0";
  const mode =
    mapParamsToString(params.mode) === SEARCH_CATEGORIES.REQUEST
      ? SEARCH_CATEGORIES.REQUEST
      : SEARCH_CATEGORIES.SEND;

  const title =
    mode === SEARCH_CATEGORIES.REQUEST
      ? `Pending request to ${recipientName}`
      : `Pending tokens to ${recipientName}`;

  const description =
    mode === SEARCH_CATEGORIES.REQUEST
      ? `Your request for ${amount} tokens is being processed. You will receive confirmation once the transaction is successful.`
      : `Your send request for ${amount} tokens is being processed. You will receive confirmation once the transaction is successful.`;

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <HeaderSearch />

      <View
        style={[styles.mainContent, { backgroundColor: colors.background }]}
      >
        <View style={[styles.subHeader, { paddingHorizontal: spacing.lg }]}>
          <Pressable onPress={() => router.replace("/home")}>
            <Ionicons name="arrow-back" size={26} color={colors.gray500} />
          </Pressable>
          <Pressable onPress={() => router.replace("/home")}>
            <Ionicons name="close" size={28} color={colors.gray500} />
          </Pressable>
        </View>

        <View style={[styles.container, { padding: spacing.lg }]}>
          <View
            style={[
              styles.notificationItem,
              { backgroundColor: colors.vanillaCream },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.gray500 },
              ]}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: typography.size.xs,
                  fontWeight: typography.weight.medium as TypographyWeight,
                }}
              >
                {recipientName.slice(0, 2).toUpperCase()}
              </Text>
            </View>

            <View style={styles.contentContainer}>
              <Text
                style={{
                  color: colors.charcoal,
                  fontSize: typography.size.sm,
                  fontWeight: typography.weight.medium as TypographyWeight,
                  marginBottom: 4,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  color: colors.gray600,
                  fontSize: typography.size.xs,
                  fontWeight: typography.weight.regular as TypographyWeight,
                }}
              >
                {description}
              </Text>
            </View>

            <Text
              style={{
                color: colors.gray500,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.regular as TypographyWeight,
              }}
            >
              now
            </Text>
          </View>

          <CustomButton
            title="Go to home"
            onPress={() => {
              router.replace("/home");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  subHeader: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
});
