import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

interface CustomSignUpProviderButtonProps {
  onPress: () => void;
  authProvider: "Gmail" | "Facebook" | "GitHub";
}

const CustomSignUpProviderButton: React.FC<CustomSignUpProviderButtonProps> = ({
  authProvider,
  onPress,
}) => {
  const providerIcons = {
    Gmail: (
      <MaterialCommunityIcons name="gmail" size={25} color={Colors.green} />
    ),
    Facebook: (
      <MaterialCommunityIcons name="facebook" size={25} color={Colors.green} />
    ),
    GitHub: <AntDesign name="github" size={25} color={Colors.green} />,
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.content}>
        <View>{providerIcons[authProvider]}</View>
        <Text style={styles.text}>Sign up with {authProvider}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  text: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default CustomSignUpProviderButton;
