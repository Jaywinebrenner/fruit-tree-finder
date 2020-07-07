import React from "react";
import { StyleSheet, Text, View, Alert, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import DestinationButton from "../components/DestinationButton";
import Driver from "../components/Driver";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { API_KEY } from "../geocoder";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
Geocoder.init(API_KEY);
import { TREES } from "../constants/Markers";
import ViewListButton from "../components/ViewListButton"
import firebase, { database } from "firebase";
import { Entypo } from '@expo/vector-icons';
import apples from "../media/apples.jpg";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Search from "../components/Search";

import DrawerHomeSwipe from "./DrawerHomeSwipe";


const MapScreen = ({navigation}) => {

  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentDatabase, setCurrentDatabase] = useState([]);

  useEffect(() => {
    _getUserLocactionAsync();

      let result = firebase.database().
      ref("/tree")
      // .limitToFirst(20);
      result.on("value", (snapshot) => {
        let database = snapshot.val();
        setCurrentDatabase(database);
      });
  }, []);

  !currentDatabase && console.log("I Don't exist");
  currentDatabase &&
    Object.values(currentDatabase).forEach((value) => {
      console.log("Value", value);
    });


  const _getUserLocactionAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setErrorMessage("Permissions to access location was denied");
      }
      let userLocation = await Location.getCurrentPositionAsync({
        enabledHighAccuracy: true,
      });

      // On Phone
      // let region = {
      //   latitude: userLocation.coords.latitude,
      //   longitude: userLocation.coords.longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // };

      // On Simulator
      let region = {
        latitude: 45.5552595,
        longitude: -122.6720048,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setRegion(region);
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        Alert.alert(error);
      }
    }
  };

    // THIS APPARENTLY WORKS FOR CLASS COMPONENTS
  // const centerMap = () => {
  //   const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  //   this.map.animateToRegion({
  //     latitude,
  //     longitude,
  //     longitudeDelta,
  //     latitudeDelta,
  //   });
  // };

  const toggleToListView = () => {
    navigation.navigate("ListScreen")
  }


  //LEEEE, here's a basic text component if you want it for the header
  // <View>
  //   <TextInput
  //     placeholder="Search for a specific variety of tree"
  //     style={styles.textInput}
  //     onChangeText={() => console.log("hi there")}
  //     value={null}
  //   />
  //   <EvilIcons
  //     style={styles.searchIcon}
  //     name="search"
  //     size={24}
  //     color="darkgray"
  //   />
  // </View>;



  return (
    <View style={styles.container}>
      <Search navigation={navigation}/>
      { /* <ViewListButton toggleToListView={toggleToListView} /> */ }
      { /* <CurrentLocationButton
        cb={() => {
          centerMap();
        }}
      />
    */}

      <MapView
        loadingEnabled
        title="Not sure what this does"
        description="Not sure what this does either"
        showsUserLocation
        initialRegion={region}
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        // ref={(map) => {
        //   this.map = map;
        // }}
        rotateEnabled={false}
      >
        {currentDatabase &&
          Object.values(currentDatabase).map((tree, index) => {
            let latitude = tree.treeCoordinates[0];
            let longitude = tree.treeCoordinates[1];
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                title={tree.type}
                description={tree.description}
              >
                { /* <Entypo name="tree" size={30} color="green" /> */ }
              </Marker>
            );
          })}
      </MapView>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddTreeScreen")}>
        <MaterialCommunityIcons name="tree" size={25} color="darkgreen" />
        <Text style={styles.buttonText}>Add a tree</Text>
      </TouchableOpacity>
      </View>

      <DrawerHomeSwipe/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
    width: "100%",
    height: "60%",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 28,
    borderRadius: 3,
  },
  searchIcon: {
    position: "absolute",
    bottom: 8,
    left: 4,
  },
  buttons: {
    position: "absolute",
    right: "1%",
    zIndex: 0,
  },
  button: {
    top: 80,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: .5,
    borderRadius: 25,
    height: 35,
    marginLeft: "3%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: {
      width: 10,
      height: 10
    }
  },
  plusTree: {
    position: "absolute",
    left: 29,
    top: 20,
    zIndex: 1
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 17,
    textShadowColor: "white",
    textShadowRadius: 10,
    margin: "2%"

  }
});

export default MapScreen
