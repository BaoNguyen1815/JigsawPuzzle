import React, { Component } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";
import { Asset } from "expo-asset";
import { connect } from "react-redux";

class CollectionImages extends Component {

  render() {
    return (
      <TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            backgroundColor: "#696969",
            width: 150,
            height: 150,
            borderWidth: 5,
            borderColor: "#FAEBD7"
          }}
        >
          {/* <Image
            source=}
            style={{ width: 140, height: 140, resizeMode: "stretch" }}
          ></Image> */}
        </View>
      </TouchableOpacity>
    );
  }
}
const MapStateToProps = state => {
  return {
    topic: state.topic
  };
};
export default connect(MapStateToProps)(CollectionImages);
