import React from "react";
import MapView, { Marker } from "react-native-maps";



export default class Driver extends React.Component {
    constructor(props) {
        super(props);

        const driver = this.props.driver ? 
        this.props.driver : 
        { 
            uid: "noDriverPassed", 
        location: {latitude: 0, longitude: 0 }
        }
    const coordinate = new MapView.AnimatedRegion({
        latitude: driver.location.latitude,
        longitude: driver.location.longitude,
    })

    this.state = {
        driver: driver,
        coordinate: coordinate,

    }

    }

render() {
    return (
        <MapView.Marker.Animated
            coordinate={this.state.coordinate}
            anchor={{x: 0.35, y: 0.32}}
            ref={marker => { this.marker = marker }} 
            >
            {/* <Image
                source={require('../media/tree3.jpg')}
                style={{ width: 32, height: 32}}
            /> */}
        </MapView.Marker.Animated>
    )
    }

}

//TO GO IN APP>JS
        // <Driver
        //   driver={{
        //     uid: "null",
        //     location: {
        //       latitude: 45.824698,
        //       longitude: -122.2655507,
        //     },
        //   }}
        // />;