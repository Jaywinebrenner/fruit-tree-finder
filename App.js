import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {useState, useEffect} from 'react'
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import DestinationButton from "./components/DestinationButton";
import Driver from './components/Driver';
import { CurrentLocationButton } from './components/CurrentLocationButton'
import { API_KEY } from "./geocoder";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
Geocoder.init(API_KEY);
import { TREES } from './constants/Markers'

export default function App() {
      // latitude: 45.5757745,
      //     longitude: -122.673,


const trees = TREES.markers;

const mapTrees = () => {

  trees.map((tree, index) => {
    let latitude = tree.coordinate.latitude
    let longitude = tree.coordinate.longetude
    return (
      <MapView.Marker
        key={index}
        coordinate={{
          latitude: console.log("LATIDUDE IN MAP", latitude),
          longitude: longitude,
        }}
        title={tree.title}
        description={tree.description}
      ></MapView.Marker>
    );
  })
}

console.log("TEST LATITIDUE", trees[0].coordinate.latitude);


const singleTest = () => {
  return (
    <View>
      <Marker
        coordinate={{
          latitude: trees[0].coordinate.latitude,
          longitude: trees[0].coordinate.longitude,
        }}
        title="Italian Plum"
        description="Giant Tree. Tall, terrifying."
      ></Marker>
    </View>
  );
}



  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null);

  const [region, setRegion] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  console.disableYellowBox = true;

  useEffect(() => {
  _getLocationsAsync();
  }, []);
    
    const _getLocationsAsync = async () => {
      try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== "granted") {
          setErrorMessage("Permissions to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({
          enabledHighAccuracy: true,
        });

        let region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(region);
      } catch (error) {
        let status = Location.getProviderStatusAsync();
            if (!status.locationServicesEnabled) {
            Alert.alert(error)
            }
      }
    }
    console.log("REGION", region);
    
    const centerMap = () => {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
      
      region.map.animateToRegion({
        latitude, 
        longitude, 
        longitudeDelta, 
        latitudeDelta
      })
    }


  return (
    <View style={styles.container}>
      {console.log("LOCATRION RETURN", { region })}
      <Text>MAP AP!!!</Text>
      <DestinationButton />
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
        {mapTrees()}
        {singleTest()}
        {/* <MapView.Marker
          coordinate={{
            latitude: 45.5757345,
            longitude: -122.67,
          }}
          title="Plum"
          description="Giant Tree. Beautiful, terrifying"
        ></MapView.Marker> */}
      </MapView>
    </View>
  );

 


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%"
  }
});
    