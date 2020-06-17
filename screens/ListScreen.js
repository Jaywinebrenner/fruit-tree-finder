import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView } from "react-native";
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
      <View style={styles.top}>
        <Text style={styles.headerText}>Fruit Trees in your area </Text>
      </View>

      <ScrollView style={styles.middle}>


      </ScrollView>



      <ViewMap toggleToMapView={toggleToMapView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // textAlign: "center",
    // backgroundColor: "#f9fcfb",
    // marginBottom: 24,
    // marginTop: 24,
  },
  top: {
    // flex: 1,
    height: 100,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    textAlign: "center",
  },
  middle: {
    flex: 15,
    backgroundColor: "lightblue",
  },
  headerText: {
      fontSize: 25,
      paddingLeft: 10,
  }
});

export default ListScreen;
