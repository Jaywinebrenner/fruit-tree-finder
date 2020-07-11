import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform
} from "react-native";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import maroonGradient from "../assets/maroonGradient.png";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


const ListItemDetailScreen = (props) => {

  console.log("Index", props.route.params.index);

  const [currentDatabase, setCurrentDatabase] = useState([]);
  const [isListDetailModalVisible, setIsListDetailModalVisible] = useState(false)
  const navigation = useNavigation();
  const [type, setType] = useState(null)

  let cardKey = props.route.params.index;
  // console.log("card key", cardKey);
  console.log("Props on list item", props)


  let cardType = props.route.params.type;
  let cardDescription = props.route.params.description
  let cardLocation = props.route.params.treeLocation;
console.log("cardLocation?", props.route.params);
  let currentUserID = null;


  if (firebase.auth().currentUser) {
    currentUserID = firebase.auth().currentUser.uid;
  }

  useEffect(() => {
    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        let database = snapshot.val();
        database !== null && setCurrentDatabase(database);
      });
    }
    const setInitialState = () => {
      setType(cardType)
    }

    setInitialState()
    fetchData();
  }, []);


  if (!currentDatabase) {
    console.log("I DONT EXIST");
  }
  // if (currentDatabase) {
  //   console.log("I EXIST");
  //   Object.values(currentDatabase).forEach((value) => {
  //     console.log("Value USER ID on DETAILS", value.userID);
  //   });
  // }

  const areYouSure = () => {
    Alert.alert("Warning!", "Are you sure you want to delete this tree???", [
      {
        text: "NO",
        onPress: () => console.warn("NO Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => deleteTree(firebaseUniqueKey) },
    ]);
  };

  const deleteTree = (firebaseUniqueKey) => {
    console.log("KEY NUMBER in DELTE FUNCTION?", firebaseUniqueKey);
    firebase.database().ref(`/tree/${firebaseUniqueKey}`).remove();
    navigation.navigate("ListScreen");
  };

  let firebaseUniqueKey = null;
  const findFirebaseUniqueKeyToDelete = (cardKeyNumber) => {
    firebaseUniqueKey = Object.keys(currentDatabase)[cardKeyNumber];
  };
  findFirebaseUniqueKeyToDelete(cardKey);

  const renderDeleteButton =
    currentDatabase &&
    <View onPress={() => areYouSure()}>
      <AntDesign
        style={styles.deleteIcon}
        name="delete"
        size={30}
        color="white"
        onPress={() => areYouSure()}
      />
    </View>

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
          <TouchableOpacity onPress={() => navigation.navigate("ListScreen")}>
            <AntDesign
              name="arrowleft"
              size={30}
              color="#e1eddf"
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Tree Details</Text>
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
            <Text style={styles.state}>{cardType}</Text>
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
            <Text style={styles.descriptionState}>{cardDescription}</Text>
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

            <Text style={styles.locationState}>{cardLocation}</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.iconWrapper}>
          {props.route.params.userID === currentUserID && renderDeleteButton}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(236, 250, 217, .2)",
    zIndex: 2,
  },
  backText: {
    color: "#e1eddf",
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
    margin: "auto",
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  form: {
    margin: "10%",
    zIndex: 1,
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
    // zIndex: 1,
  },
  // backArrow: {
  //   position: "absolute",
  //   right: 85,
  //   top: -15
  //   // marginLeft: "10%",
  // },
  backArrow: {
    marginLeft: "10%",
  },
  detailsHeader: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4",
  },
  input: {
    height: 40,
    paddingLeft: 5,
    color: "#e1eddf",
    fontSize: 17,
  },
  iconFlex: {
    flexDirection: "row",
  },
  line: {
    borderBottomColor: "#e1eddf",
    borderBottomWidth: 1,
  },
  icon: {
    marginTop: 10,
  },
  state: {
    color: "white",
    fontSize: 22,
    paddingLeft: 12,
  },
  descriptionState: {
    color: "white",
    fontSize: 16,
    paddingLeft: 12,
    paddingBottom: 3,
  },
  locationState: {
    color: "white",
    fontSize: 16,
    paddingLeft: 12,
    marginBottom: 0,
  },
  iconWrapper: {
    ...Platform.select({
      ios: {
        marginTop: 140,
        alignSelf: "center",
      },
      android: {
        marginTop: 200,
        alignSelf: "center",
      },
    }),
  },
});

export default ListItemDetailScreen;
