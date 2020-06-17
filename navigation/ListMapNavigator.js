import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen"
import ListScreen from "../screens/ListScreen";

const ListMapStack = createStackNavigator();

// const mainHeaderStyle = {
//   backgroundColor: "#092455",
//   height: 100,
// };

const ListMapNavigator = () => {
  return (
    <ListMapStack.Navigator initialRouteName="Map">
      <ListMapStack.Screen
        name="Map"
        component={MapScreen}
      />

      <ListMapStack.Screen
        name="ListScreen"
        component={ListScreen}
      />
    </ListMapStack.Navigator>
  );
};

export default ListMapNavigator;
