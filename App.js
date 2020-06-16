import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from 'react'
import MapView from 'react-native-maps'
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Geocoder from "react-native-geocoding";
import { DesinationButton } from './components/DestinationButton';
import { CurrentLocationButton } from './components/CurrentLocationButton'
import { API_KEY } from "./geocoder";
Geocoder.init(API_KEY);

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null);
    const [initialCoordinates, setInitialCoordinates] = useState([
      45.5236111,
      -122.675,
    ]);

    const [region, setRegion] = useState(null)

    console.disableYellowBox = true;


    useEffect(() => {
    _getLocationsAsync();
    }, []);
    
    const _getLocationsAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if(status !== "granted") {
        console.log("Permissions to access location was denied")
      }
      let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true})
      console.log("LCATION INSIODE GET LOXATION", location);
      
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      console.log("REGION INSIDE GETLOCATION", region)
      setRegion(region)
      console.log("REGION", region);
    }
          // const centerMap = () => {
          //   const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
          //   map.animateToRegion({
          //     latitude, 
          //     longitude, 
          //     longitudeDelta, 
          //     latitudeDelta
          //   })
          // }
 

  


//       useEffect(() => {
//         (async () => {
//           try {
//             let { status } = await Location.requestPermissionsAsync();
    
//             if (status !== "granted") {
//               setErrorMsg("Permission to access location was denied");
//             }
//             let location = await Location.getCurrentPositionAsync({});
//             await setLocation(location);
      
//             setLatitude(location.coords.latitude);
//             setLongitude(location.coords.longitude);
//             console.log("LONGETUDE", longitude)
//         } catch (error) {
//             let status = Location.getProviderStatusAsync();
//             if (!status.locationServicesEnabled) {
//               setIsLocationModalVisible(true);
//             }
//           }
//         })();
//       });

//         let text = "Waiting..";
//         if (errorMsg) {
//           text = errorMsg;
//         } else if (location) {
//           text = JSON.stringify(location);
//         }
//   console.log("LATITUDE", latitude);
// console.log("LOCATION", longitude);


if (initialCoordinates) {
  return (
    <View style={styles.container}>
      {console.log("LOCATRION RETURN", { location })}
      <Text>MAP AP!!!</Text>
      <DesinationButton />
      <CurrentLocationButton />
      <MapView
        // showsUserLocation
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        region={{
          latitude: initialCoordinates[0],
          longitude: initialCoordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
    </View>
  );
}

return (
  <View><Text>You don't have no Latitude.</Text></View>
)


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
    