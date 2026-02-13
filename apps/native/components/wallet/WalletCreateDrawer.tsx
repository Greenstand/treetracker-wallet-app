import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
  LayoutAnimation,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import CustomModal from "@/components/ui/common/CustomModal";
import CustomTextInput from "@/components/ui/common/CustomTextInput";
import { DiscardChangesModal } from "./DiscardChangesModal";
import { Colors } from "@/constants/Colors";

interface Props {
  visible: boolean;
  onRequestClose: (isDirty: boolean) => void;
  onSubmit: (data: { name: string; description: string }) => void;
  existingWalletNames: string[];
  showDiscardPrompt?: boolean;
  onDiscardConfirm?: () => void;
  onDiscardCancel?: () => void;
}

export const WalletCreateDrawer: React.FC<Props> = ({
  visible,
  onRequestClose,
  onSubmit,
  existingWalletNames,
  showDiscardPrompt,
  onDiscardConfirm,
  onDiscardCancel,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bottomOffset, setBottomOffset] = useState(0);

  const normalizedName = name.trim().toLowerCase();

  const isDuplicate = useMemo(() => {
    if (!normalizedName) return false;
    return existingWalletNames.some(
      (n) => n.trim().toLowerCase() === normalizedName,
    );
  }, [normalizedName, existingWalletNames]);

  const isValidName = normalizedName.length > 0 && !isDuplicate;

  const isDirty = useMemo(() => {
    return Boolean(name.trim() || description.trim());
  }, [name, description]);

  // Reset when drawer closes
  useEffect(() => {
    if (!visible) {
      setName("");
      setDescription("");
    }
  }, [visible]);

  // Keyboard animation
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setBottomOffset(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setBottomOffset(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleCreate = () => {
    if (!isValidName) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
    });
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onRequestClose(isDirty);
  };

  return (
    <CustomModal
      visible={visible}
      onClose={handleClose}
      containerStyle={{ bottom: bottomOffset, height: "60%" }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Provide wallet details</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        </View>

        <View>
          <CustomTextInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Wallet name"
            error={Boolean(isDuplicate)}
            helperText={isDuplicate ? "Wallet name should be unique." : ""}
          />
        </View>

        <View>
          <CustomTextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="This text will be visible when you share your wallet"
            multiline={true}
          />
        </View>

        <CustomSubmitButton
          title="CREATE WALLET"
          onPress={handleCreate}
          disabled={isValidName}
          style={styles.submitButton}
        />
      </View>
      {showDiscardPrompt && (
        <DiscardChangesModal
          visible={showDiscardPrompt}
          onDiscard={onDiscardConfirm!}
          onKeep={onDiscardCancel!}
        />
      )}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  title: { fontSize: 20, fontWeight: "600" },
  submitButton: { marginTop: 30 },
});
