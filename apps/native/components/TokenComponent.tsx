import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import GirlManagingTree from "@/assets/svg/GirlManagingTrees.svg";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("screen");

export function TokenComponent() {
    return (
        <View style={styles.container}>
            <ThemedView style={styles.tokenCard}>
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <View style={styles.leafIcon} />
                        <ThemedText style={styles.brandName}>Greenstand</ThemedText>
                    </View>
                    <ThemedText style={styles.subtitle}>Wallet App</ThemedText>
                </View>

                <View style={styles.illustrationContainer}>
                    <GirlManagingTree
                        width={width * 0.5}
                        height={width * 0.35}
                    />
                </View>
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    tokenCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.green,
        borderStyle: "dashed",
        padding: 20,
        marginVertical: 20,
        width: width * 0.85,
        height: width * 0.55,
        position: "relative",
        shadowColor: Colors.shadowDark,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    headerContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        alignItems: "flex-end",
        zIndex: 1,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    leafIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.green,
        marginRight: 6,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    brandName: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.green,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.charcoal,
        fontWeight: "500",
        textAlign: "right",
    },
    illustrationContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
    },
});
