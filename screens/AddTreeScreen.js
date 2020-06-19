import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import pears from "../media/pears.jpg";
import Modal from "react-native-modal";
import firebase from "firebase";

const AddTreeScreen = () => {

  const [isModalVisible, setIsModalVisible] = useState(false)

  const fakeSignOut = () => {
      try {
        firebase.auth().signOut();
      } catch (error) {}
      return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground source={pears} style={styles.pearsImage}>
          <Text style={styles.headerText}>
            Promote food justice. Prevent food waste. Strengthen our community.
          </Text>
        </ImageBackground>
      </View>

      <View>
        <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        </Modal>
          <View style={styles.modalButton}>
            <TouchableOpacity
              style={styles.openSettingsButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.inputText}>Input a Tree</Text>
            </TouchableOpacity>
          </View>
      </View>
      <Text style={styles.fake} onPress={()=> fakeSignOut()}>FAKE SIGN OUT</Text>

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
    textAlign: "center",
  },
  pearsImage: {
    width: "110%",
    flex: 0.6,
    resizeMode: "cover",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
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
  fake: {
    fontSize: 30
  }
});

export default AddTreeScreen;
