import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const InputField = ({
  style,
  label,
  value,
  onChangeText,
  error,
  theme,
  onPress,
  secureTextEntry,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        error={error}
        theme={
          theme || {
            colors: { onSurfaceVariant: "#838587", primary: "#838587" },
          }
        }></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: "#F0F2ED",
    color: "222629",
    fontFamily: "Roboto",
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  focusedInputError: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  focusedPlaceholder: {
    top: -10,
    fontSize: 12,
    color: "black",
  },
});

export default InputField;
