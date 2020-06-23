import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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

const MapScreen = ({navigation}) => {

  const trees = TREES.markers;

  console.log("TEST LATITUDE", trees[0].coordinate.latitude);

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentDatabase, setCurrentDatabase] = useState([]);

  useEffect(() => {
    _getUserLocactionAsync();

        // Pulling down database
      let result = firebase.database().
      ref("/tree").
      limitToFirst(20);
      result.on("value", (snapshot) => {
        console.log("snapshot val", snapshot.val());
        let database = snapshot.val();
        setCurrentDatabase(database);

      });
  }, []);

    if (!currentDatabase) {
      console.log("I DONT EXIST");
    }
    if (currentDatabase) {
      console.log("I EXIST");
      console.log("CURRENT DATABASE", currentDatabase);
      Object.values(currentDatabase).forEach((value) => {
        console.log("Value", value.type);
      });
    }


  const _getUserLocactionAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setErrorMessage("Permissions to access location was denied");
      }
      let userLocation = await Location.getCurrentPositionAsync({
        enabledHighAccuracy: true,
      });

      let region = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
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

  // const centerMap = () => {
  //   const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  //   region.map.animateToRegion({
  //     latitude,
  //     longitude,
  //     longitudeDelta,
  //     latitudeDelta,
  //   });
  // };

  const toggleToListView = () => {
    navigation.navigate("ListScreen")
  }

  return (
    <View style={styles.container}>
      <ViewListButton toggleToListView={toggleToListView} />
      <CurrentLocationButton
        cb={() => {
          centerMap();
        }}
      />
      <MapView
        loadingEnabled
        title="Flatiron School Atlanta"
        description="This is where the magic happens!"
        showsUserLocation
        initialRegion={region}
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        ref={(map) => {
          map = map;
        }}
        rotateEnabled={false}
      >
        {/* {mapTrees} */}
        {/* {singleTest()} */}
        {/* {singleTestTwo()} */}

      {trees.map((tree, index) => {
        let latitude = tree.coordinate.latitude;
        let longitude = tree.coordinate.longitude;

        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={tree.title}
            description={tree.description}
          ></Marker>
        );
      })}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  testText:{
    paddingTop: 50,
    fontSize: 50
  }
});


export default MapScreen