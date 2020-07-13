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
  container: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingTop: 25,
    paddingHorizontal: "2%",
  },
  textInput: {
    height: 40,
    borderColor: "#9e8080",
    fontSize: 16,
    borderWidth: 1,
    paddingLeft: 32,
    borderRadius: 15,
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, .9)"
  },
  button: {
    backgroundColor: "#531613",
    borderRadius: 25,
    height: 30,
    width: "18%",
    marginLeft: "3%",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  searchBox: {
    flexDirection: "row",
    width: "100%",
    flex: 1
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2
  }
});

export default Search;
