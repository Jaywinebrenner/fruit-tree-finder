import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";

export const LocationModal = ({
         location,
         setLocation,
         toggleLocationModal,
         setIsLocationModalVisible,
         isLocationModalVisible,
       }) => {
         return (
           <Modal
             isVisible={isLocationModalVisible}
           >
             <View style={styles.insideDescriptionModalContainer}>
               <Text style={styles.modalDescriptionTextSubHeader}>
                 Please enter the address of the tree
               </Text>

               <TextInput
                 placeholder="1234 Apple Avenue"
                 autoFocus={true}
                 avoidKeyboard
                 value={location}
                 onChangeText={setLocation}
                 style={styles.addressModalInput}
               />

               <TouchableOpacity
                 style={styles.submitTreeButton}
                 onPress={() => toggleLocationModal}
               >
                 <Text style={styles.submitTreeText}>Enter</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={styles.closeModal}
                 onPress={() => toggleLocationModal()}
               >
                 <Text style={styles.closeModalText}>Close</Text>
               </TouchableOpacity>
             </View>
           </Modal>
         );
       };


const styles = StyleSheet.create({

  insideModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
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
  insideDescriptionModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    marginTop: 50,
  },
  modalDescriptionTextSubHeader: {
    fontSize: 24,
    marginTop: 5,
  },
  addressModalInput: {
    height: 50,
    borderColor: "grey",
    borderWidth: 2,
    margin: 10,
    width: "80%",
    alignItems: "center",
    textAlign: "center",
    color: "black",
    fontSize: 15,
    backgroundColor: "white",
  },
});