import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MapScreen from '../screens/MapScreen'

const BottomTabNavigator = () => {
  
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeBackgroundColor: "lightblue",
        inactiveBackgroundColor: "#092455",
        activeTintColor: "#092455",
        inactiveTintColor: "white",
        showLabel: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        labelStyle={{ color: "white" }}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="helicopter" size={20} color={color} />
          ),
        }}
      />

    </Tabs.Navigator>
  );
}

export default BottomTabNavigator;
