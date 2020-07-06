import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import MapScreen from '../screens/MapScreen'
import LoginScreen from "../screens/LoginScreen";
import {ListMapNavigator} from "../navigation/ListMapNavigator";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ListMapNavigator}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
