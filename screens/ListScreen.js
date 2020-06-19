import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from "../media/logo.png";
import apples from "../media/apples.jpg";
import ViewMapButton from "../components/ViewMapButton"
import ListItemDetailScreen from "./ListItemDetailScreen";
import { TREES } from "../constants/Markers";

const ListScreen = (  { navigation, title, description }) => {

  const trees = TREES.markers;
  console.log("TREES", trees);

  const toggleToMapView = () => {
    navigation.navigate("Map");
  };



const TreeCard = ( { title, description } ) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitleText}>{title}</Text>
        <Text style={styles.cardDistanceText}>65 Meters away</Text>
      </View>

      <View style={styles.cardMiddle}>
        <Text style={styles.cardDescriptionText}>{description}</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.cardDetailsButtonWrapper}
          onPress={() => navigation.navigate("ListItemDetailScreen")}
        >
          <Text style={styles.cardDetailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.headerText}>Fruit Trees in your area </Text>
      </View>

      <FlatList
        data={trees}
        renderItem={({ item }) => (
          <TreeCard title={item.title} description={item.description} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <ViewMapButton toggleToMapView={toggleToMapView} />
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
    backgroundColor: "#802941",
    justifyContent: "center",
    textAlign: "center",
  },
  middle: {
    flex: 15,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 10,
    color: "white",
  },
  cardContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 180,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    color: "red",
    // backgroundColor: "#eaeaea",
    borderWidth: 1,
    borderRadius: 20,
    // shadowColor: "black",
    // elevation: 5,
    // shadowRadius: 2,
    // shadowOpacity: 0.6,
  },
  cardTop: {
    flex: 0.25,
  },
  cardMiddle: {
    marginTop: 20,
    flex: 0.5,
  },
  cardBottom: {
    flex: 0.25,
  },
  cardDescriptionText: {
    alignSelf: "center",
  },
  cardDetailsButtonWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
  },
  cardTitleText: {
    alignSelf: "center",
    fontSize: 22,
  },
  cardDistanceText: {
    alignSelf: "center",
    fontSize: 15,
  },
  cardTitleText: {
    alignSelf: "center",
    fontSize: 22,
  },
});

export default ListScreen;
