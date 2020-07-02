
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import Modal from "react-native-modal";

const TypeModal = ({    
    firebaseUniqueKey,
    type,
    setType,
    toggleTypeModal,
    isTypeModalVisible,
    closeTypeModal,
    submitType}) => {
  
    return (
      <Modal isVisible={isTypeModalVisible}>
        <TouchableWithoutFeedback>
          <View style={styles.insideModalContainer}>
            <Text style={styles.modalTextSubHeader}>
              Please enter the type of tree
            </Text>

            <TextInput
              placeholder="e.x., Cherry Tree, Pear Tree"
              autoFocus={true}
              value={type}
              onChangeText={setType}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.submitTreeButton}
              onPress={() => submitType()}
            >
              <Text style={styles.submitTreeText}>Enter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => closeTypeModal()}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
    };

const styles = StyleSheet.create({

insideModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
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
    marginTop: 50,
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
    backgroundColor: "white",
},
modalTextSubHeader: {
    fontSize: 24,
    marginTop: 60,
    marginBottom: 50
},
});

 export default TypeModal;