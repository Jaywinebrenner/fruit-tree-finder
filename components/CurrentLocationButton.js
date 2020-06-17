import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").width;


export const CurrentLocationButton = (props) => {
    const cb = props.cb ? props.cb : () => console.log("callback function not passed to CurrentLocationButton")
    const bottom = props.bottom ? props.bottom : -175

    

  return (

      <View style={[styles.container, {top: HEIGHT - bottom}]}>
        <MaterialIcons 
            name="my-location" 
            color="black" 
            size={25}
            onPress={()=> {cb()}}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "white",
    left: WIDTH-70,
    borderRadius: 50,
    shadowColor: "black",
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.6,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
