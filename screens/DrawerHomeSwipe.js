import React, { useState, useEffect, useRef } from "react";
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
import firebase from "firebase";
import { render } from "react-dom";
// import { Collapse } from "react-collapse";

const DrawerHomeSwipe = (props) => {

  // const drawerRef = useRef(null);

  useEffect(() => {
    updateTreeList();
    // console.log("USE EFFECT FIRED");
  }, []);

  const windowHeight = Dimensions.get('window').height;
  const drawerTopHeight = (windowHeight * .48);
  const drawerHalfHeight = (windowHeight * .18);
  let drawerBottomHeight = (windowHeight * .08);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
    drawerBottomHeight = windowHeight * 0.04;
  }

  const userCoords = props.userCoords;
  const treeList = props.treeList;
  const filter = props.filter;
  const [expanded, setExpanded] = useState(false);
  const [newTreeList, setNewTreeList] = useState(null);
  const [treeArray, setTreeArray] = useState(null);

  // Need currentUserID to render delete button
  let currentUserID = null;
  if (firebase.auth().currentUser) {
    currentUserID = firebase.auth().currentUser.uid;
  }

  const dropDown = (treeCoordinates) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(treeCoordinates);
    if (treeCoordinates === expanded) {
      setExpanded(null);
    }
  };

  const areYouSure = (treeIDInput) => {
    Alert.alert("Warning!", "Are you sure you want to delete this tree???", [
      {
        text: "NO",
        onPress: () => console.warn("NO Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => deleteTree(treeIDInput) },
    ]);
  };

  let firebaseUniqueKey = null
  const deleteTree = (treeIDInput) => {
    Object.entries(treeList).map((value) => {
      if (value[1].treeID === treeIDInput) {
        firebaseUniqueKey = value[0];
        firebase.database().ref(`/tree/${firebaseUniqueKey}`).remove();
        }
      });
    };

  function createTreeArray() {
    if (treeList && userCoords) {
      Object.values(treeList).forEach((tree) => {
        let treeLat = tree.treeCoordinates[0];
        let treeLong = tree.treeCoordinates[1];
        tree.distance = getDistance(
          { latitude: treeLat, longitude: treeLong },
          { latitude: userCoords[0], longitude: userCoords[1] },
        );
      });
      let newTreeArray = Object.values(treeList).sort((a, b) =>
      a.distance > b.distance ? 1 : -1,);
      setTreeArray(newTreeArray);
    }
  }

  function updateTreeList() {
    if (!newTreeList && Object.keys(treeList).length > 0 && userCoords) {
      setNewTreeList(treeList);
      createTreeArray();
    }
    if (Object.keys(treeList).length > 0 && newTreeList && newTreeList != treeList) {
      createTreeArray();
      setNewTreeList(treeList);
    }
    return treeArray;
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

  // const renderDetailsOrCloseText = () => {
  //   if (treeCoordinates === expanded) {
  //     return <Text style={styles.cardCloseButtonText}>Close</Text>;
  //   } else {
  //     return <Text style={styles.cardDetailsButtonText}>Details</Text>
  //   }
  // }



  const renderAllTrees =
    updateTreeList() &&
      treeArray.map((value, index) => {
        return (
          <TouchableOpacity key={index}>
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
                  onPress={() => dropDown(value.treeID)}
                >
                  {expanded === value.treeID ? (
                    <Text style={styles.cardCloseButtonText}>Close</Text>
                  ) : (
                    <Text style={styles.cardDetailsButtonText}>Details</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  maxHeight: expanded === value.treeID ? 190 : 0,
                  overflow: "hidden",
                  paddingLeft: 10,
                  paddingRight: 10,
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
                {value.userID === currentUserID && (
                  <View style={styles.deleteButtonWrapper}>
                    <View>
                      <AntDesign
                        style={styles.deleteIcon}
                        name="delete"
                        size={30}
                        color="white"
                        onPress={() => areYouSure(value.treeID)}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      });

      const renderNoMyTrees =
      treeArray &&
      treeArray.map((value, index) => {
        console.log("TREE ON MY TREES", treeArray);
        if (value.userID !== currentUserID) {
        return (
          <TouchableOpacity>
            <View style={styles.cardContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.boxTree} source={customTreeBox} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitleText}>You have not made any trees</Text>
                </View>
              </View>
              </View>
         </TouchableOpacity>
        );
        } 
      }) 

    const renderMyTrees =
      treeArray &&
      treeArray.map((value, index) => {
        console.log("TREE ON MY TREES", treeArray);
        if (value.userID === currentUserID) {
        return (
          <TouchableOpacity key={index}>
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
                  onPress={() => dropDown(value.treeCoordinates)}
                >
                  <Text style={styles.cardDetailsButtonText}>
                    Details
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  maxHeight: expanded === value.treeCoordinates ? 190 : 0,
                  overflow: "hidden",
                  paddingLeft: 10,
                  paddingRight: 10,
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
                {value.userID === currentUserID && (
                  <View style={styles.deleteButtonWrapper}>
                    <View>
                      <AntDesign
                        style={styles.deleteIcon}
                        name="delete"
                        size={30}
                        color="white"
                        onPress={() => areYouSure(value.treeID)}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
        } 
      }) 
      
    

   const renderTreesToList = () => {
     if (filter === "All Trees") {
       return <React.Fragment>{renderAllTrees}</React.Fragment>;
     }
     if (filter === "My Trees") {
       return <React.Fragment>{renderMyTrees}</React.Fragment>;
     }
   };

  const renderContent = () => {

    return (
      <React.Fragment>
        <ImageBackground source={maroonGradient} style={styles.gradientImage}>

        {/* <Text style={{ fontSize: 40 }} onPress={() => {drawerRef.current.snapTo(0)}}>TEST</Text> */}

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
            {renderTreesToList()}
          </ScrollView>
        </ImageBackground>
      </React.Fragment>
    );
  };

  return (
    <BottomSheet
      // ref={drawerRef}
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
    width: 45,
  },
  cardCloseButtonText: {
    color: "white",
    width: 45,
    paddingLeft: 3
  },
  cardDistanceText: {
    fontSize: 15,
    color: "white",
  },
  cardTitleText: {
    fontSize: 21,
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
    marginTop: 10,
    // height: 115,
  },
  descriptionText: {
    fontSize: 16,
    color: "white",
  },
  locationWrapper: {
    marginTop: 10,
  },
  treeLocationText: {
    fontSize: 18,
    color: "white",
  },
  deleteButtonWrapper: {
    zIndex: 10,
    marginLeft: -8,
    marginTop: 15,
  },
});

export default DrawerHomeSwipe;
