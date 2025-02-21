import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

interface CustomTextInputProps {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  helperText?: string;
  error?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder = "",
  secureTextEntry = false,
  onChangeText,
  value,
  keyboardType = "default",
  helperText,
  error = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [18, 6],
            }),
            fontSize: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: error ? Colors.red : isFocused ? Colors.green : "#777",
          },
        ]}>
        {label}
      </Animated.Text>

      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          isFocused && styles.inputFocused,
        ]}>
        <TextInput
          placeholder={isFocused ? placeholder : ""}
          secureTextEntry={isSecure}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          style={styles.input}
          placeholderTextColor={Colors.darkGray}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {error ? (
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color={Colors.red}
            style={styles.icon}
          />
        ) : value.length > 0 && secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsSecure(prev => !prev)}
            style={styles.icon}>
            <MaterialCommunityIcons
              name={isSecure ? "eye-off" : "eye"}
              size={24}
              color={Colors.darkGray}
            />
          </TouchableOpacity>
        ) : value.length > 0 ? (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            style={styles.icon}>
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color={Colors.darkGray}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error && (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 13,
    width: "100%",
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 14,
    top: 16,
    fontSize: 16,
    color: "#757575",
    backgroundColor: "transparent",
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 14,
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: "#BDBDBD",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    textAlignVertical: "bottom",
  },
  inputError: {
    borderBottomColor: Colors.red,
  },
  inputFocused: {
    borderBottomColor: Colors.green,
  },
  icon: {
    marginLeft: 8,
    top: 8,
    padding: 8,
  },
  helperText: {
    position: "absolute",
    left: 14,
    bottom: -18,
    fontSize: 12,
    zIndex: 5,
  },
  helperTextSuccess: {
    color: Colors.green,
  },
  helperTextError: {
    color: Colors.red,
  },
});

export default CustomTextInput;
