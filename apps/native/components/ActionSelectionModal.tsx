import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModal } from "@/context/ModalContext";
import CustomModal from "./ui/common/CustomModal";

export default function ActionSelectionModal() {
  const { modalVisible, setModalVisible } = useModal();

  return (
    <CustomModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      containerStyle={styles.modalContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Good-to-know</Text>
        <Pressable
          onPress={() => setModalVisible(false)}
          accessibilityRole="button"
          accessibilityLabel="Close info modal"
          hitSlop={8}>
          <Ionicons name="close" size={22} color="rgba(79, 79, 79, 1)" />
        </Pressable>
      </View>
      <Text style={styles.bodyText}>You can have up to 2 wallets.</Text>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: undefined,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(34, 38, 41, 0.87)",
  },
  bodyText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(79, 79, 79, 1)",
  },
});
