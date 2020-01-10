import React, { Component } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";


import { pickImage, cropImage } from "../Redux/action";
import { connect } from "react-redux";
class ChooseImage extends Component {
  constructor(props) {
    super();
  }
  _crop = async () => {
    let arr = [];
    const croppedImageURI = await ImageManipulator.manipulateAsync(
      this.props.image.uri,
      [
        {
          resize: {
            width: 1200,
            height: 1200
          }
        }
      ],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG
      }
    );
    if (croppedImageURI) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const obj = {
            x: i,
            y: j,
            isCorrect: false
          };
          arr.push(obj);
        }
      }
      this.props.cropImage(arr);
      this.props.pickImage(croppedImageURI);
    }
  };
  render() {
    return (
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        {!!this.props.image && (
          <Image
            source={{ uri: this.props.image.uri }}
            style={{ width: 400, height: 400, resizeMode: "stretch" }}
          />
        )}
        {!!this.props.image && (
          <Button
            width="100"
            color="black"
            style={{ fontWeight: "bold" }}
            title="Let's start"
            onPress={() => {
              this.props.navigation.navigate("Game");
              this._crop();
            }}
          ></Button>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image
  };
};
export default connect(mapStateToProps, { pickImage, cropImage })(ChooseImage);
