import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AddTreeScreen from "../screens/AddTreeScreen";
import {ListMapNavigator} from "../navigation/ListMapNavigator";
import { Ionicons } from "@expo/vector-icons";

const RegisteredStack = createStackNavigator();

const RegisteredStackNavigator = () => {
  return (
    <RegisteredStack.Navigator headerMode={"none"}>
      <RegisteredStack.Screen
        name="Home"
        component={ListMapNavigator}
      />
      <RegisteredStack.Screen
        name="AddTreeScreen"
        component={AddTreeScreen}
      />
    </RegisteredStack.Navigator>
  );
};

export {RegisteredStackNavigator};
