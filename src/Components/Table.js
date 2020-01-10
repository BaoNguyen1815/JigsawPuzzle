import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    marginTop : 10,
    width: 404,
    height: 404,
    position: "relative",
    borderRadius: 0,
    borderWidth: 1,

  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "black"
  }
});

export default class Table extends Component {

  render() {
    return (
      <View
        //
        style={styles.container}
      ></View>
    );
  }

}
