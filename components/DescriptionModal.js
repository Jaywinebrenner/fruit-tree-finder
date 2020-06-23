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

export const DescriptionModal = ({
         description,
         setDescription,
         toggleDescriptionModal,
         setIsDescriptionModalVisible,
         isDescriptionModalVisible,
         closeDescriptionModal
       }) => {
         return (
           <Modal
             isVisible={isDescriptionModalVisible}
           >
             <View style={styles.insideDescriptionModalContainer}>
               <Text style={styles.modalDescriptionTextSubHeader}>
                 Please add a description
               </Text>

               <TextInput
                 placeholder="e.x., Unmaintained large tree. Overhang on public property with hundreds if not thousands of Cherries going to waste every year."
                 autoFocus={true}
                 avoidKeyboard
                 multiline={true}
                 value={description}
                 onChangeText={setDescription}
                 style={styles.descriptionModalInput}
               />

               <TouchableOpacity
                 style={styles.submitTreeButton}
                 onPress={toggleDescriptionModal}
               >
                 <Text style={styles.submitTreeText}>Enter</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={styles.closeModal}
                 onPress={() => closeDescriptionModal()}
               >
                 <Text style={styles.closeModalText}>Cancel</Text>
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
  descriptionModalInput: {
    height: 150,
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
    submitTreeText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
});