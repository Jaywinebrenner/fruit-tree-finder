import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import pears from "../media/pears.jpg";
import greenGradient3 from "../assets/greenGradient3.png";
import Modal from "react-native-modal";
import firebase from "firebase";
import TypeModal from "../components/TypeModal";
import DescriptionModal from "../components/DescriptionModal";
import TreeLocationModal from "../components/TreeLocationModal";
import { FontAwesome5 } from "@expo/vector-icons";
Geocoder.init(API_KEY);
import { API_KEY } from "../geocoder";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from './LoadingScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
// import { navigate } from "@react-navigation/routers/lib/typescript/src/CommonActions";


const AddTreeScreen = () => {

  const navigation = useNavigation();

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }

  const [loadingActive, setLoadingActive] = useState(false);

  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [treeLocationTest, setTreeLocation] = useState(null)
  const [treeCoordinates, setTreeCoordinates] = useState(null);

  async function submit() {
    setLoadingActive(true);
    try {
      let treeCoordinates = await convertLocation(treeLocationTest);
      setTreeCoordinates(treeCoordinates)
      await firebase.database().ref("/tree").push({
        type,
        description,
        treeLocationTest,
        treeCoordinates,
        userID,
      });
      setType(null);
      setDescription(null);
      setTreeLocation(null);
      setLoadingActive(false);
      Alert.alert("Tree Added Successfully!");
    } catch (error) {
      Alert.alert("This Location didn't work for some reason. Please give it another shot.");
      setLoadingActive(false);
      return
    }
  };

  async function convertLocation(location) {
    let treeCoordinates = await Geocoder.from(location)
      .then((json) => {
        const { lat, lng } = json.results[0].geometry.location;
        let treeCoords = [lat, lng];
        return treeCoords;
      })
      .catch((error) => {
        Alert.alert("We couldn't find your location, likely because the developer is using a simulator.")
        console.log(error.toString());
        navigation.navigate("Add a tree")
        return;
      });
    return treeCoordinates;
  }

  const createAddressObject = (location) => {

    let properlyFormatedAddress =
      location.address +
      " " +
      location.city +
      " " +
      location.state +
      " " +
      location.zipCode;
    console.log("PROPERLY FORMATED ADDRESS", properlyFormatedAddress);

    setTreeLocation(properlyFormatedAddress)
    setIsLocationModalVisible(false)
  }

  const renderAddTreeScreen = () => {
    return (
      <View style={styles.container}>
        <ImageBackground source={greenGradient3} style={styles.gradientImage}>
          <Entypo name="tree" size={500} color="#82d60d" style={styles.bigTree}/>
          <View style={styles.top}>
            <TouchableOpacity onPress={()=> navigation.navigate("Map")}>
              <AntDesign name="arrowleft" size={35} color="#e1eddf" style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={styles.backText}>Add a fruit tree</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.detailsHeader}>Type</Text>
            <TextInput
              placeholder={"Enter the type of tree!"}
              style={styles.input}
              value={type}
              onChangeText={setType}
              returnKeyType={"next"}
              autoFocus={true}
              underlineColorAndroid={"#e1eddf"}
            />
            <Text style={styles.detailsHeader}>Description</Text>
            <TextInput
              placeholder={"Enter a short description"}
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              returnKeyType={"next"}
              underlineColorAndroid={"#e1eddf"}
            />
            <Text style={styles.detailsHeader}>Location</Text>
            <TextInput
              placeholder={"Enter the location of the tree"}
              style={styles.input}
              value={treeLocationTest}
              onChangeText={setTreeLocation}
              returnKeyType={"next"}
              underlineColorAndroid={"#e1eddf"}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={() => submit()}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  }

  return (
    <React.Fragment>
      {loadingActive ? <LoadingScreen /> : renderAddTreeScreen()}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 25,
    paddingBottom:10,
    flexDirection: "row",
    backgroundColor: "rgba(236, 250, 217, .2)"
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  form: {
    margin: "10%",
    zIndex: 1
  },
  submitButton: {
    zIndex: 1,
    backgroundColor: "green",
    width: "40%",
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitText: {
    alignSelf: "center",
    color: "#e1eddf",
    fontSize: 18,
  },
  treeIcon: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingRight: 30,
  },
  loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingImage: {
    width: 300,
    height: 110,
    marginBottom: 30,
  },
  bigTree: {
    position: "absolute",
    top: 300,
    left: 80,
    zIndex: 1
  },
  backText: {
    color: "#e1eddf",
    fontSize: 25,
  },
  backArrow: {
    marginLeft: "10%"
  },
  detailsHeader: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  input: {
    height: 40,
    paddingLeft: 5,
    paddingBottom: 15,
    marginBottom: 10,
    color: "#e1eddf",
    fontSize: 17,
  },
});

export default AddTreeScreen;
