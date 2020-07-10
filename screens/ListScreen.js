import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

import ViewMapButton from "../components/ViewMapButton"

import firebase from "firebase";
import { Ionicons, createIconSetFromFontello } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import maroonGradient from "../assets/maroonGradient.png";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FilterDropDownList from "../components/FilterDropDownList";




const ListScreen = () => {


  const navigation = useNavigation();
  const toggleToMapView = () => {
    navigation.navigate("Map");
  };
  const [onListScreen, setOnListScreen] = useState(false);
  const [currentDatabase, setCurrentDatabase] = useState(null);
  const [filter, setFilter] = useState("All Trees");


  // console.log("A TREE HOPEFULLY", currentDatabase);

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

  return (
    <React.Fragment>
      <ImageBackground source={maroonGradient} style={styles.gradientImage}>
        <Entypo
          name="tree"
          size={500}
          color="rgba(163, 119, 125, 0.5)"
          style={styles.bigTree}
        />
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          </TouchableOpacity>
          <Text style={styles.headerText}>All Trees</Text>
        </View>
        <FilterDropDownList filter={filter} setFilter={setFilter} />
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="ios-arrow-back" size={60} color="white" />
        </TouchableOpacity>

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
                        navigation.navigate("ListItemDetailScreen", {
                          index,
                          ...value
                        })
                      }
                    >
                      <Text style={styles.cardDetailsButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </ImageBackground>
    </React.Fragment>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(236, 250, 217, .2)",
  },
  headerText: {
    textAlign: "center",
    fontSize: 25,
    alignSelf: "center",
    color: "white",
  },
  backText: {
    color: "#e1eddf",
    fontSize: 25,
  },
  middle: {
    flex: 15,
    backgroundColor: "white",
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
    backgroundColor: "rgba(255, 255, 255, .05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, .5)",
    borderRadius: 8,
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
  cardDetailsButtonWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
    borderColor: "white",
  },
  cardDetailsButtonText: {
    color: "white",
  },
  cardDistanceText: {
    alignSelf: "center",
    fontSize: 15,
    color: "white",
  },
  cardTitleText: {
    alignSelf: "center",
    fontSize: 22,
    color: "white",
  },
  cardDescriptionText: {
    alignSelf: "center",
    color: "rgba(255, 255, 255, .5)",
  },
  toggle: {
    position: "absolute",
    top: "45%",
    left: "0%",
    paddingVertical: 4,
    paddingLeft: 7,
    paddingRight: 15,
    backgroundColor: "rgba(255, 255, 255, .15)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 1,
  },
  // toggle: {
  //   position: "absolute",
  //   top: "45%",
  //   right: "0%",
  //   paddingVertical: 4,
  //   paddingLeft: 15,
  //   paddingRight: 7,
  //   backgroundColor: "rgba(105, 105, 105, .2)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderBottomLeftRadius: 15,
  //   borderTopLeftRadius: 15,
  // },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    // zIndex: 0,
  },
  bigTree: {
    position: "absolute",
    bottom: -50,
    top: 300,
    right: -60,
    // zIndex: 1,
  },
});

export default ListScreen;
