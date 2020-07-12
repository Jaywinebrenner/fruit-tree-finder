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
import customTree from "../media/customTreeFourOutline.png";
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
            // icon: () => <Foundation name="trees" size={14} color="green" />,
          },
          {
            label: "Verified",
            value: "Verified Trees",
            icon: () => <Image source={customTreeVerified} style={styles.customTree} />,
          },
        ]}
        defaultValue={filter}
        containerStyle={styles.filterButton}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
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
          // icon: () => <Foundation name="trees" size={14} color="green" />,
        },
        {
          label: "My Trees",
          value: "My Trees",
          icon: () => (
            <Image source={customTreeMyTree} style={styles.customTree} />
          ),
          // icon: () => <FontAwesome name="tree" size={12} color="blue" />,
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
      containerStyle={styles.filterButton}
      style={{ backgroundColor: "#fafafa" }}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={{ backgroundColor: "#fafafa" }}
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
    width: 115,
  },
  customTree: {
    width: 20,
    height: 30,
  },
});


export default FilterDropDown
