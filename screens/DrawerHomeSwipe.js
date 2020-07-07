import React from "react";
import BottomDrawer from "rn-bottom-drawer";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  TextInput,
  Image
} from "react-native";
import apples from "../media/apples.jpg";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import logo from "../media/logo.png";

// const TAB_BAR_HEIGHT = 30;

const DrawerHomeSwipe = () => {

  const renderHeader = () => {
    <View>
        <Text>HEADER THAT SHOULDNT MOVE</Text>
    </View>;
  }

  const renderContent = () => {
    return (
      <React.Fragment>
        <View style={styles.welcomeTextWrapper}>
          <ImageBackground source={apples} style={styles.applesImage}>
            <View
              style={{
                paddingTop: 0,
                borderBottomColor: "white",
                borderBottomWidth: 3,
                width: 50,
                borderRadius: 9,
                padding: 0,
                margin: 0
              }}
            />

            {/* <Ionicons
              style={styles.arrow}
              name="ios-arrow-up"
              size={21}
              color="white"
            /> */}
            <Text style={styles.welcomeText}>
              Welcome to The Fruit Tree Finder{" "}
            </Text>
            <Text style={styles.welcomeSubheader}>
              Promote food justice. Prevent food waste. Strengthen our
              community.
            </Text>
          </ImageBackground>
        </View>

        <View style={styles.bottomOfDrawerWrapper}>
          <Text style={styles.subHeader}>
            Here is a map of the various fruit trees in your area.{" "}
          </Text>

          <Text style={styles.subHeader}>Happy Hunting!</Text>

          <View style={styles.iconWrapper}>
            <Foundation name="trees" size={24} color="#228B22" />
            <MaterialCommunityIcons
              name="food-apple"
              size={24}
              color="#a40000"
            />
          </View>

          <Text style={styles.subHeader}>
            Maybe: If you would like to learn more about the Portland Fruit Tree
            Project, please visit us on the web:
          </Text>
          <Image source={logo} style={styles.deepLinkImage} />
        </View>
      </React.Fragment>
    );
  };

    return (
      <BottomSheet
        snapPoints={[450, 105, 30]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={1}
      ></BottomSheet>
    );
    }


const styles = StyleSheet.create({
  welcomeTextWrapper: {
    width: "100%",
  },
  applesImage: {
    // padding: 10,
    height: 115,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextWrapper: {},
  welcomeText: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 15,
    marginBottom: 3,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  welcomeSubheader: {
    color: "white",
    textAlign: "center",
  },
  subHeader: {
    textAlign: "center",
  },
  iconWrapper: {
    alignSelf: "center",
    flexDirection: "row",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 28,
    borderRadius: 3,
  },
  searchIcon: {
    position: "absolute",
    bottom: 8,
    left: 4,
  },
  drawerBody: {
    backgroundColor: "red",
  },
  bottomOfDrawerWrapper: {
    paddingTop: 20,
    backgroundColor: "white",
    height: 400,
  },
  deepLinkImage: {
    marginTop: 10,
    width:80,
    height: 30,
    alignSelf: "center"
  }
});

export default DrawerHomeSwipe