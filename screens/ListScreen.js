import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import ViewMapButton from "../components/ViewMapButton"
import ListItemDetailScreen from "./ListItemDetailScreen";
import { TREES } from "../constants/Markers";
import firebase from "firebase";
import { Ionicons, createIconSetFromFontello } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import ListDetailModal from './ListDetailModal'

const ListScreen = () => {


  const navigation = useNavigation();
  const toggleToMapView = () => {
    navigation.navigate("Map");
  };

  const [currentDatabase, setCurrentDatabase] = useState(null);
  // const [isListDetailModalVisible, setIsListDetailModalVisible] = useState(
  //   false,
  // );


  useEffect(() => {
    // Pulling down database
    let result = firebase.database().ref("/tree");
    result.on("value", (snapshot) => {
      console.log("snapshot val", snapshot.val());
      let database = snapshot.val();
      setCurrentDatabase(database);
    });
  }, []);

  if (!currentDatabase) {
    console.log("I DONT EXIST");
  }
  // if (currentDatabase) {
  //   console.log("I EXIST");
  //   Object.values(currentDatabase).forEach((value) => {
  //     console.log("Value LIST", value.type);
  //   });
  // }


 // In case we try the modal approach again
  // const toggleListDetailModal = () => {
  //   setIsListDetailModalVisible(!isListDetailModalVisible);
  // };

  return (
    <React.Fragment>
      <View style={styles.top}>
        <Text style={styles.headerText}>Fruit Trees in your area </Text>
      </View>

      <TouchableOpacity
        style={styles.toggle}
        onPress={() => navigation.navigate(alert("huh?"))}
      >
        <Ionicons name="ios-arrow-forward" size={60} color="white" />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.toggle}>
        <Ionicons
          onPress={() => alert("fart")}
          name="ios-arrow-back"
          size={60}
          color="white"
        />
      </TouchableOpacity> */}

      <ViewMapButton toggleToMapView={toggleToMapView} />
      <ScrollView style={styles.container}>
        {currentDatabase &&
          Object.values(currentDatabase).map((value, index) => {
            return (
              <View style={styles.cardContainer} key={index}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitleText}>{value.type}</Text>
                  <Text style={styles.cardDistanceText}>65 Meters away</Text>
                </View>

                <View style={styles.cardMiddle}>
                  <Text style={styles.cardDescriptionText}>
                    {value.description}
                  </Text>
                </View>

                <View style={styles.bottom}>
                  <TouchableOpacity
                    style={styles.cardDetailsButtonWrapper}
                    onPress={() =>
                      navigation.navigate("ListItemDetailScreen", { ...value })
                    }
                    // onPress={() => 
                    //   toggleListDetailModal()
                    // }
                  >
                    <Text style={styles.cardDetailsButtonText}>Details</Text>
                  </TouchableOpacity>
              
                {/* <ListDetailModal
                  toggleListDetailModal={toggleListDetailModal}
                  isListDetailModalVisible={isListDetailModalVisible}
                  setIsListDetailModalVisible={setIsListDetailModalVisible}
                /> */}
                </View>

              </View>
            );
          })}

        <View style={styles.hr} />
      </ScrollView>
    </React.Fragment>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 100,
    backgroundColor: "#802941",
    justifyContent: "center",
    textAlign: "center",
  },
  middle: {
    flex: 15,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 10,
    color: "white",
  },
  cardContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 180,
    marginTop: 12,
    padding: 10,
    // borderRadius: 8,
    color: "red",
    // backgroundColor: "#eaeaea",
    // borderWidth: 1,
    // borderRadius: 20,
    // shadowColor: "black",
    // elevation: 5,
    // shadowRadius: 2,
    // shadowOpacity: 0.6,
  },
  cardTop: {
    flex: 0.25,
  },
  cardMiddle: {
    marginTop: 20,
    flex: 0.5,
  },
  cardBottom: {
    flex: 0.25,
  },
  cardDescriptionText: {
    alignSelf: "center",
  },
  cardDetailsButtonWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
  },
  cardTitleText: {
    alignSelf: "center",
    fontSize: 22,
  },
  cardDistanceText: {
    alignSelf: "center",
    fontSize: 15,
  },
  cardTitleText: {
    alignSelf: "center",
    fontSize: 22,
  },
  noDataText: {
    fontSize: 60,
    color: "red",
  },
  // toggle: {
  //   position: "absolute",
  //   top: "45%",
  //   left: "0%",
  //   paddingVertical: 4,
  //   paddingLeft: 7,
  //   paddingRight: 15,
  //   backgroundColor: "rgba(105, 105, 105, .2)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderBottomRightRadius: 15,
  //   borderTopRightRadius: 15,
  // },
  toggle: {
    position: "absolute",
    top: "45%",
    right: "0%",
    paddingVertical: 4,
    paddingLeft: 15,
    paddingRight: 7,
    backgroundColor: "rgba(105, 105, 105, .2)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default ListScreen;
