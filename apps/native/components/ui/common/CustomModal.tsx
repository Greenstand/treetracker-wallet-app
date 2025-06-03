// components/CustomModal.tsx
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ViewStyle,
} from "react-native";

const { height } = Dimensions.get("window");

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

export default function CustomModal({
  visible,
  onClose,
  children,
  containerStyle,
}: CustomModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={[styles.sheet, containerStyle]}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000055",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    elevation: 10,
  },
});
