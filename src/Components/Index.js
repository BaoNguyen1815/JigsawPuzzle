import React, { Component } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { pickImage, cropImage } from "../Redux/action";
import { connect } from "react-redux";
import YourCamera from "./YourCamera";
import Collection from "./Collection";
import animalImg from "../assets/Cat-01.png";

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
            <YourCamera navigation={this.props.navigation}></YourCamera>
            <Collection
              navigation={this.props.navigation}
              link={animalImg}
              topic={"animalImages"}
            ></Collection>
          </View>
          <View style={styles.row}>
            <Collection
              navigation={this.props.navigation}
              link={require("../assets/city.png")}
              topic={"cityImages"}
            ></Collection>
            <Collection
              navigation={this.props.navigation}
              link={require("../assets/Art-01.png")}
              topic={"paintedImages"}
            ></Collection>
          </View>
          <View style={styles.row}></View>
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
