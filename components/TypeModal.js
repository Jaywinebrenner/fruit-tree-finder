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

export const TypeModal = ({
    type,
    setType,
    toggleTypeModal,
    setIsModalVisible,
    isTypeModalVisible,
}) => {
    return (
    <Modal
        isVisible={isTypeModalVisible}
    >
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
            onPress={toggleTypeModal}
        >
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
},
});



// console.log("TYPE MODAL VISIBLE??", isTypeModalVisible);
