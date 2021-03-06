import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import maroonGradient from "../assets/maroonGradient.png";
import Modal from "react-native-modal";
import firebase from "firebase";
// import { FontAwesome5 } from "@expo/vector-icons";
Geocoder.init(API_KEY);
import { API_KEY } from "../geocoder";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from './LoadingScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const AddTreeScreen = (props) => {

  let allTrees = props.route.params.allTrees;

  const navigation = useNavigation();

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }

  let treeIdentification = null;
  useEffect(() => {
    const generateTreeID = () => {
      treeIdentification = Math.random();
      setTreeID(treeIdentification);
  }
    generateTreeID()
  }, []);

  const [loadingActive, setLoadingActive] = useState(false);

  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [treeLocation, setTreeLocation] = useState(null)
  const [treeCoordinates, setTreeCoordinates] = useState(null);
  const [treeID, setTreeID] = useState(null)


  async function submit() {
    setLoadingActive(true);
    try {
      let treeCoordinates = await convertLocation(treeLocation);
      setTreeCoordinates(treeCoordinates)

      //WTF, not working!! Geocoder is giving different coords for same address...
      Object.entries(allTrees).map((value) => {
        console.log("MADE IT HERE");
        console.log("COORD of DBS", value[1].treeCoordinates);
        console.log("COOORD ENTERED TREE", treeCoordinates);
        if (value[1].treeCoordinates === treeCoordinates) {
          console.log("There is already a tree here. Please choose a different location.")
        }
      });

      setTreeID("")
      await firebase.database().ref("/tree").push({
        type,
        description,
        treeLocation,
        treeCoordinates,
        userID,
        treeID
      });
      setType(null);
      setDescription(null);
      setTreeLocation(null);
      setLoadingActive(false);
      Alert.alert("Tree Added Successfully!");
      navigation.navigate("Map");
    } catch (error) {
      Alert.alert(error.toString());
      setLoadingActive(false);
      return
    }
  };

  // "This Location didn't work for some reason. Please give it another shot.";

  async function convertLocation(location) {
    let treeCoordinates = await Geocoder.from(location)
      .then((json) => {
        console.log("Geocoder JSON object", json);
        const { lat, lng } = json.results[0].geometry.location;
        let treeCoords = [lat, lng];
        return treeCoords;
      })
      .catch((error) => {
        Alert.alert("We couldn't find your location, likely because the developer is using a simulator.")
        console.log(error.toString());
        navigation.navigate("Map")
        return;
      });
    return treeCoordinates;
  }

  const renderAddTreeScreen = () => {
    return (
      <View style={styles.container}>
        <ImageBackground source={maroonGradient} style={styles.gradientImage}>
          <Entypo
            name="tree"
            size={500}
            color="rgba(163, 119, 125, 0.5)"
            style={styles.bigTree}
          />
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <AntDesign
                name="arrowleft"
                size={30}
                color="#e1eddf"
                style={styles.backArrow}
              />
            </TouchableOpacity>
            <Text style={styles.backText}>Add a fruit tree</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.detailsHeader}>Type</Text>

            <View style={styles.iconFlex}>
              <MaterialCommunityIcons
                name="leaf"
                size={20}
                style={styles.icon}
                color="#e1eddf"
              />
              <TextInput
                multiline={true}
                placeholder={"Enter type of tree      "}
                style={styles.input}
                value={type}
                onChangeText={setType}
                // returnKeyType={"next"}
                placeholderTextColor="rgba(236, 250, 217, .3)"
                maxLength={23}
                autoFocus={true}
              />
            </View>

            <View style={styles.line} />
            <Text style={styles.detailsHeader}>Description</Text>
            <View style={styles.iconFlex}>
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                style={styles.icon}
                color="#e1eddf"
              />
              <TextInput
                multiline={true}
                placeholder={"Enter a short description"}
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                // returnKeyType={"next"}
                placeholderTextColor="rgba(236, 250, 217, .3)"
                maxLength={215}
              />
            </View>
            <View style={styles.line} />
            <Text style={styles.detailsHeader}>Location</Text>
            <View style={styles.iconFlex}>
              <MaterialIcons
                name="map"
                size={20}
                style={styles.icon}
                color="#e1eddf"
              />
              <TextInput
                multiline={true}
                placeholder={"Address / Cross Street      "}
                style={styles.input}
                value={treeLocation}
                onChangeText={setTreeLocation}
                // returnKeyType={"next"}
                placeholderTextColor="rgba(236, 250, 217, .3)"
                maxLength={100}
                autoCorrect={false}
                // underlineColorAndroid={"#e1eddf"}
              />
            </View>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => submit()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  return (
    <React.Fragment>
      {loadingActive ? <LoadingScreen /> : renderAddTreeScreen()}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(236, 250, 217, .2)",
    alignItems: "center"
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  form: {
    margin: "10%",
    zIndex: 1
  },
  submitButton: {
    zIndex: 1,
    backgroundColor: "#63020d",
    width: "50%",
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitText: {
    alignSelf: "center",
    color: "#e1eddf",
    fontSize: 18,
  },
  loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingImage: {
    width: 300,
    height: 110,
    marginBottom: 30,
  },
  bigTree: {
    position: "absolute",
    bottom: -50,
    top: 300,
    right: -60,
    zIndex: 1
  },
  backText: {
    color: "#e1eddf",
    fontSize: 25,
  },
  backArrow: {
    marginLeft: "10%"
  },
  detailsHeader: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  input: {
    // marginLeft: 22,
    height: 40,
    paddingLeft: 15,
    color: "#e1eddf",
    fontSize: 17,
  },
  iconFlex: {
    flexDirection: "row",
    marginLeft: 20
  },
  line: {
    borderBottomColor: "#e1eddf",
    borderBottomWidth: 1,
  },
  icon: {
    left: -20,
    position: "absolute",
    marginTop: 10,
    // paddingRight: 10
  }
});

export default AddTreeScreen;
