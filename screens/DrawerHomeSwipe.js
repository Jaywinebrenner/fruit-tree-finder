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
  TouchableOpacity,
  Dimensions,
  UIManager,
  LayoutAnimation,
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

const DrawerHomeSwipe = (props) => {

  const windowHeight = Dimensions.get('window').height;
  const drawerTopHeight = (windowHeight * .52);
  const drawerHalfHeight = (windowHeight * .18);
  const drawerBottomHeight = (windowHeight * .08);
 // ANDROID const drawerBottomHeight = (windowHeight * .04)

  const userCoords = props.userCoords;
  const treeList = props.treeList;
  const filter = props.filter;



  let treeListIndex = null;

  // if (props.treeList) {
  //   Object.values(props.treeList).forEach((value, index) => {
  //     console.log("TREE CORDS", value.treeCoordinates);
  //     // console.log("FIRE BASE KEY??", index);
  //   });
  // }

    if (props.treeList) {
    Object.values(props.treeList).forEach((value, index) => {
      console.log("TREE CORDS", value.treeCoordinates);
      // console.log("FIRE BASE KEY??", index);
    });
  }
console.log("props.treeList", props.treeList);

  const [expanded, setExpanded] = useState(false)


  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

    // let firebaseUniqueKey = null;
    // const findFirebaseUniqueKeyToDelete = (cardKeyNumber) => {
    //   firebaseUniqueKey = Object.keys(currentDatabase)[cardKeyNumber];
    // };
    // findFirebaseUniqueKeyToDelete(cardKey);
  
  const dropDown = (name) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(name)
    if (name === expanded){
      setExpanded(null)
    }
    // setExpanded(!expanded)

  };


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
    // console.log("TREEARRAY", treeArray);
  }

  function milesOrYards(distance) {
    if (distance < 1609.34) {
      let dist = Math.round(convertDistance(distance, "yd"));
      return(dist + " yards away");
    } else {
      let dist = Math.round(convertDistance(distance, "mi"));
      return (dist + " miles away");
    }
  }

  const renderDeleteButton = treeList && (
    <View onPress={() => areYouSure()}>
      <AntDesign
        style={styles.deleteIcon}
        name="delete"
        size={30}
        color="white"
        onPress={() => areYouSure()}
      />
    </View>
  );
console.log("EXPANEDED", expanded);

  const renderContent = () => {

    return (
      <React.Fragment>
        <ImageBackground source={maroonGradient} style={styles.gradientImage}>
          <View style={styles.topStrip}>
            <View style={styles.dragView} />
          </View>
          <ScrollView>
          <Entypo
          name="tree"
          size={500}
          color="rgba(163, 119, 125, 0.5)"
          style={styles.bigTree}
          />
            {treeArray &&
              treeArray.map((value, index) => {
                return (
                  <TouchableOpacity key={value.index}>
                    <View style={styles.cardContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Image style={styles.boxTree} source={customTreeBox} />
                        <View style={styles.cardInfo}>
                          <Text style={styles.cardTitleText}>{value.type}</Text>
                          <Text style={styles.cardDistanceText}>
                            {milesOrYards(value.distance)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.cardDetailsButtonWrapper}
                          // onPress={() =>
                          //   navigation.navigate("ListItemDetailScreen", {
                          //     index,
                          //     ...value,
                          //   })
                          // }
                          onPress={() => dropDown(value.type)}
                        >
                          <Text style={styles.cardDetailsButtonText}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          height: (expanded === value.type) ? 220 : 0,
                          overflow: "hidden",
                          paddingLeft: 10,
                          paddingRIght: 10,
                        }}
                      >
                        <View style={styles.locationWrapper}>
                          <Text style={styles.treeLocationText}>
                            {value.treeLocation}
                          </Text>
                        </View>
                        <View style={styles.descriptionWrapper}>
                          <Text style={styles.descriptionText}>
                            {value.description}
                          </Text>
                        </View>
                        <View style={styles.deleteButtonWrapper}>
                          {renderDeleteButton}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </ImageBackground>
      </React.Fragment>
    );
  };

  return (
    <BottomSheet
      snapPoints={[drawerTopHeight, drawerHalfHeight, drawerBottomHeight]}
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
    paddingTop: 25,
    height: 80,
    backgroundColor: "rgba(236, 250, 217, .2)",
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
    position: "absolute",
    right: "3%",
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
    borderColor: "white",
    ...Platform.select({
      ios: {
        bottom: 17,
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
    height: 40,
  },
  topStrip: {
    height: 60,
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
  },
  descriptionWrapper: {
    marginTop: 15,
    height: 130
  },
  descriptionText: {
    fontSize: 20,
    color: "white",
  },
  locationWrapper: {
    marginTop: 10
  },
  treeLocationText: {
    fontSize: 20,
    color: "white",
  },
  deleteButtonWrapper: {

    marginLeft: 10
  },
});

export default DrawerHomeSwipe;
