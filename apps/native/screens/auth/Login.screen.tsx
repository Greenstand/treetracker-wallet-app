import { Link } from "expo-router";
import { Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>LoginScreen</Text>
      <Link push href="/(tabs)/home">
        Login
      </Link>
    </View>
  );
};

export default LoginScreen;
