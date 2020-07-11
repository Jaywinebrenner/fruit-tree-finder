import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import logo from "../media/logo.png";
import firebase from "firebase";
import apples from "../media/apples.jpg";
import LoadingScreen from "./LoadingScreen";
import maroonGradient from "../assets/maroonGradient.png";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingActive, setLoadingActive] = useState(false);

  // console.log("email", email);
  // console.log("password", password);

   async function signUp(email, password) {
     setLoadingActive(true);
     try {
       if (password.length < 5) {
         alert("Please Enter 6 characters");
         return;
       }
       await firebase.auth().createUserWithEmailAndPassword(email, password);
       console.log("SUCCESS");
       setLoadingActive(false);
     } catch (error) {
       Alert.alert("ERROR", error.toString());
       console.log("ERROR", error.toString());
       setLoadingActive(false);
     }
   }

 async function login(email, password) {
    if (email.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }
    if (!password.length) {
      Alert.alert("Please enter a password.");
      return;
    }

   try {
     await firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

       console.log("USER", user)
     })
   } catch (error) {
     Alert.alert(error.toString());
     console.log("ERROR", error.toString());
   }
 };



const renderLoginScreen = () => {
  return (
    <View
      style={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <ImageBackground source={maroonGradient} style={styles.gradientImage}>
        <Entypo
          name="tree"
          size={500}
          color="rgba(163, 119, 125, 0.5)"
          style={styles.bigTree}
        />
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <AntDesign
              name="arrowleft"
              size={30}
              color="#e1eddf"
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <Text style={styles.backText}>Log in</Text>
        </View>
          <KeyboardAwareScrollView style={styles.middle}>

            <View style={styles.form}>
              <Text style={styles.imageText}>PORTLAND FRUIT TREE {"\n"} PROJECT</Text>
              <Text style={styles.imageTextTwo}>
                Gather food from the plentiful bounties {"\n"} of your neighborhood
              </Text>
              <TouchableOpacity>
                <Text style={styles.text}>Welcome!</Text>
                <TextInput
                  autoCapitalize="none"
                  keyboardType={"email-address"}
                  placeholder="Email"
                  placeholderTextColor="grey"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize={"none"}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.login}
                onPress={() => login(email, password)}
              >
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signUp}
                onPress={() => signUp(email, password)}
              >
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  )
      }

    return <React.Fragment>{console.log("loading active???", loadingActive)}{loadingActive ? <LoadingScreen/> : renderLoginScreen()}</React.Fragment>
  // return <React.Fragment>{renderLoginScreen()}</React.Fragment>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    // // backgroundColor: "#f9fcfb",
    // flex: 1,
    // marginBottom: 24,
    // marginTop: 24,
  },
  top: {
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(236, 250, 217, .2)"
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  bigTree: {
    position: "absolute",
    bottom: -50,
    top: 300,
    right: -60,
    zIndex: 1
  },
  backText: {
    color: "#e1eddf",
    fontSize: 25,
  },
  backArrow: {
    marginLeft: "10%"
  },
  form: {
    margin: "10%",
    zIndex: 1
  },
  // buttonText: {
  //   textAlign: "center",
  //   color: "grey",
  //   fontSize: 17,
  // },
  input: {
    alignSelf: "center",
    height: 40,
    borderColor: "#e1eddf",
    borderWidth: 1,
    marginTop: "2%",
    width: 250,
    color: "#e1eddf",
    padding: "2%",
  },
  text: {
    textAlign: "center",
    color: "#e1eddf",
    fontSize: 17,
  },
  imageText: {
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#210606",
    // textAlign: "left",
    // marginLeft: "3%",
    // marginTop: "40%",
  },
  imageTextTwo: {
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "#210606",
    textAlign: "left",
    margin: "2%",
  },
  login: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#802941",
    padding: 5,
    marginTop: 15,
    borderRadius: 3,
  },
  signUp: {
    alignSelf: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    height: 40,
    width: 80,
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#802941",
    marginTop: 20,
  },
  signUpButtonText: {
    alignSelf: "center",
    color: "#802941",
  },
  loginButtonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  middle: {
    zIndex: 1
  }
});

export default LoginScreen;
