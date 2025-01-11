import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import TreeTraderLogo from "@/assets/svg/TreeTraderLogo.svg";
const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const loginButtonEnabled = login.length > 0 && password.length > 0;

  return (
    <SafeAreaView style={styles.loginPageContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* TOP */}
        <View style={styles.logoContainer}>
          <TreeTraderLogo />
        </View>
        <View style={styles.textTitlePageContainer}>
          <Text style={styles.textTitleLoginPage}>Log In</Text>
          <Text style={styles.descriptionLogin}>
            We are excited to see you again!
          </Text>
        </View>

        {/* MIDDLE */}
        <View style={styles.inputBoxContainer}>
          <View style={styles.inputBox}>
            <Text
              style={[
                styles.placeholderInputBox,
                login ? styles.placeholderActive : null,
              ]}>
              Email
            </Text>
            <TextInput
              style={styles.textInputBox}
              onChangeText={onChangeLogin}
              value={login}
              inputMode="email"
            />
            <View style={styles.underline} />
          </View>
        </View>

        <View style={styles.inputBoxContainer}>
          <View style={styles.inputBox}>
            <Text
              style={[
                styles.placeholderInputBox,
                password ? styles.placeholderActive : null,
              ]}>
              Password
            </Text>
            <TextInput
              style={styles.textInputBox}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              inputMode="text"
            />
            <View style={styles.underline} />
          </View>
        </View>

        {/* Login Button */}
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={
              loginButtonEnabled
                ? styles.loginButtonAvailable
                : styles.loginButtonUnavailable
            }
            onPress={() => {}}>
            <Text
              style={
                loginButtonEnabled
                  ? styles.placeholderLoginButtonAvailable
                  : styles.placeholderLoginButtonUnavailable
              }>
              LOG IN
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ----------------------------------------------------------- TOP
  loginPageContainer: {
    // main cointainer
    flex: 1,
    height: height,
    width: width,
    backgroundColor: "white",
  },
  logoContainer: {
    // container
    alignContent: "center",
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  textTitlePageContainer: {
    // container
    height: "15%",
    marginTop: 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  textTitleLoginPage: {
    width: "90%",
    fontSize: 30,
    fontWeight: "400",
    color: "black",
    backgroundColor: "white",
  },
  descriptionLogin: {
    width: "90%",
    marginTop: 5,
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  // ------------------------------------------------------------ MIDDLE
  inputBoxContainer: {
    // container
    height: "12%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputBox: {
    height: "100%",
    width: "90%",
    backgroundColor: "#f1f3ef",
  },
  placeholderInputBox: {
    position: "absolute",
    top: 16,
    left: 5,
    fontSize: 20,
    color: "#aaa",
  },
  placeholderActive: {
    fontSize: 12,
    top: 5,
    color: "#666",
  },
  textInputBox: {
    height: "100%",
    fontSize: 20,
  },
  underline: {
    position: "absolute",
    bottom: 0, // Linha na parte inferior
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.42,
    backgroundColor: "black",
  },
  loginButtonContainer: {
    // container
    backgroundColor: "white",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonUnavailable: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    opacity: 0.2,
    height: "50%",
    width: "91%",
    marginTop: 10,
    borderRadius: 10,
  },
  loginButtonAvailable: {
    backgroundColor: "#61892F",
    marginTop: 10,
    height: "50%",
    width: "91%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderLoginButtonAvailable: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  placeholderLoginButtonUnavailable: {
    fontSize: 20,
    color: "gray",
    fontWeight: "500",
  },
  // ---------------------------------------------------------- BOTTOM
  forgotPasswordContainer: {
    // container
  },
  textForgotPassword: {},
  buttonLoginWithExternalAppsContainer: {
    // container
  },
  placeholderLoginWithExternalApps: {},
  svgExternalApps: {},
  // -------------------------------------------------------------- SignUp
  signUpContainer: {},
  textSignUpContainer: {},
});

export default LoginScreen;
