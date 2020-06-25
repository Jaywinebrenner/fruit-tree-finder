import React from "react";
import { useState, useEffect } from "react";
import { Image, View, StyleSheet, ActivityIndicator } from "react-native";
import logo from "../media/logo.png";
import firebase from "firebase"


const LoadingScreen = ({navigation}) => {


  useEffect(() => {
    checkIfLoggedIn()
  }, []);



  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        navigation.navigate("Home")
      } else {
      navigation.navigate("SignIn");
      }
    }
    )
  }

  return (
    <View style={styles.loadingBody}>
      <Image source={logo} style={styles.loadingImage} />
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingImage: {
    width: 300,
    height: 110,
    marginBottom: 30
  },
});

export default LoadingScreen;
