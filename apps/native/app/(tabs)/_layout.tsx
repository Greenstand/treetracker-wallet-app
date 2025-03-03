import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          elevation: 0,
          borderTopWidth: 0,
          height: 100,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.option}>
              <MaterialIcons
                name="home"
                size={26}
                color={focused ? "#61892F" : "#22262999"}
              />
              <Text style={focused ? styles.focusedText : styles.unfocusedText}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.sendOption}>
              <View style={styles.sendOptionContentOne}>
                <View style={styles.sendOptionContentTwo}>
                  <MaterialIcons name="swap-horiz" size={26} color="#fff" />
                </View>
              </View>
              <Text style={focused ? styles.focusedText : styles.unfocusedText}>
                Send
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.option}>
              <MaterialIcons
                name="settings"
                size={26}
                color={focused ? "#61892F" : "#22262999"}
              />
              <Text style={focused ? styles.focusedText : styles.unfocusedText}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  option: {
    alignItems: "center",
    paddingTop: 10,
    height: 60,
  },
  focusedText: {
    color: "#61892F",
  },
  unfocusedText: {
    color: "#22262999",
  },
  sendOption: {
    position: "absolute",
    top: -40,
    height: 100,
    alignItems: "center",
    paddingTop: 10,
    width: 70,
    justifyContent: "space-between",
  },
  sendOptionContentOne: {
    backgroundColor: "#f5f5f5",
    width: 70,
    height: 70,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendOptionContentTwo: {
    backgroundColor: "#61892F",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
