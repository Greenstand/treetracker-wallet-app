import { Colors } from "@constants/Colors";
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onKeep: () => void;
  onDiscard: () => void;
}

export const DiscardChangesModal: React.FC<Props> = ({
  visible,
  onKeep,
  onDiscard,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onKeep} />
      <View style={styles.center}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Discard changes?</Text>
            <TouchableOpacity onPress={onKeep}>
              <Ionicons name="close" size={24} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>
            Are you sure you want to discard the new wallet?
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onKeep} style={styles.keepBtn}>
              <Text style={styles.keep}>KEEP CHANGES</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDiscard} style={styles.discardBtn}>
              <Text style={styles.discard}>DISCARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackOverlay,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: "600", color: Colors.light.text },
  message: { fontSize: 16, color: Colors.darkGray, marginBottom: 28 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
  keepBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  keep: { color: Colors.charcoal, fontWeight: "600" },
  discardBtn: {
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  discard: { color: Colors.red, fontWeight: "600" },
});
