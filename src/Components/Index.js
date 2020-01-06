import React, { Component } from "react";
import { View, Button, Image, ImageBackground, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { pickImage, cropImage } from "../Redux/action";
import { connect } from "react-redux";
import * as types from "../Redux/constants";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import SVGdemo from "./SVGdemo";

class Index extends Component {
  constructor(props) {
    super();
    this.arr = [];
  }
  render() {
    return (
      // <ImageBackground
      //   source={require("../assets/background.jpg")}
      //   style={{ width: "100%", height: "100%" }}
      //   imageStyle={{ opacity: 0.3 }}
      // >
      //   <View
      //     style={{
      //       flex: 1,
      //       alignItems: "center",
      //       justifyContent: "center"
      //     }}
      //   >
      //     <Button
      //       color="white"
      //       style={{
      //         fontWeight: "bold"
      //       }}
      //       title="Pick an image from camera roll"
      //       onPress={this._pickImage}
      //     />
      //     {!!this.props.image && (
      //       <Image
      //         source={{ uri: this.props.image.uri }}
      //         style={{ width: 400, height: 400, resizeMode: "stretch" }}
      //       />
      //     )}
      //     {!!this.props.image && (
      //       <Button
      //         color="white"
      //         style={{ fontWeight: "bold" }}
      //         title="Let's start"
      //         onPress={() => {
      //           this.props.navigation.navigate("Game");
      //           console.log(this.props.image)
      //         }}
      //       ></Button>
      //     )}
      //   </View>
      // </ImageBackground>
      <SVGdemo></SVGdemo>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  _crop = async (i, j) => {
    const croppedImageURI = await ImageManipulator.manipulateAsync(
      this.props.image.uri,
      [
        {
          resize: {
            width: 1200,
            height: 1200
          }
        },
        {
          crop: {
            originX: 300 * i,
            originY: 300 * j,
            width: 300,
            height: 300
          }
        }
      ],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG
      }
    );
    if (croppedImageURI) {
      const obj = {
        image: croppedImageURI,
        x: i,
        y: j,
        isCorrect: false
      };
      this.arr.push(obj);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    this.arr = [];
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.cancelled) {
      // this.setState({ image: result.uri });
      // console.log(result.uri);
      this.props.pickImage(result);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          this._crop(i, j);
        }
      }
      this.props.cropImage(this.arr);
    }
  };
}
const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, { pickImage, cropImage })(Index);
