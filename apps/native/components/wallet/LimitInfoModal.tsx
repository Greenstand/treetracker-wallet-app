import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LimitInfoModalProps {
  visible: boolean;
  onClose: () => void;
  walletLimit?: number;
}

const LimitInfoModal: React.FC<LimitInfoModalProps> = ({
  visible,
  onClose,
  walletLimit = 2,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      testID="modal-container">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} testID="modal-overlay">
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} testID="modal-content">
              <View style={styles.header}>
                <Text style={styles.title}>Good-to-know</Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  testID="close-button">
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#757575"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              <View style={styles.content}>
                <Text style={styles.message}>
                  You can have up to {walletLimit} wallets.
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 164,
    paddingBottom: 34,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "500",
    color: "#212121",
    lineHeight: 32,
    letterSpacing: 0.15,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  message: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    color: "#424242",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
});

export default LimitInfoModal;
