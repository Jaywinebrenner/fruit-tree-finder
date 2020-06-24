
// Didn't work calling in the return and it's making me insane, but works if I run the code (lines 5 - 22) in the return. Fuck me.

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