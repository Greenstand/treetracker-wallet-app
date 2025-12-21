import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "@/theme";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  icon?: string;
}

function EmptyState({
  message = "No results found",
  subMessage = "Try a different search term or adjust your filters",
  icon = "🔍",
}: EmptyStateProps) {
  const { colors, typography } = THEME;
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.message, { fontSize: typography.size.lg }]}>
        {message}
      </Text>
      {subMessage && (
        <Text style={[styles.subMessage, { fontSize: typography.size.sm }]}>
          {subMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    fontWeight: "600",
    color: "#6C757D",
    marginBottom: 8,
    textAlign: "center",
  },
  subMessage: {
    color: "#ADB5BD",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EmptyState;
