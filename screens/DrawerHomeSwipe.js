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
import logo from "../media/logoWhite.png";
import applePainting from "../media/apple-painting.png"
import maroonGradient from "../assets/maroonGradient.png";


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
          <View style={styles.topStrip}>
            {/* <ImageBackground
              source={maroonGradient}
              style={styles.gradientImageTopStrip}
            > */}
              <View
                style={{
                  paddingTop: 0,
                  borderBottomColor: "black",
                  borderBottomWidth: 3,
                  width: 50,
                  borderRadius: 9,
                  padding: 0,
                  margin: 0,
                }}
              />
   
            </View>
          <ImageBackground source={apples} style={styles.applesImage}>
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
          <ImageBackground source={maroonGradient} style={styles.gradientImage}>
            <Text style={styles.pickDeliciousSubheader}>
              {" "}
              Pick delicious food from the thriving bounties growing in your
              very neighborhood.
            </Text>
            <Text style={styles.subheader}>
              {" "}
              Explore our map of the various fruit trees in your area.{" "}
            </Text>

            <Text style={styles.subheader}>Happy Hunting!</Text>

            {/* <View style={styles.iconWrapper}>
              <Image style={styles.applePainting} source={applePainting} />
            </View> */}
            <View style={styles.linkWrapper}>
              <Text style={styles.linkSubheader}>
                If you would like to learn more about the Portland Fruit Tree
                Project, please visit us on the web:
              </Text>
              <Image source={logo} style={styles.deepLinkImage} />
            </View>
          </ImageBackground>
        </View>
      </React.Fragment>
    );
  };

  return (
    <BottomSheet
      snapPoints={[500, 130, 30]}
      renderHeader={renderHeader}
      renderContent={renderContent}
      initialSnap={2}
    />
  );
}


const styles = StyleSheet.create({
  welcomeTextWrapper: {
    width: "100%",
  },
  applesImage: {
    padding: 10,
    height: 115,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextWrapper: {},
  welcomeText: {
    textAlign: "center",
    fontSize: 22,
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
    fontSize: 15,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  pickDeliciousSubheader: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    lineHeight: 22,
    paddingTop: 20,
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
    // paddingTop: 20,
    backgroundColor: "white",
    height: 400,
  },
  deepLinkImage: {
    marginTop: 5,
    width: 180,
    height: 60,
    alignSelf: "center",
  },
  linkWrapper: {
    marginTop: 0,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
  },
  subheader: {
    textAlign: "center",
    color: "white",
  },
  linkSubheader: {
    fontSize: 10,
    textAlign: "center",
    color: "white"
  },
  applePainting: {
    height: 80,
    width: 90,
    marginBottom: 15,
    marginTop: 5,
  },
  topStrip: {
    height: 30,
    backgroundColor: "rgba(255, 255, 255, .7)",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientImage: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  gradientImageTopStrip: {
    height: "100%",
    width: "100%",
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawerHomeSwipe
