import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import { ListMapNavigator } from "../navigation/ListMapNavigator";

const HomeStack = createStackNavigator();

const HomeStackNavigator = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ListMapNavigator}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Login")}
              title="sign in"
              color="maroon"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
