import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import pears from "../media/pears.jpg";
import Modal from "react-native-modal";
import firebase from "firebase";

const AddTreeScreen = () => {

  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false)
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [type, setType] = useState(null);



  const toggleTypeModal = () => {
    setIsTypeModalVisible(!isTypeModalVisible);
  };

  const toggleDescriptionModal = () => {
    setIsDescrptionModalVisible(!isDescrptionModalVisible);
  };

  const toggleLocationocationModal = () => {
    setIsLocationModalVisible(!isLocationModalVisible);
  };


console.log("TYPE OF TREE", type);


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
          onPress={() => toggleModal()}
        >
          <Text style={styles.inputButtonText}>Description of Tree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => toggleModal()}
        >
          <Text style={styles.inputButtonText}>Location of Tree</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.modalButton}>
        <Text style={styles.inputText}>Submit Tree</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isTypeModalVisible}
        setIsModalVisible={setIsTypeModalVisible}

      >
        <View style={styles.insideModalContainer}>
          <Text style={styles.modalTextSubHeader}>
            Please enter the type of tree
          </Text>

          <TextInput
            placeholder="e.x., Cherry Tree, Pear Tree"
            value={type}
            onChangeText={setType}
            style={styles.modalInput}

          />

          <TouchableOpacity style={styles.submitTreeButton}>
            <Text style={styles.submitTreeText}>Enter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => toggleTypeModal()}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerText: {
    // position: "absolute",
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
  modalTop: {
    flex: 1,
  },
  modalMiddle: {
    flex: 1,
  },
  modalBottom: {
    flex: 1,
  },
  closeModal: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    width: 80,
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#802941",
    marginTop: 20,
  },
  closeModalText: {
    alignSelf: "center",
    color: "#802941",
  },
  submitTreeButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#802941",
    height: 60,
    width: 250,
    marginTop: "2%",
    marginBottom: "1%",
    padding: 5,
    borderRadius: 3,
  },
  submitTreeText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    marginTop: 10,
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
  // insideModalContainer: {
  //   width: "90%",
  //   height: "60%",
  //   backgroundColor: "gray"
  // },
  modalInput: {
    height: 40,
    borderColor: "grey",
    borderWidth: 2,
    margin: 10,
    width: "80%",
    alignItems: "center",
    textAlign: "center",
    color: "black",
    fontSize: 15,
  },
  modalTextSubHeader:{
    fontSize: 24
  }
});

export default AddTreeScreen;
