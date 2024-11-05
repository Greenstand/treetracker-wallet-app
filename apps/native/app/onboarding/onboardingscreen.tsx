import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from "expo-router";

const onboardingData = [
    {
      id: '1',
      icon: require('.path'),
      title: 'Join the Greenstand movement!',
      description: 'Start making a positive impact on the environment today.',
    },
    {
      id: '2',
      icon: require('.path'),
      title: 'Experience the convenience',
      description: 'Enjoy the ease of digital wallet transfers on the go.',
    },
    {
      id: '3',
      icon: require('.path'),
      title: 'Secure exchanges',
      description: 'Access secure and reliable wallet transactions.',
    },
  ];

export default function OnboardingScreen() {

    const[currentIndex, setCurrentIndex] = useState(0);

    const renderItem
    
    return(
        <SafeAreaView style={{ flex: 1}}>
            <View style={styles.container}>

                {/* icon */}
                <View style={styles.top_container}>
                    <View style={styles.iconBox}/>
                </View>

                {/* text and pointers */}
                <View style={styles.middle_container}>
                    <View style={styles.text_container}/>
                </View>

                {/* Button */}
                <View style={styles.button_container}>

                </View>

                <View style={styles.bottom_container}>

                </View>

            </View>
        </SafeAreaView>
    ); 
}


// Styling components
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin: 15,
        backgroundColor: 'red'
    },
    top_container : {
        flex: 2, 
        maxHeight: 200,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    iconBox: {
        backgroundColor: 'green',
        width: 150,
        height: 150,  
    },
    middle_container: {
        flex:2,
    },
    text_container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    button_container: {
        flex:1,
        backgroundColor: 'purple',
        height: 100
    },
    bottom_container: {
        flex:1,
        maxHeight: 100
    }


})