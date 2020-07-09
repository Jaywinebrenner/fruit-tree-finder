import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { TREES } from "../constants/Markers";
import { Navigation } from "react-native-navigation";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const ListDetailModal = (

  {
    type,
    value,
    isListDetailModalVisible,
    toggleListDetailModal,
    setIsListDetailModalVisible,
  }, props
) => {
  const [currentDatabase, setCurrentDatabase] = useState([]);

// console.log("TYPE ON MODAL", type);


  const navigation = useNavigation();

//  console.log("VALUE  FROM PROPS", value);
 
  

  // let cardType = props.route.params.type;
  // let cardDescription = props.route.params.description;
  // let cardLocation = props.route.params.treeLocationTest.replace("null", "");

  // console.log("PARAM TEST", props.route.params);

  console.log("isListDetailModalVisible on MODAL", isListDetailModalVisible);

  let authUserID = null;
  if (firebase.auth().currentUser) {
    authUserID = firebase.auth().currentUser.uid;
  }

  useEffect(() => {
    // Pulling down database
    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        // console.log("snapshot val", snapshot.val());
        let database = snapshot.val();
        setCurrentDatabase(database);
      });
    }

    fetchData();
  }, []);


  if (!currentDatabase) {
    console.log("I DONT EXIST");
  }
  // if (currentDatabase) {
  //   console.log("I EXIST");
  //   Object.values(currentDatabase).forEach((item) => {
  //     console.log("Item . USER ID", item.userID);
  //   });
  // }



  return (
    <Modal isVisible={isListDetailModalVisible}>
      <View style={styles.insideModalContainer}>
        <Text style={styles.header}>Tree Details</Text>
        <View style={styles.top}>
          <Text style={styles.titleText}>{value.type}</Text>
        <Text>{value.treeLocationTest}</Text>
          <Text style={styles.distanceText}>65 Meters away</Text>
        </View>

        <View style={styles.middle}>
          {/* <Text style={styles.descriptionText}>{cardDescription}</Text> */}
          <Text>{value.description}</Text>
        </View>

        <View style={styles.bottom}>
          {/* <TouchableOpacity
            style={styles.detailsButtonWrapper}
            onPress={() => navigation.navigate("ListScreen")}
          >
            <Text style={styles.detailsButtonText}>Back to Tree List</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.closeModal}
               onPress={() => toggleListDetailModal()
                    }>
            <Text style={styles.closeModalText}>Back to Tree List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 170,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    color: "red",
    // backgroundColor: "#eaeaea",
    borderWidth: 1,
    borderRadius: 20,
    // shadowColor: "black",
    // elevation: 5,
    // shadowRadius: 2,
    // shadowOpacity: 0.6,
  },
  insideModalContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  header: {
    fontSize: 30
  },
  top: {
    flex: 0.25,
  },
  middle: {
    marginTop: 10,
    flex: 0.5,
  },
  bottom: {
    flex: 0.25,
  },
  detailsButtonWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
  },
  titleText: {
    alignSelf: "center",
    fontSize: 22,
  },
  distanceText: {
    alignSelf: "center",
    fontSize: 15,
  },
});

export default ListDetailModal;
