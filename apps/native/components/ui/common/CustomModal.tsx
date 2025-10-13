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
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={[styles.sheet, containerStyle]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000055",
  },
  sheet: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    elevation: 10,
    minHeight: height * 0.25,
  },
});
