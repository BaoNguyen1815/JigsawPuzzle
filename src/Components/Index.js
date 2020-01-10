import React, { Component } from "react";
import {
  View,
  Button,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { pickImage, cropImage } from "../Redux/action";
import { connect } from "react-redux";
import YourCamera from "./YourCamera"
import * as types from "../Redux/constants";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import Collection from "./Collection";
import animalImg from "../assets/Cat-01.png"

class Index extends Component {
  constructor(props) {
    super();
    this.arr = [];
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
            <YourCamera navigation = {this.props.navigation}></YourCamera>
            <Collection
            navigation = {this.props.navigation}
            link = {animalImg}
            topic = {"Animal"}
            ></Collection>
          </View>
          <View style={styles.row}>
          </View>
          <View style={styles.row}>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, { pickImage, cropImage })(Index);

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
