import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

const EditMyTreeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Edit my tree screen</Text>

      <TouchableOpacity
        style={styles.detailsButtonWrapper}
        onPress={() => navigation.navigate("My Trees")}
      >
        <Text style={styles.detailsButtonText}>Back to Tree List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
});

export default EditMyTreeScreen