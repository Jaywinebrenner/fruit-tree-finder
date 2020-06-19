import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from '../media/logo.png'
import apples from "../media/apples.jpg";
import firebase from "firebase";

const HomeScreen = () => {

    const fakeSignOut = () => {
      try {
        firebase.auth().signOut();
      } catch (error) {}
      return null;
    };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View styles={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
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
      <Text style={styles.fake} onPress={() => fakeSignOut()}>
        FAKE SIGN OUT
      </Text>
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
     marginBottom: 24,
     marginTop: 24,
   },
   headerWrapper: {
     marginTop: 16,
     marginBottom: 20,
     flex: 0.2,
     backgroundColor: "#f9fcfb",
     alignItems: "center",
     justifyContent: "center",
     textAlign: "center",
   },
   headerText: {
     fontSize: 35,
     color: "white",
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
     flex: .3,
     justifyContent: "center",
     alignItems: "center",
   },
 });

export default HomeScreen