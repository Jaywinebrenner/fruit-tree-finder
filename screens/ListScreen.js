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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logo from "../media/logo.png";
import apples from "../media/apples.jpg";
import ViewMapButton from "../components/ViewMapButton"
import ListItemDetailScreen from "./ListItemDetailScreen";
import { TREES } from "../constants/Markers";
import firebase from "firebase";


const ListScreen = (  { navigation }) => {
  

  const toggleToMapView = () => {
    navigation.navigate("Map");
  };

  const [currentDatabase, setCurrentDatabase] = useState(null);
  const [formattedDatabase, setFormattedDatabase] = useState([])

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
    if (currentDatabase) {
      console.log("I EXIST");
      Object.values(currentDatabase).forEach((value) => {
        console.log("Value LIST", value.type);
      });
    }

  console.log("CURRENT DATABASE", currentDatabase);


    // const formattedDatabase = [];
    // Object.keys(currentDatabase).map((key, index) => {
    //   // console.log("KEY", key);
    //   // console.log("||");
    //   // console.log("INDEX", index);
    //   formattedDatabase.push(currentDatabase);
    //   setFormattedDatabase(formattedDatabase);
    //   // console.log("FORMATED DB", formattedDatabase);
    // });


const TreeCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitleText}>tutke</Text>
        <Text style={styles.cardDistanceText}>65 Meters away</Text>
      </View>

      <View style={styles.cardMiddle}>
        <Text style={styles.cardDescriptionText}>description</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.cardDetailsButtonWrapper}
          onPress={() => navigation.navigate("ListItemDetailScreen"), {}}
        >
          <Text style={styles.cardDetailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

return (
  <React.Fragment>
    <View style={styles.top}>
      <Text style={styles.headerText}>Fruit Trees in your area </Text>
    </View>
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
                  onPress={() => navigation.navigate("ListItemDetailScreen", {...value})}
                >
                  <Text style={styles.cardDetailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

    </ScrollView>
  </React.Fragment>
);


// return <React.Fragment>{currentDatabase ? renderList() : <Text style={styles.noDataText}>There is no data</Text>}</React.Fragment>;


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // textAlign: "center",
    // backgroundColor: "#f9fcfb",
    // marginBottom: 24,
    // marginTop: 24,
  },
  top: {
    // flex: 1,
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
  noDataText:{
    fontSize: 60,
    color: "red"
  }
});

export default ListScreen;
