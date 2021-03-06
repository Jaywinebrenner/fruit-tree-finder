import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Marker, Callout, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import DestinationButton from "../components/DestinationButton";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { API_KEY } from "../geocoder";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
Geocoder.init(API_KEY);
import firebase, { database } from "firebase";
import { Entypo } from '@expo/vector-icons';
import { mapStyle } from "../constants/mapStyle";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { Callout } from "react-native-maps";
import Search from "../components/Search";
import DrawerHomeSwipe from "./DrawerHomeSwipe";
import FilterDropDown from "../components/FilterDropDown";
import customTree from "../media/customTree.png";
import customTreeMyTree from "../media/customTreeMyTree.png";
import customTreeVerified from "../media/customTreeVerified.png";

const MapScreen = ({navigation}) => {
  
const mapRef = useRef(null);
const markerRef = useRef();
// if (mapRef && mapRef !== markerRef.current) {
//   markerRef.current = data.posts.map(React.createRef);
//   dataRef.current = data;
// }

  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allTrees, setAllTrees] = useState([]);
  const [filter, setFilter] = useState("All Trees");
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  // const [searchedTrees, setSearchedTrees] = useState([])
   const [searchInput, setSearchInput] = useState("");
   const [searchInputArray, setSearchInputArray] = useState(null)


  // let searchedTrees = allTrees.filter((tree) => {
  //   return tree.type.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
  // });

  // console.log("searched Trees", searchedTrees);

  let currentUserID = null;
  if (firebase.auth().currentUser) {
    currentUserID = firebase.auth().currentUser.uid;
  }

  useEffect(() => {

    _getUserLocactionAsync();
    setTracksViewChanges(true);
    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        let trees = snapshot.val();
        setAllTrees(trees);
      });
    }
    fetchData();
  }, []);

  const _getUserLocactionAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setErrorMessage("Permissions to access location was denied");
      }
      let userLocation = await Location.getCurrentPositionAsync({
        enabledHighAccuracy: true,
      });
      setUserCoords([userLocation.coords.latitude, userLocation.coords.longitude]);

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
      <TouchableOpacity
        style={styles.addTreeButton}
        onPress={() =>
          navigation.navigate("AddTreeScreen", {
            allTrees,
          })
        }
      >
        <Entypo name="plus" size={18} color="black" />
        <Text style={styles.buttonText}>Add a tree</Text>
      </TouchableOpacity>
    );
  }

  function stopTrackingViewChanges() {
    if (tracksViewChanges) {
      setTracksViewChanges(false);
    }
  }

  const AllTreesMapMarkers =
    allTrees &&
    Object.values(allTrees).map((value, index) => {
      let latitude = value.treeCoordinates[0];
      let longitude = value.treeCoordinates[1];
      if (value.userID !== currentUserID) {
        // let region = {
        //   latitude: value.treeCoordinates[0],
        //   longitude: value.treeCoordinates[1],
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // };
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            tracksViewChanges={tracksViewChanges}
            title={value.type}
            description={value.description}
            onPress={(e) =>
              mapRef.current.animateToCoordinate(
                {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
                300,
              )
            }
          >
            <Callout
              tooltip
              style={styles.customView}
              onPress={(e) =>
                mapRef.current.console.log()
              }
              // onPress={() => alert("TOUCH")}
            >
              <TouchableHighlight underlayColor="lightblue">
                <View {...value}>
                  <View style={styles.calloutTop}>
                    <Text numberOfLines={1} style={styles.calloutText}>
                      {value.type}
                    </Text>
                  </View>

                  <View style={styles.calloutBottom}>
                    <Text numberOfLines={5}>{value.description}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Callout>
            <Image
              onLoad={() => stopTrackingViewChanges()}
              fadeDuration={0}
              style={styles.customTree}
              source={customTree}
            />
          </Marker>
        );
      }
    });

  const MyTreesMapMarkers =
    allTrees &&
    Object.values(allTrees).map((value, index) => {
     let latitude = value.treeCoordinates[0];
     let longitude = value.treeCoordinates[1];
      if (value.userID === currentUserID) {
        let region = {
          latitude: value.treeCoordinates[0],
          longitude: value.treeCoordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={value.type}
            description={value.description}
            onPress={(e) =>
              mapRef.current.animateToCoordinate(
                {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
                300,
              )
            }
          >
            <Callout
              tooltip
              style={styles.customView}
              // onPress={() => alert("touched")}
            >
              <TouchableHighlight
                underlayColor="lightblue"
                // onPress={() => alert("touched")}
              >
                <View {...value}>
                  <View style={styles.calloutTop}>
                    <Text numberOfLines={1} style={styles.calloutText}>
                      {value.type}
                    </Text>
                  </View>

                  <View style={styles.calloutBottom}>
                    <Text numberOfLines={5}>{value.description}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Callout>

            <Image
              onLoad={() => stopTrackingViewChanges()}
              fadeDuration={0}
              style={styles.customTree}
              source={customTreeMyTree}
            />
          </Marker>
        );
      }
    });

   const renderTreesToMap = () => {
      if (filter === "All Trees"){
        return (
          <React.Fragment>
            {MyTreesMapMarkers}
            {AllTreesMapMarkers}
          </React.Fragment>
        );
      }
      if (filter === "My Trees") {
        return (
           <React.Fragment>
               {MyTreesMapMarkers}
           </React.Fragment>
        )
      }
    }

    const centerMap = () => {
      const { 
        latitude, longitude , latitudeDelta, longitudeDelta 
    } = region
        mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        },
        300,
      )
    }

    
  return (
    <View style={styles.container}>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        navigation={navigation}
      />
      <FilterDropDown filter={filter} setFilter={setFilter} />
      <CurrentLocationButton
        centerButton={() => {
          centerMap();
        }}
      />
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        title="Not sure what this does"
        description="Not sure what this does either"
        initialRegion={region}
        region={region}
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        customMapStyle={mapStyle}
        rotateEnabled={false}
        ref={mapRef}
        // onRegionChange={onRegionChange}
      >
        {renderTreesToMap()}
      </MapView>

      {currentUserID && renderAddATreeButton()}

      <DrawerHomeSwipe
        currentUserID={currentUserID}
        treeList={allTrees}
        userCoords={userCoords}
        filter={filter}
      />
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
    borderWidth: 0.5,
    borderRadius: 25,
    height: 35,
    marginLeft: "3%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    textShadowColor: "white",
    textShadowRadius: 10,
    margin: "2%",
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
    borderTopLeftRadius: 15,
  },
  customTree: {
    width: 30,
    height: 40,
  },
  customView: {
    width: 200,
    maxHeight: 150,
    backgroundColor: "#fdfcf8",
    borderWidth: 3,
    borderColor: "#692e2c",
    borderRadius: 10,
  },
  calloutText: {
    width: 200,
    fontSize: 20,
    color: "#fdfcf8",
    borderRadius: 10,
  },
  calloutTop: {
    backgroundColor: "#692e2c",
  },
});
export default MapScreen
