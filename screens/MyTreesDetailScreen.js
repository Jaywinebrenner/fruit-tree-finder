import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { TREES } from "../constants/Markers";
import { Navigation } from "react-native-navigation";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const MyTreesDetailScreen = (props) => {
  const [currentDatabase, setCurrentDatabase] = useState([]);
  const navigation = useNavigation();

  let cardType = props.route.params.type;
  let cardDescription = props.route.params.description;
  let cardLocation = props.route.params.treeLocationTest.replace("null", "");
  let cardKey = props.route.params.key
  console.log("card key", cardKey);

  let authUserID = null;
  if (firebase.auth().currentUser) {
    authUserID = firebase.auth().currentUser.uid;
  }

  useEffect(() => {
    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        let database = snapshot.val();
        setCurrentDatabase(database);
      });
    }
    fetchData();
  }, []);

  if (!currentDatabase) {
    console.log("I DONT EXIST");
  }
  if (currentDatabase) {
    console.log("I EXIST");
    Object.values(currentDatabase).forEach((value) => {
      // console.log("Value", value.userID);
    });
  }

  const deleteTree = (firebaseUniqueKey) => {
    console.log("KEY NUMBER in DELTE FUNCTION?", firebaseUniqueKey);
    firebase.database().ref(`/tree/${firebaseUniqueKey}`).remove();
    navigation.navigate("My Trees");
    // firebase.database().ref(`/tree/1`).remove();
  };

  let firebaseUniqueKey = null;
  const findFirebaseUniqueKeyToDelete = (cardKeyNumber) => {
    firebaseUniqueKey = Object.keys(currentDatabase)[cardKeyNumber]
  }

  findFirebaseUniqueKeyToDelete(cardKey)
  console.log("FIREBASE UNIQUE KEY OF THIS CARD", firebaseUniqueKey);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.titleText}>{cardType}</Text>
        <Text>{cardLocation}</Text>
        <Text style={styles.distanceText}>65 Meters away</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.descriptionText}>{cardDescription}</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.detailsButtonWrapper}
          onPress={() => navigation.navigate("My Trees")}
        >
          <Text style={styles.detailsButtonText}>Back to Tree List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButtonWrapper}
          onPress={() => navigation.navigate("Edit My Tree")}
        >
          <Text style={styles.detailsButtonText}>Edit Your Tree</Text>
        </TouchableOpacity>
      </View>

      <AntDesign
        name="delete"
        size={24}
        color="black"
        onPress={() => deleteTree(firebaseUniqueKey)}
      />
    </View>
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

export default MyTreesDetailScreen;
