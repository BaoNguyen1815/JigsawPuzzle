import React, { Component } from "react";
import { View, Button, Image, Picker } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { pickImage, cropImage, chooseLevel,isCorrect } from "../Redux/action";
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
      let tmp = 1;
      for (let i = 0; i < 4 * this.props.level; i++) {
        for (let j = 0; j < 4 * this.props.level; j++) {
          const length = 4 * this.props.level - 1;
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
          arr.push({
            key: `${i}-${j}`,
            correctX: i,
            correctY: j,
            top: top,
            bot: bot,
            left: left,
            right: right,
            isCorrect : false,
          });
        }
        tmp = tmp * -1;
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
              this.props.isCorrect([])
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
export default connect(mapStateToProps, { pickImage, cropImage, chooseLevel,isCorrect })(
  ChooseImage
);
