import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type SocialButtonProps = {
  iconName: string;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const SocialButton: React.FC<SocialButtonProps> = ({
  iconName,
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress}>
      <AntDesign name={iconName} size={20} color="#6B8E23" />
      <Text style={styles.socialButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6B8E23",
    marginBottom: 12,
  },
  socialButtonText: {
    color: "#6B8E23",
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SocialButton;
