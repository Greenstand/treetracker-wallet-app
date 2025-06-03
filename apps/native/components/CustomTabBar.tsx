import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalContext } from "@/context/ModalContext";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { setModalVisible } = useContext(ModalContext);

  const handleChooseActionPress = () => {
    setModalVisible(true);
  };

  const routes = [...state.routes];

  return (
    <View style={styles.container}>
      {routes.map((route, index) => {
        // Insert custom "Send" button in the center
        const midpoint = Math.floor(routes.length / 2);
        if (index === midpoint) {
          return (
            <React.Fragment key="chooseAction">
              <Pressable
                onPress={handleChooseActionPress}
                style={styles.sendButtonWrapper}
                android_ripple={{
                  color: "#dcdcdc",
                  radius: 40,
                  borderless: true,
                }}>
                <View style={styles.sendButton}>
                  <MaterialIcons name="swap-horiz" size={26} color="#fff" />
                </View>
              </Pressable>
              {renderTab(route, index)}
            </React.Fragment>
          );
        }

        return renderTab(route, index);
      })}
    </View>
  );

  function renderTab(route: any, index: number) {
    const isFocused = state.index === index;
    const { options } = descriptors[route.key];

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const renderIcon = () => {
      switch (route.name) {
        case "home":
          return "home";
        case "wallet":
          return "account-balance-wallet";
        case "notifications":
          return "notifications";
        case "settings":
          return "settings";
        default:
          return "home";
      }
    };

    const label = route.name.trim();
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        android_ripple={{ color: "#dcdcdc", radius: 40, borderless: true }}
        style={styles.tabItem}>
        <MaterialIcons
          name={renderIcon()}
          size={24}
          color={isFocused ? "#61892F" : "#22262999"}
        />
        <Text
          style={[
            styles.sizeText,
            isFocused ? styles.focusedText : styles.unfocusedText,
          ]}>
          {capitalizedLabel}
        </Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonWrapper: {
    position: "relative",
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#61892F",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  sendButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#61892F",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 12,
    marginTop: 4,
  },
  focusedText: {
    color: "#61892F",
  },
  unfocusedText: {
    color: "#22262999",
  },
});
