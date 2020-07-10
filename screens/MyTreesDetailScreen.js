import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import EditTypeModal from '../components/editModals/EditTypeModal'

const MyTreesDetailScreen = (props) => {
  const [currentDatabase, setCurrentDatabase] = useState([]);
  const navigation = useNavigation();

  let cardType = props.route.params.type;
  let cardDescription = props.route.params.description;
  let cardLocation = props.route.params.treeLocation.replace("null", "");
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
        console.log("DATABASW SNAP SHOT", database);
        database !== null && setCurrentDatabase(database);
      });
    }
    const setInitialState = () => {
      setType(cardType)
    }

    setInitialState()
    fetchData();
  }, []);

  !currentDatabase && console.log("I DONT EXIST");

  //MODALS
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [type, setType] = useState(null);
  const toggleTypeModal = () => {
    setIsTypeModalVisible(!isTypeModalVisible);
  };

  // async function submitEditType(firebaseUniqueKey) {
  // // console.log("UNIQUE KEY", firebaseUniqueKey);
  // // console.log("TYPE", type);
  //   if (type === null) {
  //     Alert.alert("Please fill in the type of tree");
  //     return;
  //   } else {
  //     console.log("TYPE", type);
  //     toggleTypeModal()
  //      await firebase.database().ref(`/tree/${firebaseUniqueKey}`).update({type});
  
  //   }
  // };
 
  const closeTypeModal = () => {
    toggleTypeModal()
    setType(null)
  }

  const areYouSure = () => {
        Alert.alert(
          "Warning!",
          "Are you sure you want to delete this tree???",
          [
            {
              text: "NO",
              onPress: () => console.warn("NO Pressed"),
              style: "cancel",
            },
            { text: "YES", onPress: () => deleteTree(firebaseUniqueKey) },
          ],
        );
  } 
  
  const deleteTree = (firebaseUniqueKey) => {
    console.log("KEY NUMBER in DELTE FUNCTION?", firebaseUniqueKey);
    firebase.database().ref(`/tree/${firebaseUniqueKey}`).remove();
    navigation.navigate("My Trees");
  };

  let firebaseUniqueKey = null;
  const findFirebaseUniqueKeyToDelete = (cardKeyNumber) => {
    firebaseUniqueKey = Object.keys(currentDatabase)[cardKeyNumber]
  }
  findFirebaseUniqueKeyToDelete(cardKey)
 

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.editStateButton}
          onPress={() => toggleTypeModal()}
        >
          <Text style={styles.titleText}>{cardType}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editStateButton}>
          <Text style={styles.subheaderText}>{cardLocation}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editStateButton}>
          <Text style={styles.subheaderText}>65 Meters away</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <TouchableOpacity style={styles.descriptionEditStateButton}>
          <Text style={styles.titleText}> Tree Description:</Text>
          <Text style={styles.descriptionSubheaderText}>{cardDescription}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.detailsButtonWrapper}
          onPress={() => navigation.navigate("My Trees")}
        >
          <Text style={styles.detailsButtonText}>Back to Tree List</Text>
        </TouchableOpacity>
      </View>

      <AntDesign
        name="delete"
        size={24}
        color="black"
        onPress={() => areYouSure()}
      />

      <EditTypeModal
        firebaseUniqueKey={firebaseUniqueKey}
        // submitEditType={submitEditType}
        isTypeModalVisible={isTypeModalVisible}
        setIsModalVisible={setIsTypeModalVisible}
        type={type}
        setType={setType}
        toggleTypeModal={toggleTypeModal}
        closeTypeModal={closeTypeModal}
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
    marginTop: 32,
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
  subheaderText: {
    alignSelf: "center",
    fontSize: 15,
  },
  editStateButton: {
    padding: 2,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  descriptionEditStateButton: {
    padding: 2,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  descriptionSubheaderText: {
    textAlign: "center"

  }
});

export default MyTreesDetailScreen;
