import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen"
import ListScreen from "../screens/ListScreen";
import ListItemDetailScreen from "../screens/ListItemDetailScreen";

const ListMapTab = createBottomTabNavigator();

// const mainHeaderStyle = {
//   backgroundColor: "#092455",
//   height: 100,
// };

const ListMapNavigator = () => {
  return (
    <ListMapTab.Navigator
      initialRouteName="Map"
      swipeEnabled="true"
      >
      <ListMapTab.Screen name="Map" component={MapScreen} options={{tabBarVisible: false}}/>
      <ListMapTab.Screen name="ListScreen" component={ListScreen} options={{tabBarVisible: false}}/>
    </ListMapTab.Navigator>
  );
};

export {ListMapNavigator};
