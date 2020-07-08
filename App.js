
import * as React from "react";
import * as firebase from "firebase";
import {firebaseConfig} from "./firebase"
import { useState, useEffect } from "react";
import { SplashScreen } from "expo";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {RegisteredStackNavigator} from "./navigation/RegisteredStackNavigator";
import HomeStackNavigator from './navigation/HomeStackNavigator';
import LoadingScreen from './screens/LoadingScreen'
import { StatusBar, Platform } from "react-native";

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);
const AuthStack = createStackNavigator();

function App() {

  const [hasTreeData, setHasTreeData] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();

  console.log("CURRENT USER APP", auth.currentUser);

    let [loading, setLoading] = useState(true);

    let [loggedIn, setLoggedIn] = useState(false);
    console.log("LOGGED IN?", loggedIn);


    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });

  console.disableYellowBox = true;

  const isIOS = Platform.OS === "ios";

  return (
    <React.Fragment>
      {isIOS && <StatusBar backgroundColor="white" barStyle="light-content" />}
      <NavigationContainer>
        <AuthStack.Navigator headerMode="none">
          {loading ? (
            <AuthStack.Screen name="Loading" component={LoadingScreen} />
          ) : (
            loggedIn ? (
              <AuthStack.Screen
                name="SignedIn"
                component={RegisteredStackNavigator}
              />
            ) : (
              <AuthStack.Screen
                name="Home"
                component={HomeStackNavigator}
              />
            )
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}



export default App;
