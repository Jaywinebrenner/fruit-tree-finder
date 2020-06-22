import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import pears from "../media/pears.jpg";
import Modal from "react-native-modal";
import firebase from "firebase";
import {TypeModal} from "../components/TypeModal";
import { DescriptionModal } from "../components/DescriptionModal";
import { LocationModal } from "../components/LocationModal";

const AddTreeScreen = () => {

  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false)
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(
    false,
  );
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);

  const toggleTypeModal = () => {
    setIsTypeModalVisible(!isTypeModalVisible);
  };

  const toggleDescriptionModal = () => {
    setIsDescriptionModalVisible(!isDescriptionModalVisible);
  };

  const toggleLocationModal = () => {
    setIsLocationModalVisible(!isLocationModalVisible);
  };

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
          <Text style={styles.inputButtonText}>Type of Tree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleDescriptionModal()}
        >
          <Text style={styles.inputButtonText}>Description of Tree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleLocationModal()}
        >
          <Text style={styles.inputButtonText}>Location of Tree</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.modalButton}>
        <Text style={styles.inputText}>Submit Tree</Text>
      </TouchableOpacity>

      <TypeModal
        isTypeModalVisible={isTypeModalVisible}
        setIsModalVisible={setIsTypeModalVisible}
        type={type}
        setType={setType}
        toggleTypeModal={toggleTypeModal}
      />

      <DescriptionModal
        description={description}
        setDescription={setDescription}
        toggleDescriptionModal={toggleDescriptionModal}
        isDescriptionModalVisible={isDescriptionModalVisible}
      />

      <LocationModal 
      location={location} 
      setLocation={setLocation} 
      toggleLocationModal={toggleLocationModal} setIsLocationModalVisible={setIsLocationModalVisible}
      isLocationModalVisible={isLocationModalVisible} />

    </View>
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
    marginTop: 30,
  },
  inputButtonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
});

export default AddTreeScreen;
