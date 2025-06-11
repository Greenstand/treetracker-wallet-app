import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  provider: "Gmail" | "Facebook" | "GitHub";
  onPress: () => void;
};

const SocialLoginButton: React.FC<Props> = ({ provider, onPress }) => {
  const iconMap = {
    Gmail: (
      <MaterialCommunityIcons name="gmail" size={25} color={Colors.green} />
    ),
    Facebook: (
      <View style={styles.facebookIconContainer}>
        <FontAwesome name="facebook" size={16} color="white" />
      </View>
    ),
    GitHub: <FontAwesome name="github" size={25} color={Colors.green} />,
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconMap[provider]}
      <Text style={styles.text}>Log in with {provider}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    borderColor: Colors.green,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  facebookIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialLoginButton;
