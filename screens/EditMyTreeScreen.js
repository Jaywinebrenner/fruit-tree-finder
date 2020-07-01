import React, {useEffect, useState} from 'react';
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

const EditMyTreeScreen = (props) => {
  const [currentDatabase, setCurrentDatabase] = useState([]);

  console.log("PROPS ON EDIT", props);
  

  useEffect(() => {
    // Pulling down database
    async function fetchData() {
      let result = await firebase.database().ref("/tree");
      await result.on("value", (snapshot) => {
        // console.log("snapshot val", snapshot.val());
        let database = snapshot.val();
        setCurrentDatabase(database);
      });
    }

    const doesTheUserHaveTrees = () => {
      Object.values(currentDatabase).map((value, index) => {
        if (value.userID !== currentUserID) {
          console.log("User Has Tree", hasTreeData);
          setHasTreeData(false);
        } else {
          setHasTreeData(true);
          console.log("User DOESNT HAVE TREE DATA", hasTreeData);
        }
      });
    };

    doesTheUserHaveTrees();
    fetchData();
  }, []);




  return (
    <View style={styles.container}>
      <Text>Edit my tree screen</Text>
      <Text>{props.cardType}</Text>

      <TouchableOpacity
        style={styles.detailsButtonWrapper}
        onPress={() => props.navigation.navigate("My Trees")}
      >
        <Text style={styles.detailsButtonText}>Back to Tree List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
});

export default EditMyTreeScreen