import React, { Component } from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CollectionImages from "./CollectionImages";
import animalImages from "../assets/Animal/index";
import cityImages from "../assets/City/index";
import paintedImages from "../assets/Painted/index";

class CollectionPage extends Component {
  render() {
    const AllImage = () => {
      return Object.keys(images[this.props.topic]).map((key, index) => (
        <CollectionImages
          navigation={this.props.navigation}
          source={images[this.props.topic][key]}
          key={key}
        ></CollectionImages>
      ));
    };

    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.col}>
          <AllImage></AllImage>
        </View>
      </ImageBackground>
    );
  }
}
//TODO :style

const images = {
  animalImages: animalImages,
  cityImages: cityImages,
  paintedImages: paintedImages
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    alignContent: "center",
    marginTop: 150,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
const MapStateToProps = state => {
  return {
    topic: state.topic
  };
};
export default connect(MapStateToProps)(CollectionPage);
