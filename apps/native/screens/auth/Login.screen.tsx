import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

type LoginTypes = {
  username: string;
  password: string;
};

const DATA: LoginTypes[] = [
  {
    username: "calfreitas",
    password: "test",
  },
];

const LoginScreen = () => {
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <SafeAreaView style={styles.loginPageContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* TOP */}
        <View style={styles.logoContainer}>
          <Text style={{ color: "white" }}>LOGOTIPO TRADE WALLET</Text>
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
            <TextInput
              style={styles.placeholderInputBox}
              onChangeText={onChangeLogin}
              value={login}
              placeholder="Email"
            />
          </View>
        </View>

        <View style={styles.inputBoxContainer}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.placeholderInputBox}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
            />
          </View>
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
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  textTitlePageContainer: {
    // container
    marginTop: 10,
    backgroundColor: "yellow",
  },
  textTitleLoginPage: {
    fontSize: 30,
    fontWeight: "400",
    color: "black",
    marginLeft: 10,
  },
  descriptionLogin: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "400",
    color: "black",
    marginLeft: 10,
  },
  // ------------------------------------------------------------ MIDDLE
  inputBoxContainer: {
    // container
    height: "15%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  inputBox: {
    height: "80%",
    width: "90%",

    backgroundColor: "white",
  },
  placeholderInputBox: {},
  loginButtonContainer: {
    // container
  },
  loginButtonUnavailable: {},
  loginButtonOk: {},
  placeholderLoginButton: {},
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
