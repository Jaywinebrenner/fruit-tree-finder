
// MapScreen - Didn't work calling in the return and it's making me insane, but works if I run the code (lines 5 - 22) in the return. Fuck me.

const { default: ListScreen } = require("./screens/ListScreen");

const mapTrees = () => {
  trees.map((tree, index) => {
    let latitude = tree.coordinate.latitude;
    let longitude = tree.coordinate.longitude;
    console.log("lat", latitude);
    console.log("long", longitude);

    return (
      <Marker
        key={index}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title={tree.title}
        description={tree.description}
      ></Marker>
    );
  });
};

// Single test that was working when calling in the return. WTFFFFF.
  const singleTest = () => {
    return (
      <View>
        <Marker
          coordinate={{
            latitude: trees[0].coordinate.latitude,
            longitude: trees[0].coordinate.longitude,
          }}
          title="Italian Plum"
          description="Giant Tree. Tall, terrifying."
        ></Marker>
      </View>
    );
  };

// map loop that spins out markers on maps for data like constants>markers

  {
    trees.map((tree, index) => {
      let latitude = tree.coordinate.latitude;
      let longitude = tree.coordinate.longitude;

      return (
        <Marker
          key={index}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={tree.title}
          description={tree.description}
        ></Marker>
      );
    });
  }

  // Looping through Map Database in ListScreen
       {treeList &&
            Object.values(treeList).map((value, index) => {
              return (
                <View style={styles.cardContainer} key={index}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardTitleText}>{value.type}</Text>
                    <Text style={styles.cardDistanceText}>
                      {milesOrYards(value.distance)}
                    </Text>
                  </View>

                  <View style={styles.cardMiddle}>
                    <Text elipsesMode="tail" style={styles.cardDescriptionText}>
                      {value.description.length > 40
                        ? value.description.substring(0, 40 - 4) + "..."
                        : value.description}
                    </Text>
                  </View>

                  <View style={styles.bottom}>
                    <TouchableOpacity
                      style={styles.cardDetailsButtonWrapper}
                      onPress={() =>
                        navigation.navigate("ListItemDetailScreen", {
                          index,
                          ...value,
                        })
                      }
                    >
                      <Text style={styles.cardDetailsButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })} 