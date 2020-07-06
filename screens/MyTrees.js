import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ViewMyMapButton from "../components/ViewMyMapButton";
import firebase from "firebase";

const MyTrees = ({ navigation }) => {

  const toggleToMapView = () => {
      navigation.navigate("My Trees Map");
  };

  const [currentDatabase, setCurrentDatabase] = useState([]);
  const [hasTreeData, setHasTreeData] = useState(false)

  let currentUserID = null;

  if (firebase.auth().currentUser) {
      currentUserID = firebase.auth().currentUser.uid;
  }

  useEffect( () => {
    async function fetchData() {
        let result = await firebase.database().ref("/tree");
        await result.on("value", (snapshot) => {
          // console.log("snapshot val", snapshot.val());
          let database = snapshot.val();
          setCurrentDatabase(database);
        });

      }
    // const doesTheUserHaveTrees = () => {
    //   Object.values(currentDatabase).map((value, index) => {
    //     if (value.userID !== currentUserID) {
    //       console.log("User Has Tree", hasTreeData);
    //       setHasTreeData(false);
      
    //     } else {
    //       setHasTreeData(true)
    //        console.log("User DOESNT HAVE TREE DATA",hasTreeData);
    //     }
    //   });
    // };
 
    // doesTheUserHaveTrees();
    fetchData();
  }, []);


  currentDatabase && console.log("FIND THE UNIQUE FIREBASE KEY", Object.keys(currentDatabase));
  


  if (!currentDatabase) {
      console.log("I DONT EXIST");
  }
  if (currentDatabase) {
      console.log("I EXIST");
      Object.values(currentDatabase).forEach((value) => {
      console.log("Finding the key---", value);
      });
  }

  const TreeCard = 
    currentDatabase && (
      Object.values(currentDatabase).map((value, index) => {
        if (value.userID === currentUserID) {

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
                  onPress={() => {
                    navigation.navigate("My Trees Details", {
                      key: index,
                      ...value,
                    });
                  }}
                >
                  <Text style={styles.cardDetailsButtonText}>Details | Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      })
    )
    const NoDataCard = 
      <View>
        <Text style={styles.noTreesText}>
          You have not added any trees. Toggle to the Add a Tree icon on the
          bottom tab add a tree.
        </Text>
      </View>
    
      
  return (
    <React.Fragment>
      <View style={styles.top}>
        <Text style={styles.headerText}>My Trees</Text>
      </View>
      <ViewMyMapButton toggleToMapView={toggleToMapView} />
      <ScrollView style={styles.container}>


    {TreeCard}
        


    {/* {hasTreeData ? (
      TreeCard
    ) : (
      NoDataCard
    )}  */}

      </ScrollView>
    </React.Fragment>
    );
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
    fontSize: 32,
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
  noDataText: {
    fontSize: 60,
    color: "red",
  },
  noTreesText: {
    fontSize: 30,
    color: "red",
  },
});

export default MyTrees;
