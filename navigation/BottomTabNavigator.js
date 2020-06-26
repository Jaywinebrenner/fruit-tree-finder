import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MapScreen from '../screens/MapScreen'
import HomeScreen from "../screens/HomeScreen";
import AddTreeScreen from "../screens/AddTreeScreen";
import MyTrees from "../screens/MyTrees";
import ListMapNavigator from "../navigation/ListMapNavigator";
import MyTreesListMapNavigator from "../navigation/MyTreesListMapNavigator";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();


const BottomTabNavigator =  () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        // activeBackgroundColor: "#d6efc7",
        // inactiveBackgroundColor: "#96bb7c",
        // activeTintColor: "#092455",
        // inactiveTintColor: "white",
        showLabel: true,
      }}
    >
      <Tabs.Screen
        name="Home"
        labelStyle={{ color: "white" }}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add a tree"
        component={AddTreeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="My Trees"
        component={MyTreesListMapNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tree" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={ListMapNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="hand" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
      }

export {BottomTabNavigator};
