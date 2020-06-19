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
  Image,sfgj
} from "react-native";
import logo from "../media/logo.png";
import firebase from "firebase"


import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("email", email);
  console.log("password", password);
  
''
   async function signUp(email, password) {
     try {
       if (password.length < 5) {
         alert("Please Enter 6 characters");
         return;
       }
       await firebase.auth().createUserWithEmailAndPassword(email, password);
       console.log("SUCCESS");
     } catch (error) {
       console.log("ERROR", error.toString());
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
     navigation.push("Loading");
   try {
     await firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
       console.log("USER", user)
     })
   } catch (error) {
     console.log("ERROR", error.toString());
   }
 };


  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.top}>
        {/* <Text>Hello</Text> */}
        {/* <Image source={logo} style={styles.logo} resizeMode="center" /> */}
      </View>

      <View style={styles.middle}>
        <Text style={styles.imageText}>PORTLAND FRUIT TREE PROJECT</Text>
        <Text style={styles.imageTextTwo}>
          THE FASTEST WAY TO GET AERIAL IMAGES AND DATA
        </Text>
        <TouchableOpacity>
          <Text style={styles.text}>Welcome Back</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f9fcfb",
    flex: 1,
    marginBottom: 24,
    marginTop: 24,
  },
  top: {
    // flex: 1,
    backgroundColor: "red",
  },
  logo: {},
  logoContainer: {
    // flex: 1,
  },
  middle: {
    flex: 10,
    backgroundColor: "white",
  },
  buttonText: {
    textAlign: "center",
    color: "grey",
    fontSize: 17,
  },
  input: {
    alignSelf: "center",
    height: 40,
    borderColor: "#802941",
    borderWidth: 1,
    marginTop: "2%",
    width: 250,
    color: "black",
    padding: "2%",
  },
  text: {
    textAlign: "center",
      borderColor: "#802941",
    fontSize: 17,
  },
  imageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#802941",
    textAlign: "left",
    marginLeft: "3%",
    marginTop: "40%",
  },
  imageTextTwo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3E90D0",
    textAlign: "left",
    margin: "2%",
  },
  login: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#802941",
    height: 40,
    width: 250,
    marginTop: "2%",
    marginBottom: "1%",
    padding: 5,
    borderRadius: 3,
  },
  signUp: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    width: 100,
    marginTop: "5%",
    marginBottom: "1%",
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#802941",
  },
  signUpButtonText: {
    alignSelf: "center",
    color: "#802941",
  },
  loginButtonText: {
    alignSelf: "center",
    color: "white",
  },
});

export default LoginScreen;
