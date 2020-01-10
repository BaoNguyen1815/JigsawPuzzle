import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet
} from "react-native";
import Constanxts from "expo-constants";
import { connect } from "react-redux";
import animalImg from "../assets/Cat-01.png";
import CollectionImages from "./CollectionImages";
export default class CollectionPage extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.col}>
          <View style={styles.row}>
            <CollectionImages></CollectionImages>
          </View>
          <View style={styles.row}>
            <CollectionImages></CollectionImages>
          </View>
          <View style={styles.row}></View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
