import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const Continue = () => {
    //continue
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Account Created</Text>
        </View>
        <View>
          <Text>
            Welcome and thank you for joining our reforestation mission and
            becoming part of our global community dedicated to positive
            environmental impact.
          </Text>
        </View>
        <View>
          <Text>
            Upon creating your account, you will automatically receive your
            wallet, which you can rename later.
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={Continue}>
            <Text>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default WelcomeScreen;
