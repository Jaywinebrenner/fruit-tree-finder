import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from '../media/logo.png'
import apples from "../media/apples.jpg";
import firebase, { database } from "firebase";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = ( {navigation}) => {


  const [currentDatabase, setCurrentDatabase] = useState([])

    const fakeSignOut = () => {
      try {
        firebase.auth().signOut();
      } catch (error) {}
      return null;
    };

  //   useEffect(() => {

  //     // Pulling down database
  //     let result = firebase.database().
  //     ref("/tree")
  //     // .limitToFirst(20);
  //     result.on("value", (snapshot) => {
  //       console.log("snapshot val", snapshot.val());
  //       let database = snapshot.val();
  //       setCurrentDatabase(database);
  //     });
  //   }, []);
      
  // if (!currentDatabase) {
  //   console.log("I DONT EXIST");
  // } 

  // if (currentDatabase) {
  //   console.log("I EXIST");
  //   console.log("CURRENT DATABASE", currentDatabase);
  //   Object.values(currentDatabase).forEach((value) => {
  //     console.log("lat", value.treeCoordinates[1]);
  //   })
    
  // }



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
      <TouchableOpacity style={styles.signOut}>
        <Text style={styles.signOutButtonText} onPress={() => fakeSignOut()}>
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
     flex: 0.3,
     justifyContent: "center",
     alignItems: "center",
   },
   signOut: {
     textAlign: "center",
     justifyContent: "center",
     backgroundColor: "white",
     height: 40,
     width: 100,
    marginTop: 20,
     borderRadius: 3,
     borderWidth: 1,
     borderColor: "#802941",
   },
   signOutButtonText: {
     marginTop: 5,
     alignSelf: "center",
     color: "#802941",
   },
 });

export default HomeScreen