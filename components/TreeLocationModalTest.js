import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { Formik } from "formik";

export const TreeLocationModalTest = ({
  setAddress,
  setCity,
  setState,
  setZipCode,
  treeLocation,
  setTreeLocation,
  toggleLocationModal,
  setIsLocationModalVisible,
  isLocationModalVisible,
  closeLocationModal,
}) => {
  return (
    <Modal isVisible={isLocationModalVisible}>
      <View style={styles.insideDescriptionModalContainer}>
        <ScrollView style={styles.scrollView}>
          <Formik
            initialValues={{
              address: "",
              city: "",
              state: "",
              zipCode: "",
            }}
            onSubmit={(values) => {
              console.log("Form Values", values);
            }}
          >
            {(formikProps) => (
              <View style={styles.insideModalContainer}>
                <Text style={styles.modalDescriptionTextSubHeader}>
                  Please enter the address of the tree
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  onChangeText={formikProps.handleChange("address")}
                  value={formikProps.values.address}
                />
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  onChangeText={formikProps.handleChange("city")}
                  value={formikProps.values.city}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  onChangeText={formikProps.handleChange("state")}
                  value={formikProps.values.state}
                />
                <TextInput
                keyboardType="numeric"
                  style={styles.input}
                  placeholder="Zip Code"
                  onChangeText={formikProps.handleChange("zipCode")}
                  value={formikProps.values.zipCode}
                />

                <TouchableOpacity
                  style={styles.submitLocationButtonWrapper}
                  onPress={formikProps.handleSubmit}
                >
                  <Text style={styles.submitLocationButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => closeLocationModal()}
          >
            <Text style={styles.closeModalText}>Cancel</Text>
          </TouchableOpacity>

          {/* <Text style={styles.modalDescriptionTextSubHeader}>
          Please enter the address of the tree
        </Text>

        <TextInput
          placeholder="City, State"
          autoFocus={true}
          avoidKeyboard
          value={treeLocation}
          onChangeText={setTreeLocation}
          style={styles.addressModalInput}
        />

        <TouchableOpacity
          style={styles.submitTreeButton}
          onPress={() => toggleLocationModal()}
        >
          <Text style={styles.submitTreeText}>Enter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeModal}
          onPress={() => closeLocationModal()}
        >
          <Text style={styles.closeModalText}>Cancel</Text>
        </TouchableOpacity> */}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  insideModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    width: 250,
    height: 40,
    marginBottom: 8,
    backgroundColor: "white",
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
    marginBottom: 300,
  },
  closeModalText: {
    alignSelf: "center",
    color: "#802941",
  },
  submitLocationButtonWrapper: {
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
  submitLocationButtonText: {
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
  locationSubmitButtonWrapper: {},
  locationSubmitButtonText: {},
});
