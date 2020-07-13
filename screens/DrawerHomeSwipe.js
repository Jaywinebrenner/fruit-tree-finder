import React, { useState } from "react";
import BottomDrawer from "rn-bottom-drawer";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import maroonGradient from "../assets/maroonGradient.png";
import { getDistance, convertDistance } from 'geolib';
import customTreeBox from "../media/customTreeBox.png";

// const TAB_BAR_HEIGHT = 30;

const DrawerHomeSwipe = (props) => {

  const userCoords = props.userCoords;
  const treeList = props.treeList;
  const filter = props.filter;

  const [treeArray, setTreeArray] = useState(null);

  if (treeList && userCoords) {
    Object.values(treeList).forEach((tree) => {
      let treeLat = tree.treeCoordinates[0];
      let treeLong = tree.treeCoordinates[1];
      tree.distance = getDistance(
        { latitude: treeLat, longitude: treeLong },
        { latitude: userCoords[0], longitude: userCoords[1] },
      );
    });
    if (!treeArray) {
      setTreeArray(
        Object.values(treeList).sort((a, b) =>
          a.distance > b.distance ? 1 : -1,
        ),
      );
    }
    console.log("TREEARRAY", treeArray);
  }

  const renderHeader = () => {
    <View>
        <Text>HEADER THAT SHOULDNT MOVE</Text>
    </View>;
  }

  const renderContent = () => {
    console.log("PROPSSS", props);

    function milesOrYards(distance) {
      if (distance < 1609.34) {
        let dist = Math.round(convertDistance(distance, "yd"));
        return(dist + " yards away");
      } else {
        let dist = Math.round(convertDistance(distance, "mi"));
        return (dist + " miles away");
      }
    }

    return (
      <React.Fragment>
      <View style={styles.topStrip}>
        {/* <ImageBackground
          source={maroonGradient}
          style={styles.gradientImageTopStrip}
        > */}
          <View
            style={styles.dragView}
          />

        </View>
        <ImageBackground source={maroonGradient} style={styles.gradientImage}>
          <Entypo
            name="tree"
            size={500}
            color="rgba(163, 119, 125, 0.5)"
            style={styles.bigTree}
          />
          <ScrollView style={styles.container}>

            {treeArray &&
              treeArray.map((value, index) => {
                return (
                  <View style={styles.cardContainer} key={index}>
                    <View style={{ flexDirection: "row" }}>
                      {/* <MaterialCommunityIcons
                        name="pine-tree-box"
                        size={40}
                        color="white"
                        style={styles.boxTree}
                      /> */}
                      <Image style={styles.boxTree} source={customTreeBox} />
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitleText}>{value.type}</Text>
                        <Text style={styles.cardDistanceText}>
                          {milesOrYards(value.distance)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.cardDetailsButtonWrapper}
                        onPress={() =>
                          navigation.navigate("ListItemDetailScreen", {
                            index,
                            ...value,
                          })
                        }
                      >
                        <Text style={styles.cardDetailsButtonText}>Details</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardMiddle}>
                      <Text elipsesMode="tail" style={styles.cardDescriptionText}>
                        {value.description.length > 40
                          ? value.description.substring(0, 40 - 4) + "..."
                          : value.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </ImageBackground>
      </React.Fragment>
    );
  };

  return (
    <BottomSheet
    snapPoints={[656, 350, 30]}
    renderHeader={renderHeader}
    renderContent={renderContent}
    initialSnap={2}
    />
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
      // justifyContent: "center",
      // alignItems: "center",
      paddingTop: 25,
      // paddingBottom: 10,
      height: 80,
      // flexDirection: "row",
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
    cardContainer: {
      justifyContent: "center",
      width: "100%",
      marginTop: 12,
      padding: 10,
      color: "red",
      backgroundColor: "rgba(255, 255, 255, .05)",
    },
    cardDetailsButtonWrapper: {
      ...Platform.select({
        ios: {
            position: "absolute",
            right: "3%",
            borderWidth: 1,
            borderRadius: 2,
            padding: 4,
            bottom: 17,
            borderColor: "white",
        },
        android: {
            position: "absolute",
            right: "3%",
            borderWidth: 1,
            borderRadius: 2,
            padding: 4,
            borderColor: "white",
        },
      }),
    },
    cardDetailsButtonText: {
      color: "white",
    },
    cardDistanceText: {
      fontSize: 15,
      color: "white",
    },
    cardTitleText: {
      fontSize: 22,
      color: "white",
    },
    cardDescriptionText: {
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
    hr: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    gradientImage: {
      height: "100%",
      width: "100%",
    },
    bigTree: {
      position: "absolute",
      bottom: -50,
      top: 300,
      right: -60,
    },
    boxTree: {
      marginRight: "3%",
      width: 40,
      height: 40
    },
    topStrip: {
      height: 30,
      backgroundColor: "rgba(255, 255, 255, .7)",
      // transparent maroon?
      // backgroundColor: "rgba(83, 22, 19, .5)",
      justifyContent: "center",
      alignItems: "center",
    },
    dragView: {
      paddingTop: 0,
      borderBottomColor: "#531613",
      borderBottomWidth: 8,
      width: 50,
      borderRadius: 9,
      padding: 0,
      margin: 0,
    }
  });

export default DrawerHomeSwipe
