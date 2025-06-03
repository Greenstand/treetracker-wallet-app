import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useModal } from "@/context/ModalContext";
import CustomModal from "./ui/common/CustomModal";

export default function ActionSelectionModal() {
  const { modalVisible, setModalVisible } = useModal();

  return (
    <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
      <Text style={styles.title}>Choose Action</Text>
      <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
        <Text style={styles.buttonText}>Close</Text>
      </Pressable>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#61892F",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
