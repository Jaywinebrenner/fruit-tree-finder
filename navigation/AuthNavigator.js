import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";
import ListItemDetailScreen from "../screens/ListItemDetailScreen";
import LoginScreen from "../screens/LoginScreen"
import { BottomTabNavigator } from "./BottomTabNavigator";

const AuthStack = createStackNavigator();


const AuthNavigator = (
  <AuthStack.Navigator >
    <AuthStack.Screen
      name="Home"
      // headerMode="none"
      component={BottomTabNavigator}
    />
    <AuthStack.Screen 
    name="SignIn" 
    // headerMode="none" 
    component={LoginScreen} />
  </AuthStack.Navigator>
);


export {AuthNavigator}
