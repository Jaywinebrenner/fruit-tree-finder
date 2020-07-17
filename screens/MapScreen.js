import React from "react";
import { StyleSheet, Text, View, Alert, ImageBackground, TextInput, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Search from "../components/Search";
import DrawerHomeSwipe from "./DrawerHomeSwipe";
import FilterDropDown from "../components/FilterDropDown";
import customTree from "../media/customTree.png";
import customTreeMyTree from "../media/customTreeMyTree.png";
import customTreeVerified from "../media/customTreeVerified.png";



const MapScreen = ({navigation}) => {

  const [region, setRegion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allTrees, setAllTrees] = useState([]);
  const [filter, setFilter] = useState("All Trees");
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const [userCoords, setUserCoords] = useState(null);


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
        // console.log("snapshot val", snapshot.val());
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
            //  onPress={() =>
            //             navigation.navigate("ListItemDetailScreen", {
            //               index,
            //               ...value,
            //             })
            //           }

  const renderAddATreeButton = () => {
    return (
      <TouchableOpacity style={styles.addTreeButton} onPress={() => navigation.navigate("AddTreeScreen")}>
        <Entypo name="plus" size={18} color="black" />
        <Text style={styles.buttonText}>Add a tree</Text>
      </TouchableOpacity>
    )
  }

  function stopTrackingViewChanges() {
    if (tracksViewChanges) {
      setTracksViewChanges(false);
    }
  }

  const AllTreesMapMarkers =
    allTrees &&
    Object.values(allTrees).map((tree, index) => {
      let latitude = tree.treeCoordinates[0];
      let longitude = tree.treeCoordinates[1];
      if (tree.userID !== currentUserID) {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            tracksViewChanges={tracksViewChanges}
            title={tree.type}
            description={tree.description}
          >
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
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={value.type}
            description={value.description}
          >
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

  return (
    <View style={styles.container}>
      <Search navigation={navigation} />
      <FilterDropDown filter={filter} setFilter={setFilter} />
      <CurrentLocationButton
        cb={() => {
          centerMap();
        }}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        title="Not sure what this does"
        description="Not sure what this does either"
        initialRegion={region}
        style={styles.map}
        showUserLocation={true}
        showsCompass={true}
        customMapStyle={mapStyle}
        rotateEnabled={false}
      >
       { renderTreesToMap() }
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
  },
  customTree: {
    width: 30,
    height: 40,
  }
});
export default MapScreen
