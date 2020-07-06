import * as firebase from "firebase";

export function signOut(props) {
  try {
    firebase.auth().signOut();
    props.navigation.navigate("HomeStackNavigator");
  } catch (error) {}
  return null;
};
