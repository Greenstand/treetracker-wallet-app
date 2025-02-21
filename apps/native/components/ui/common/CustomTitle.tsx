import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface CustomTitleProps {
  title: string;
  subtitle?: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: "#222629DE",
  },
});

export default CustomTitle;
