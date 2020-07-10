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
import ViewListButton from "../components/ViewListButton"
import firebase, { database } from "firebase";
import { Entypo } from '@expo/vector-icons';
import apples from "../media/apples.jpg";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { mapStyle } from "../constants/mapStyle";

import Search from "../components/Search";

import DrawerHomeSwipe from "./DrawerHomeSwipe";
import FilterDropDown from "../components/FilterDropDown";

const MapScreen = ({navigation}) => {

  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentDatabase, setCurrentDatabase] = useState([]);
  const [filter, setFilter] = useState("All Trees");

    let currentUserID = null;

    if (firebase.auth().currentUser) {
      currentUserID = firebase.auth().currentUser.uid;
    }

    console.log("current USER ID Map Screen", currentUserID);


  let user = firebase.auth().currentUser
  

  useEffect(() => {
    _getUserLocactionAsync();

    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        // console.log("snapshot val", snapshot.val());
        let database = snapshot.val();
        setCurrentDatabase(database);
      });
    }
    fetchData();
  }, []);


  !currentDatabase && console.log("I Don't exist");
  currentDatabase &&
    Object.values(currentDatabase).forEach((value) => {
      console.log("Value USER ID", value.userID);
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


  const renderAddATreeButton = () => {
    return (
      <TouchableOpacity style={styles.addTreeButton} onPress={() => navigation.navigate("AddTreeScreen")}>
        <Entypo name="plus" size={18} color="black" />
        <Text style={styles.buttonText}>Add a tree</Text>
      </TouchableOpacity>
    )
  }

  const AllTreesMapMarkers =
    currentDatabase &&
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
          {/* <Entypo name="tree" size={30} color="green" /> */}
        </Marker>
      );
    });


  const MyTreesMapMarkers =
    currentDatabase &&
    Object.values(currentDatabase).map((value, index) => {
      let latitude = value.treeCoordinates[0];
      let longitude = value.treeCoordinates[1];
      if (value.userID === currentUserID) {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={value.type}
            description={value.description}
          ></Marker>
        );
      }
    });

  return (
    <View style={styles.container}>
      <Search navigation={navigation} />
      {/* <ViewListButton toggleToListView={toggleToListView} /> */}
      <FilterDropDown filter={filter} setFilter={setFilter} />
      <CurrentLocationButton
        cb={() => {
          centerMap();
        }}
      />
      <MapView
        loadingEnabled
        title="Not sure what this does"
        description="Not sure what this does either"
        showsUserLocation
        initialRegion={region}
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        customMapStyle={mapStyle}
        // ref={(map) => {
        //   this.map = map;
        // }}
        rotateEnabled={false}
      >
        {filter === "All Trees" && AllTreesMapMarkers }
        {filter === "My Trees" && MyTreesMapMarkers}
      </MapView>


      {user && renderAddATreeButton()}

      <TouchableOpacity
        style={styles.toggle}
        onPress={() => navigation.navigate("ListScreen")}
      >
        <Ionicons name="ios-arrow-forward" size={60} color="white" />
      </TouchableOpacity>

      <DrawerHomeSwipe />
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
  addTreeButton: {
    position: "absolute",
    right: "1%",
    zIndex: 2,
    flex: 1,
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
    zIndex: 3,  },
  buttonText: {
    color: "black",
    fontSize: 15,
    textShadowColor: "white",
    textShadowRadius: 10,
    margin: "2%"
  },
  toggle: {
    position: "absolute",
    top: "45%",
    right: "0%",
    paddingVertical: 4,
    paddingLeft: 15,
    paddingRight: 7,
    backgroundColor: "rgba(158, 128, 128, .4)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  }
});
export default MapScreen
