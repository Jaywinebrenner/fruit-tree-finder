import React from "react";
import {
  StyleSheet,
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

const FilterDropDown = ({filter, setFilter}) => {

  let user = firebase.auth().currentUser

  const renderDropDownSignedOut = () => {
    return (
      <DropDownPicker
        items={[
          {
            label: "All Trees",
            value: "All Trees",
            icon: () => <Foundation name="trees" size={14} color="green" />,
          },
          {
            label: "Verified",
            value: "Verified Trees",
            icon: () => <FontAwesome name="tree" size={12} color="red" />
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
      )
    }

  const renderDropDownSignedIn = () => {
  return (
    <DropDownPicker
      items={[
        {
          label: "All Trees",
          value: "All Trees",
          icon: () => <Foundation name="trees" size={14} color="green" />,
        },
        {
          label: "Verified",
          value: "Verified Trees",
          icon: () => <FontAwesome name="tree" size={12} color="red" />
         },
        {
          label: "My Trees",
          value: "My Trees" ,
          icon: () => <FontAwesome name="tree" size={12} color="blue" />
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
  )
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
});


export default FilterDropDown
