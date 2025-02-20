import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
}) => {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.button,
        isSecondary && styles.secondaryButton,
        style,
      ])}
      onPress={onPress}>
      <Text
        style={StyleSheet.flatten([
          styles.buttonText,
          isSecondary && styles.secondaryText,
          textStyle,
        ])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#61892F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#6B6E70",
  },
});

export default CustomButton;
