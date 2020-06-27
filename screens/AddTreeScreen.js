import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import pears from "../media/pears.jpg";
import Modal from "react-native-modal";
import firebase from "firebase";
import {TypeModal} from "../components/TypeModal";
import { DescriptionModal } from "../components/DescriptionModal";
import { TreeLocationModalTest } from "../components/TreeLocationModalTest";
import { FontAwesome5 } from "@expo/vector-icons";
Geocoder.init(API_KEY);
import { API_KEY } from "../geocoder";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from './LoadingScreen';

const AddTreeScreen = () => {

  const navigation = useNavigation();

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }

  const [loadingActive, setLoadingActive] = useState(false);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false)
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(
    false,
  );
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [treeLocationTest, setTreeLocationTest] = useState(null)
  const [treeCoordinates, setTreeCoordinates] = useState(null);

  const toggleTypeModal = () => {
    setIsTypeModalVisible(!isTypeModalVisible);
  };

  const toggleDescriptionModal = () => {
    setIsDescriptionModalVisible(!isDescriptionModalVisible);
  };

  const toggleLocationModal = () => {
    setIsLocationModalVisible(!isLocationModalVisible);
  };
  

  const submitType = () => {
      if (type === null) {
        Alert.alert("Please fill in the type of tree");
        return
      } else {
        toggleTypeModal()
      }
  }

  const closeTypeModal = () => {
    toggleTypeModal()
    setType(null)
  }

  const submitDescription = () => {
    if (description === null) {
      Alert.alert("Please fill in the description of the tree");
      return;
    } else {
      toggleDescriptionModal();
    }
  };

  const closeDescriptionModal = () => {
    toggleDescriptionModal();
    setDescription(null);
  };


  const closeLocationModal = () => {
    toggleLocationModal();
    setTreeLocationTest(null);
  };

  const renderSubmitButton = () => {
    if (type && description && treeLocationTest) {
      return (
      
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => submit()}
        >
          <View style={styles.submitButtonTextWrapper}>
            <Text style={styles.submitButtonText}>Submit Tree</Text>
          </View>

          <View style={styles.submitButtonTreeIconWrapper}>
            <FontAwesome5
              style={styles.treeIcon}
              name="tree"
              size={32}
              color="white"
            />
          </View>

        </TouchableOpacity>
      );
    }
  }
  // console.log("TREE COORINATES", treeCoordinates);

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
      setTreeLocationTest(null);
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
    //  console.log("TREE COORDS", treeCoords);
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
    console.log("LOCATION PASSED INTO CREATE OBJECT", location);
    console.log("location Address", location.address);
    
    let properlyFormatedAddress =
      location.address +
      " " +
      location.city +
      " " +
      location.state +
      " " +
      location.zipCode;
    console.log("PROPERLY FORMATED ADDRESS", properlyFormatedAddress);
    
    setTreeLocationTest(properlyFormatedAddress)
    console.log("TREE LOCATION TEST", treeLocationTest);
    setIsLocationModalVisible(false)
  }


  const renderAddTreeScreen = () => {
    return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground source={pears} style={styles.pearsImage}>
          <Text style={styles.headerText}>Add a fruit tree</Text>
        </ImageBackground>
      </View>

      <View style={styles.middle}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleTypeModal()}
        >
          <Text style={styles.inputButtonText}>
            {type ? type : "Type of Tree"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleDescriptionModal()}
        >
          <Text style={styles.inputButtonText}>
            {description ? " Description Set" : "Description of Tree"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleLocationModal()}
        >
          <Text style={styles.inputButtonText}>Location of Tree</Text>
        </TouchableOpacity>
      </View>

      {renderSubmitButton()}

      <TypeModal
        submitType={submitType}
        isTypeModalVisible={isTypeModalVisible}
        setIsModalVisible={setIsTypeModalVisible}
        type={type}
        setType={setType}
        toggleTypeModal={toggleTypeModal}
        closeTypeModal={closeTypeModal}
      />

      <DescriptionModal
        submitDescription={submitDescription}
        description={description}
        setDescription={setDescription}
        toggleDescriptionModal={toggleDescriptionModal}
        isDescriptionModalVisible={isDescriptionModalVisible}
        closeDescriptionModal={closeDescriptionModal}
      />

      <TreeLocationModalTest
        createAddressObject={createAddressObject}
        setTreeLocationTest={setTreeLocationTest}
        toggleLocationModal={toggleLocationModal}
        setIsLocationModalVisible={setIsLocationModalVisible}
        isLocationModalVisible={isLocationModalVisible}
        closeLocationModal={closeLocationModal}
      />
    </View>
    )
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
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#f9fcfb",
  },
  top: {
    position: "absolute",
    top: 0,
    height: 550,
    textAlign: "center",
  },
  pearsImage: {
    height: "40%",
    width: "125%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "white",
    marginBottom: 120,
    alignSelf: "center",
    marginRight: 80,
    color: "#FFFFFF",
    paddingLeft: 20,
    paddingRight: 30,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  modalButton: {
    width: 100,
    height: 50,
    backgroundColor: "#184d47",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "white",
    shadowColor: "black",
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.6,
  },
  inputText: {
    color: "white",
  },
  insideModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    flex: 1,
    marginTop: 70,
  },
  inputButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#802941",
    height: 60,
    width: 250,
    shadowColor: "black",
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    padding: 5,
    borderRadius: 3,
    marginTop: 50,
  },
  inputButtonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  submitButton: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#184d47",
    // height: 20,
    width: 250,
    shadowColor: "black",
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    padding: 5,
    borderRadius: 3,
    marginTop: 290,
    marginBottom: 50,
  },
  submitButtonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 30,
  },
  treeIcon: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingRight: 30
  },
  // submitButtonWrapper: {
  //   flex: 1,
  //   flexDirection: "row"
  // },
  submitButtonTextWrapper: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  submitButtonTreeIconWrapper: {
    flex: 0.25,
  },
    loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingImage: {
    width: 300,
    height: 110,
    marginBottom: 30
  },
});

export default AddTreeScreen;
