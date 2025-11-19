import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function RadioButton({
  label,
  selected,
  onPress,
  style,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
    >
      <View style={styles.radioCircle}>
        {selected && (
          <View style={styles.selectedCircle}>
            <MaterialIcons name="check" size={12} color="#fff" />
          </View>
        )}
        {!selected && <View style={styles.unselectedCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#999",
    backgroundColor: "transparent",
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
