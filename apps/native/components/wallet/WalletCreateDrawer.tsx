import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
  LayoutAnimation,
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
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
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
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setSubmitError("");
      setIsSubmitting(false);
    }
  }, [visible]);

  useEffect(() => {
    if (submitError) {
      setSubmitError("");
    }
  }, [name, description]);

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

  const handleCreate = async () => {
    if (!isValidName) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create wallet",
      );
    } finally {
      setIsSubmitting(false);
    }
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

        {submitError ? (
          <View style={styles.errorRow}>
            <Ionicons
              name="alert-circle"
              size={16}
              color={Colors.red}
              style={styles.errorIcon}
            />
            <Text style={styles.errorText}>{submitError}</Text>
          </View>
        ) : null}

        <CustomSubmitButton
          title="CREATE WALLET"
          onPress={handleCreate}
          disabled={isValidName && !isSubmitting}
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
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  errorIcon: {
    marginRight: 6,
  },
  errorText: {
    flex: 1,
    color: Colors.red,
    fontSize: 12,
  },
  submitButton: { marginTop: 30 },
});
