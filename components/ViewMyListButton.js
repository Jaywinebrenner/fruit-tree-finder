import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").width;

export const ViewMyListButton = ({ navigation, toggleToListView }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toggleToListView()}
    >
      {/* <Ionicons name="md-list" size={44} color="darkgray" /> */}
      <Text style={styles.buttonText}>View My List</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "white",
    // bottom: 450,
    top: 25,
    left: WIDTH - 70,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 10,
  },
});

export default ViewMyListButton;
