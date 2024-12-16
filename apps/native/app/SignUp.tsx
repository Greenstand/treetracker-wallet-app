import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <SafeAreaView>
        <Text>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChange={e => setName}
          placeholder="Name"></TextInput>
        <TextInput
          style={styles.input}
          value={email}
          onChange={e => setEmail}
          placeholder="Email"></TextInput>
        <TextInput
          style={styles.input}
          value={password}
          onChange={e => setPassword}
          secureTextEntry={true}
          placeholder="Password"></TextInput>
        <TextInput
          style={styles.input}
          value="Password"
          secureTextEntry={true}
          placeholder="Confirm Password"></TextInput>
        <Button onPress={Submit} title="SIGN UP"></Button>

        <Text>or</Text>

        <View style={altSignup.input}>
          <Button onPress={GmailSubmit} title="SIGN UP WITH GMAIL"></Button>
        </View>

        <View style={altSignup.input}>
          <Button
            onPress={FacebookSubmit}
            title="SIGN UP WITH FACEBOOK"></Button>
        </View>

        <View style={altSignup.input}>
          <Button onPress={GithubSubmit} title="SIGN UP WITH GITHUB"></Button>
        </View>
        <Text>Have an accout? Log in</Text>
        <Text>
          By continuing I agree to Greenstand's Privacy Policy and Terms of Use
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {},
});

const altSignup = StyleSheet.create({
  input: {},
});

export default SignUp;
