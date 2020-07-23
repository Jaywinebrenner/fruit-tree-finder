import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen"
// import ListScreen from "../unused/ListScreen";


const ListMapTab = createBottomTabNavigator();

const ListMapNavigator = () => {
  return (
    <ListMapTab.Navigator initialRouteName="Map" swipeEnabled="true">
      <ListMapTab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarVisible: false }}
      />
    </ListMapTab.Navigator>
  );
};

export {ListMapNavigator};
