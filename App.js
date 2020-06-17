
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen'
import MapScreen from "./screens/MapScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import AddTreeScreen from './screens/AddTreeScreen'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ListMapNavigator from "./navigation/ListMapNavigator"

  const Tabs = createBottomTabNavigator();

function App() {

  console.disableYellowBox = true;

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}



export default App;
