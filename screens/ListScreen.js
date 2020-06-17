import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from "../media/logo.png";
import apples from "../media/apples.jpg";
import ViewMap from "../components/ViewMapButton"

const ListScreen = ({ navigation }) => {

  const toggleToMapView = () => {
    navigation.navigate("Map");
  };


  return (
    <View style={styles.container}>
        <Text>LIST SCREEN</Text>
        <ViewMap toggleToMapView={toggleToMapView} />
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
  }

});

export default ListScreen;
