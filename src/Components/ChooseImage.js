import React, { Component } from "react";
import { View, Button, Image, Picker } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { pickImage, cropImage, chooseLevel } from "../Redux/action";
import { connect } from "react-redux";
class ChooseImage extends Component {
  constructor(props) {
    super();
  }
  _crop = async () => {
    let arr = [];
    const croppedImageURI = await ImageManipulator.manipulateAsync(
      this.props.image,
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
      for (let i = 0; i < 4*this.props.level; i++) {
        for (let j = 0; j < 4*this.props.level; j++) {
          const obj = {
            x: i,
            y: j,
            isCorrect: false
          };
          arr.push(obj);
        }
      }
      this.props.cropImage(arr);
      this.props.pickImage(croppedImageURI.uri);
    }
  };
  render() {
    return (
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        {!!this.props.image && (
          <Image
            source={{ uri: this.props.image }}
            style={{ width: 400, height: 400, resizeMode: "stretch" }}
          />
        )}
        <Picker
          selectedValue={this.props.level}
          style={{ height: 50, width: 400, position: "relative" }}
          onValueChange={(itemValue, itemIndex) => {
            this.props.chooseLevel(itemValue);
          }}
        >
          <Picker.Item label="4x4" value={1} />
          <Picker.Item label="8x8" value={2} />
          <Picker.Item label="12x12" value={3} />
          <Picker.Item label="16x16" value={4} />
          <Picker.Item label="20x20" value={5} />
        </Picker>
        {!!this.props.image && (
          <Button
            width="100"
            color="black"
            style={{ fontWeight: "bold" }}
            title="Let's start"
            onPress={() => {
              this._crop();
              this.props.navigation.navigate("Game");
            }}
          ></Button>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image,
    level: state.level
  };
};
export default connect(mapStateToProps, { pickImage, cropImage, chooseLevel })(
  ChooseImage
);
