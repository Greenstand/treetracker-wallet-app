import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THEME, TypographyWeight } from "@/theme";
import Avatar from "@components/ui/common/Avatar";
import CustomButton from "@components/ui/common/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { SEARCH_CATEGORIES } from "core/src/types/search";
import HeaderSearch from "@/components/HeaderSearch";

const mapParamsToString = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param.join("") : (param ?? "");

export default function TransferEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, typography, spacing } = THEME;

  const recipientId = mapParamsToString(params.recipientId);
  const recipientName = mapParamsToString(params.recipientName) || "Recipient";
  const recipientAvatar = mapParamsToString(params.recipientAvatar);
  const mode =
    mapParamsToString(params.mode) === SEARCH_CATEGORIES.REQUEST
      ? SEARCH_CATEGORIES.REQUEST
      : SEARCH_CATEGORIES.SEND;

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const amountValue = Number.parseFloat(amount);
  const isActionDisabled = !Number.isFinite(amountValue) || amountValue <= 0;

  const parsedAvatar = useMemo(() => {
    if (!recipientAvatar) {
      return null;
    }

    return recipientAvatar;
  }, [recipientAvatar]);

  const actionLabel = mode === SEARCH_CATEGORIES.REQUEST ? "REQUEST" : "SEND";

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

        <KeyboardAvoidingView
          style={[styles.content, { paddingHorizontal: spacing.lg }]}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text
            style={{
              color: colors.charcoal,
              fontSize: 40,
              fontWeight: typography.weight.regular as TypographyWeight,
              marginBottom: spacing.sm,
            }}
          >
            {recipientName}
          </Text>

          <Avatar
            id={recipientId || recipientName}
            name={recipientName}
            avatarUrl={parsedAvatar}
            size={56}
            backgroundColor={colors.gray400}
          />

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="____"
            placeholderTextColor={colors.charcoal}
            style={{
              marginTop: spacing.md,
              color: colors.charcoal,
              fontSize: 44,
              fontWeight: typography.weight.regular as TypographyWeight,
              textAlign: "center",
              minWidth: 140,
            }}
          />

          <Text
            style={{
              color: colors.charcoal,
              fontSize: typography.size.xxl,
              fontWeight: typography.weight.regular as TypographyWeight,
              marginBottom: spacing.lg,
            }}
          >
            Tokens
          </Text>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="What’s this for?"
            placeholderTextColor={colors.gray400}
            style={[
              styles.noteInput,
              {
                borderColor: colors.gray300,
                color: colors.gray700,
                fontSize: typography.size.base,
                marginBottom: spacing.lg,
              },
            ]}
          />

          <CustomButton
            title={actionLabel}
            onPress={() => {
              if (isActionDisabled) {
                return;
              }

              router.replace({
                pathname: "/home",
                params: {
                  snackbarAction: mode,
                  snackbarAmount: amount,
                  snackbarKey: Date.now().toString(),
                },
              });
            }}
            style={{ opacity: isActionDisabled ? 0.5 : 1 }}
          />
        </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noteInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});
