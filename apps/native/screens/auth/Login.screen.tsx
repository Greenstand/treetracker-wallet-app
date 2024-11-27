import { Link } from "expo-router";
import {
  Dimensions,
  Platform,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
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
        <View style={styles.inputBoxContainer}></View>
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
