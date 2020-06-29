import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";
import ListItemDetailScreen from "../screens/ListItemDetailScreen";
import MyTrees from '../screens/MyTrees'
import MyTreesMapScreen from "../screens/MyTreesMapScreen";
import MyTreesDetailScreen from "../screens/MyTreesDetailScreen";

const MyTreesStack = createStackNavigator();

// const mainHeaderStyle = {
//   backgroundColor: "#092455",
//   height: 100,
// };

const MyTreesListMapNavigator = () => {
  return (
    <MyTreesStack.Navigator initialRouteName="My Trees" headerMode="none">
      <MyTreesStack.Screen name="My Trees" component={MyTrees} />
      <MyTreesStack.Screen name="My Trees Map" component={MyTreesMapScreen} />
      <MyTreesStack.Screen name="My Trees Details" component={MyTreesDetailScreen} />
    </MyTreesStack.Navigator>
  );
};

export {MyTreesListMapNavigator}
