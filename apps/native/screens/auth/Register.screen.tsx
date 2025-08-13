import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { z } from "zod";
import { Colors } from "@/constants/Colors";

import CustomTextInput from "@/components/ui/common/CustomTextInput";
import CustomTitle from "@/components/ui/common/CustomTitle";
import CustomSubmitButton from "@/components/ui/common/CustomSubmitButton";
import { ThemedText } from "@/components/ThemedText";
import CustomSignUpProviderButton from "@/components/ui/common/CustomSignUpProviderButton";

type SignUpFormData = Omit<z.infer<typeof signUpFormSchema>, "confirmPassword">;
type FormField = keyof z.infer<typeof signUpFormSchema>;
type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const signUpFormSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email("Error: Email is incorrect."),
    password: z.string().min(8, "Error: Password length is incorrect."),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFormField = (field: FormField, value: string) => {
    setErrors(prev => ({ ...prev, [field]: "" }));

    const currValues: SignUpFormValues = {
      name: field === "name" ? value : name,
      email: field === "email" ? value : email,
      password: field === "password" ? value : password,
      confirmPassword: field === "confirmPassword" ? value : confirmPassword,
    };

    const result = signUpFormSchema.safeParse(currValues);

    if (!result.success) {
      const fieldError = result.error.errors.find(err => err.path[0] === field);

      if (fieldError) {
        setErrors(prev => ({ ...prev, [field]: fieldError.message }));
      }
    }

    setIsSignUpButtonDisabled(!result.success);
  };

  const handleNameOnChangeText = (text: string) => {
    setName(text);
    validateFormField("name", text);
  };

  const handleEmailOnChangeText = (text: string) => {
    setEmail(text);
    validateFormField("email", text);
  };

  const handlePasswordOnChangeText = (text: string) => {
    setPassword(text);
    validateFormField("password", text);
  };

  const handleConfirmPasswordOnChangeText = (text: string) => {
    setConfirmPassword(text);
    validateFormField("confirmPassword", text);
  };

  const handleSubmitSignUp = () => {
    const formData: SignUpFormData = {
      name: name,
      email: email,
      password: password,
    };

    // TODO: send form data to back-end

    // reset form fields and disable signup button on submit
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSignUpButtonDisabled(true);

    // TODO: redirect to creating account/loading screen instead of home
    router.push("/");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View>
          <CustomTitle title="Sign up" />
          <CustomTextInput
            label="Name"
            placeholder="Name"
            keyboardType="default"
            onChangeText={handleNameOnChangeText}
            value={name}
            error={!!errors.name}
          />
          <CustomTextInput
            label="Email"
            placeholder="Email"
            onChangeText={handleEmailOnChangeText}
            value={email}
            keyboardType="email-address"
            error={!!errors.email}
            helperText={errors.email}
          />
          <CustomTextInput
            label="Password"
            placeholder="Password"
            onChangeText={handlePasswordOnChangeText}
            value={password}
            secureTextEntry={true}
            error={!!errors.password}
            helperText={errors.password || "Minimum length 8 characters"}
            showSuccessHelperText={true}
          />
          <CustomTextInput
            label="Confirm password"
            placeholder="Confirm password"
            onChangeText={handleConfirmPasswordOnChangeText}
            value={confirmPassword}
            secureTextEntry={true}
            error={!!errors.confirmPassword}
          />
        </View>
        <View style={styles.input}>
          <CustomSubmitButton
            title="SIGN UP"
            disabled={!isSignUpButtonDisabled}
            onPress={handleSubmitSignUp}
          />
          <ThemedText
            type="default"
            lightColor="black"
            darkColor="white"
            style={[styles.text, styles.centeredText]}>
            or
          </ThemedText>
          <CustomSignUpProviderButton
            authProvider="Gmail"
            // TODO: create onpress handler for auth provider signup redirect
            onPress={() => {}}
          />
          <CustomSignUpProviderButton
            authProvider="Facebook"
            // TODO: create onpress handler for auth provider signup redirect
            onPress={() => {}}
          />
          <CustomSignUpProviderButton
            authProvider="GitHub"
            // TODO: create onpress handler for auth provider signup redirect
            onPress={() => {}}
          />
          <ThemedText
            type="title"
            lightColor="black"
            darkColor="white"
            style={[styles.text, styles.centeredText, styles.altMargin]}>
            Have an account?{" "}
            <Link href="/login">
              <ThemedText
                type="link"
                lightColor="black"
                darkColor="white"
                style={[styles.centeredText, styles.linkText]}>
                Log in
              </ThemedText>
            </Link>
          </ThemedText>
          <ThemedText
            type="title"
            lightColor="black"
            darkColor="white"
            style={[
              styles.text,
              styles.privacyTermsText,
              styles.lastChildPadding,
            ]}>
            By continuing, I agree to Greenstand's{" "}
            <Link href="">
              <ThemedText
                type="link"
                lightColor="black"
                darkColor="white"
                style={[styles.text, styles.linkText]}>
                Privacy Policy
              </ThemedText>{" "}
              and{" "}
              <ThemedText
                type="link"
                lightColor="black"
                darkColor="white"
                style={[styles.text, styles.linkText]}>
                Terms of Use
              </ThemedText>
            </Link>
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 70,
  },
  container: {
    display: "flex",
    padding: 20,
    paddingHorizontal: "5%",
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    paddingTop: 15,
  },
  centeredText: {
    textAlign: "center",
    fontSize: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 30,
    color: "#222629DE",
  },
  linkText: {
    color: Colors.green,
  },
  privacyTermsText: {
    color: Colors.darkGray,
  },
  altMargin: {
    marginTop: 30,
  },
  lastChildPadding: {
    paddingBottom: 30,
  },
});

export default RegisterScreen;
