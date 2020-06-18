import React from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { TREES } from "../constants/Markers";
import { Navigation } from "react-native-navigation";


const ListItemDetailScreen = (props, { navigation, title }) => {

    const { goBack } = props.navigation;

  const treeKey = props.route.key;
  console.log("TREE KEY", props.route.key); 
    console.log("PROPS", props); 

  const trees = TREES.markers;
  console.log("TREES", trees);

  let client = null;


  // if (
  //   props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)
  // ) {
  //   client = props.listOfClientProfiles.find(
  //     (x) => x.userID === jobDetails.clientID,
  //   );
  // }





  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.distanceText}>65 Meters away</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.descriptionText}>{trees.description}</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.detailsButtonWrapper} onPress={goBack}>
          <Text style={styles.detailsButtonText}>Back to Tree List</Text>
        </TouchableOpacity>
      </View>
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

export default ListItemDetailScreen