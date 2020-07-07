import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from '../media/logo.png'
import apples from "../media/apples.jpg";
import firebase, { database } from "firebase";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = ({ setHasTreeData }) => {

  console.log("set Tree Data??", setHasTreeData);
  
  const signOut = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      Alert.alert(error.toString());
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View styles={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.logOutWrapper}>
          <TouchableOpacity style={styles.signOut}>
            <Text
              style={styles.signOutButtonText}
              onPress={() => signOut()}
            >
              SIGN OUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <ImageBackground source={apples} style={styles.applesImage}>
          <Text style={styles.headerText}>
            Promote food justice. Prevent food waste. Strengthen our community.
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Pick delicious food from the thriving bounties growing in your very
          neightborhood.
        </Text>
      </View>
      <TouchableOpacity style={styles.signOut}>
        <Text style={styles.signOutButtonText} onPress={() => signOut()}>
          SIGN OUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};


 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
     textAlign: "center",
     backgroundColor: "#f9fcfb",
     //  marginBottom: 24,
     //  marginTop: 24,
   },
   headerWrapper: {
     marginTop: 16,
     marginBottom: 20,
     marginRight: 100,
     flex: 0.2,
     backgroundColor: "#f9fcfb",
     //  alignItems: "center",
     //  justifyContent: "center",
     //  textAlign: "center",
     //  flexDirection: "row"
   },
   //  logOutWrapper:{
   //   // position: "absolute",
   //   left: 1000
   //  },
   headerText: {
     fontSize: 34,
     fontWeight: "bold",
     color: "white",
     textShadowColor: "black",
     textShadowOffset: { width: 5, height: 5 },
     textShadowRadius: 10,
   },
   logoContainer: {
     flex: 1,
   },
   logo: {
     flex: 1,
     marginTop: 10,
     resizeMode: "contain",
   },
   body: {
     flex: 0.6,
     backgroundColor: "green",
     width: "100%",
   },
   applesImage: {
     flex: 1,
     resizeMode: "cover",
     justifyContent: "center",
     alignItems: "center",
   },
   footerText: {
     fontSize: 24,
     color: "black",
   },
   footer: {
     paddingLeft: 10,
     paddingRight: 10,
     flex: 0.3,
     justifyContent: "center",
     alignItems: "center",
   },
   signOut: {
     position: "absolute",
     top: 35,
     right: 15,
     textAlign: "center",
     justifyContent: "center",
     backgroundColor: "#f9fcfb",
     height: 40,
     width: 60,
     marginTop: 20,
     borderRadius: 3,
     borderWidth: 2,
     borderColor: "#802941",
     shadowColor: "black",
     elevation: 1,
     shadowRadius: 4,
     shadowOpacity: 0.3,
   },
   signOutButtonText: {
     marginTop: 5,
     alignSelf: "center",
     color: "#802941",
     fontSize: 10,
   },
 });

export default AboutScreen