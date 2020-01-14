import React, { Component } from "react";
import { View, Text, Image, Modal, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { cropImage } from "../Redux/action";
import CroppedImage from "./CroppedImage";
import Table from "./Table";
class Game extends Component {
  render() {
    const allImages = () => {
      const arr = [];

      var tmp = 1;
      for (let i = 0; i < 4*this.props.level; i++) {
        for (let j = 0; j < 4*this.props.level; j++) {
          const length = 4*this.props.length-1;
          const top = 1 * tmp;
          const bot = 1 * tmp;
          const left = 1 * tmp;
          const right = 1 * tmp;
          if (j == 0) {
            top = 0;
          }
          if (j == length) {
            bot = 0;
          }
          if (i == 0) {
            left = 0;
          }
          if (i == length) {
            right = 0;
          }
          tmp = tmp * -1;
          arr.push(
            <CroppedImage
              key={`${i}-${j}`}
              correctX={i}
              correctY={j}
              top={top}
              bot={bot}
              left={left}
              right={right}
            ></CroppedImage>
          );
        }
        tmp = tmp * -1;
      }
      return arr;
    };

    return (
      <ImageBackground
        source={require("../assets/images.jpeg")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.3 }}
      >
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              position: "relative"
            }}
          >
            <Table></Table>
          </View>
          {allImages()}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image,
    pieces: state.pieces,
    level: state.level
  };
};

export default connect(mapStateToProps, { cropImage })(Game);
