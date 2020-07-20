import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  ImageBackground,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/Feather';
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";
import customTree from "../media/customTree.png";
import customTreeMyTree from "../media/customTreeMyTree.png";
import customTreeVerified from "../media/customTreeVerified.png";


const FilterDropDown = ({filter, setFilter}) => {

  let user = firebase.auth().currentUser


  const renderDropDownSignedOut = () => {
    return (
      <DropDownPicker
        items={[
          {
            label: "All Trees",
            value: "All Trees",
            icon: () => <Image source={customTree} style={styles.customTree} />,
          },
          {
            label: "Verified",
            value: "Verified Trees",
            icon: () => (
              <Image source={customTreeVerified} style={styles.customTree} />
            ),
          },
        ]}
        defaultValue={filter}
        style={styles.filterDropDown}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={styles.dropDownStyleSignedOut}
        onChangeItem={(item) => setFilter(item.value)}
      />
    );
    }

  const renderDropDownSignedIn = () => {
  return (
    <DropDownPicker
      items={[
        {
          label: "All Trees",
          value: "All Trees",
          icon: () => <Image source={customTree} style={styles.customTree} />,
        },
        {
          label: "My Trees",
          value: "My Trees",
          icon: () => (
            <Image source={customTreeMyTree} style={styles.customTree} />
          ),
        },
        {
          label: "Verified",
          value: "Verified Trees",
          icon: () => (
            <Image source={customTreeVerified} style={styles.customTree} />
          ),
        },
      ]}
      defaultValue={filter}
      style={styles.filterDropDown}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={styles.dropDownStyle}
      onChangeItem={(item) => setFilter(item.value)}
    />
  );
}


return (
  <React.Fragment>
    {user ? renderDropDownSignedIn() : renderDropDownSignedOut()}
  </React.Fragment>
  )

}

const styles = StyleSheet.create({
  filterButton: {
    zIndex: 1,
    padding: 0,
    position: "absolute",
    top: 80,
    left: 15,
    height: 40,
    width: 125,
  },
  customTree: {
    width: 20,
    height: 30,
  },
  filterDropDown: {
    backgroundColor: "#fafafa",
    zIndex: 1,
    padding: 0,
    position: "absolute",
    top: 80,
    left: 15,
    height: 40,
    width: 125,
  },
  dropDownStyle: {
    zIndex: 1,
    padding: 0,
    position: "absolute",
    top: 180,
    left: 15,
    height: 140,
    width: 125,
    marginTop: 80,
  },
  dropDownStyleSignedOut: {
    zIndex: 1,
    padding: 0,
    position: "absolute",
    top: 180,
    left: 15,
    height: 100,
    width: 125,
    marginTop: 80,
  },
});


export default FilterDropDown
