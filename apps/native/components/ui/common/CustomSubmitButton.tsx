import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface CustomSubmitButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
}

const CustomSubmitButton: React.FC<CustomSubmitButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  style = {},
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={[styles.button, !isDisabled && styles.buttonDisabled, style]}>
      <Text
        style={[styles.buttonText, !isDisabled && styles.buttonTextDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.green,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  buttonDisabled: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  buttonTextDisabled: {
    color: "#888",
  },
});

export default CustomSubmitButton;
