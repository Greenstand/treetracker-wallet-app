import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [isNameValid, setIsNameValid] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState("");

  const validateName = text => {
    setName(text);
    if (text.trim().length > 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const validateEmail = text => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("");
      setIsEmailValid(false);
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(text)) {
      setEmailError("Error: Email is incorrect.");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const validatePassword = text => {
    setPassword(text);
    setIsPasswordValid(text.trim().length >= 6);
  };

  const validateConfirmPassword = text => {
    setConfirmPassword(text);
    setIsConfirmPasswordValid(text === password);
  };

  const isFormValid =
    isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const Submit = () => {
    //signup
  };

  const GmailSubmit = () => {
    //signup with gmail
  };

  const FacebookSubmit = () => {
    //signup with facebook
  };

  const GithubSubmit = () => {
    //signup with github
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 16,
          backgroundColor: "#FFFFFF",
        }}>
        <View>
          <Text style={styles.title}>Sign Up</Text>
          <Text
            style={{ marginBottom: 10, color: "222629", fontFamily: "Roboto" }}>
            Create an account to access your wallet and start managing your
            tokens.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label="Name"
            value={name}
            onChangeText={validateName}
            theme={{
              colors: { onSurfaceVariant: "#838587", primary: "#838587" },
            }}
            right={
              name ? (
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons name="cancel" size={24} color="#838587" />
                  )}
                  onPress={() => setName("")}
                />
              ) : null
            }></TextInput>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={validateEmail}
            error={emailError !== ""}
            theme={{
              colors: { onSurfaceVariant: "#838587", primary: "#838587" },
            }}
            right={
              emailError ? (
                <TextInput.Icon
                  icon={() => (
                    <AntDesign
                      name="exclamationcircle"
                      size={24}
                      color="#ad1c1c"
                    />
                  )}
                />
              ) : email ? (
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons name="cancel" size={24} color="#838587" />
                  )}
                  onPress={validateEmail}
                />
              ) : null
            }></TextInput>
          {emailError !== "" && (
            <HelperText
              type="error"
              visible={true}
              style={{ marginTop: -16, marginBottom: 16 }}>
              {emailError}
            </HelperText>
          )}

          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={validatePassword}
            theme={{
              colors: { onSurfaceVariant: "#838587", primary: "#838587" },
            }}
            right={
              password ? (
                <TextInput.Icon
                  icon={() => (
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#838587"
                    />
                  )}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : null
            }></TextInput>

          <TextInput
            style={styles.input}
            label="Confirm Password"
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
            onChangeText={validateConfirmPassword}
            theme={{
              colors: { onSurfaceVariant: "#838587", primary: "#838587" },
            }}
            right={
              confirmPassword ? (
                <TextInput.Icon
                  icon={() => (
                    <Feather
                      name={showConfirmPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#838587"
                    />
                  )}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : null
            }></TextInput>
        </View>
        <View>
          <TouchableOpacity
            onPress={Submit}
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#61892F" : "#bcbfc2",
              color: isFormValid ? "#FFFFFF" : "#838587",
            }}>
            <Text style={styles.button}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            marginTop: 16,
            marginBottom: 16,
            textAlign: "center",
            alignItems: "center",
          }}>
          or
        </Text>

        <View style={styles.altSignup}>
          <TouchableOpacity
            onPress={GmailSubmit}
            style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="gmail"
              size={22}
              color="#61892F"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: "#61892F",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}>
              SIGN UP WITH GMAIL
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.altSignup}>
          <TouchableOpacity
            onPress={FacebookSubmit}
            style={{ flexDirection: "row" }}>
            <Ionicons
              name="logo-facebook"
              size={22}
              color="#61892F"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: "#61892F",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}>
              SIGN UP WITH FACEBOOK
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.altSignup}>
          <TouchableOpacity
            onPress={GithubSubmit}
            style={{ flexDirection: "row" }}>
            <AntDesign
              name="github"
              size={22}
              color="#61892F"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: "#61892F",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}>
              SIGN UP WITH GITHUB
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 24,
            textAlign: "center",
            fontFamily: "Roboto",
            color: "222629",
          }}>
          Have an accout?{" "}
          <Text
            style={{
              color: "#61892F",
              textDecorationLine: "underline",
              fontSize: 16,
              fontFamily: "Roboto",
            }}
            onPress={() => console.log("log in")}>
            Log in
          </Text>
        </Text>
        <Text
          style={{
            marginTop: 24,
            fontSize: 12,
            fontFamily: "Roboto",
            color: "222629",
          }}>
          By continuing I agree to Greenstand's{" "}
          <Text
            style={styles.link}
            onPress={() => console.log("privacy policy")}>
            Privacy Policy{" "}
          </Text>
          and{" "}
          <Text style={styles.link} onPress={() => console.log("terms of use")}>
            Terms of Use
          </Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: "#F0F2ED",
    color: "222629",
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "222629",
    fontFamily: "Roboto",
  },
  text: {},
  button: {
    paddingTop: 10,
    paddingBottom: 8,
    height: 42,
    backgroundColor: "#61892F",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  link: {
    color: "#61892F",
    textDecorationLine: "underline",
    fontFamily: "Roboto",
  },
  altSignup: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#61892F",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 22,
    paddingRight: 22,
    height: 42,
    marginBottom: 10,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
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

export default RegisterScreen;
