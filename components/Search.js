import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import { signOut } from "../actions/sessions";
import { FontAwesome5 } from '@expo/vector-icons';

function Search(props) {

  const navProps = props;
  console.log("NAV", navProps);

  const [ loggedIn, setLoggedIn ] = useState(false);

  if (firebase.auth().currentUser && !loggedIn) {
    setLoggedIn(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <FontAwesome5 name="search-location" size={17} color="lightgrey" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for a specific variety of tree"
          style={styles.textInput}
          clearTextOnFocus={true}
        >
        </TextInput>
      </View>
      {loggedIn ? (
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.button}
        >
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navProps.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    borderColor: "gray",
    fontSize: 16,
    borderWidth: 1,
    paddingLeft: 32,
    borderRadius: 25,
    width: "100%",
    flex: 1
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 25,
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingBottom: "1%",
  },
  button: {
    backgroundColor: "maroon",
    borderColor: "grey",
    borderRadius: 25,
    height: 35,
    width: "18%",
    marginLeft: "3%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  searchBox: {
    flexDirection: "row",
    width: "80%",
    flex: 1
  },
  searchIcon: {
    position: "absolute",
    margin: "3%"
  }
});

export default Search;
