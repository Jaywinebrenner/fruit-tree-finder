
import * as React from "react";
import * as firebase from "firebase";
import {firebaseConfig} from "./firebase"
import { useState, useEffect } from "react";
import { SplashScreen } from "expo";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {BottomTabNavigator} from "./navigation/BottomTabNavigator";
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);
const AuthStack = createStackNavigator();

function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();

  console.log("AUTH", auth);
  
    let [loggedIn, setLoggedIn] = useState("loading");
    console.log("LOGGED IN?", loggedIn);
    

    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn("true");
      } else {
        setLoggedIn("false");
      }
    });

  
    

  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <AuthStack.Navigator headerMode="none">
        {loggedIn === "loading" && (
          <AuthStack.Screen name="Loading" component={LoadingScreen} />
        )}
        {loggedIn === "false" && (
          <AuthStack.Screen name="SignIn" component={LoginScreen} />
        )}
        {loggedIn && (
          <AuthStack.Screen name="Home" component={BottomTabNavigator} />
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}



export default App;
