import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('window').width;

const DestinationButton = (props) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.container}>
        <View style={styles.leftCol}>
          <Text style={{ fontSize: 10 }}> {"\u25A0"}</Text>
        </View>

        <View style={styles.centerCol}>
          <Text style={{ fontSize: 20 }}>Where to?</Text>
        </View>

        <View style={styles.rightCol}>
          <Ionicons name="ios-ice-cream" size={24} color="black" style={{alignSelf: "center"}}/>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: "absolute",
        flexDirection: 'row',
        width: (WIDTH - 40),
        height: 60,
        top: 110,
        left: 20, 
        borderRadius: 2,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: 'black',
        elevation: 2,
        shadowRadius: 5,
        shadowOpacity: .6,
    },
    leftCol: {
        flex: 1,
        alignItems: "center",
    },
    centerCol: {
        flex: 4
    },
    rightCol: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: 'blue'
    }
})

export default DestinationButton;