import React, { Component } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { pickImage, cropImage } from "../Redux/action";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
class YourCamera extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this._pickImage}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            backgroundColor: "#696969",
            width: 150,
            height: 150,
            borderWidth: 5,
            borderColor: "#FAEBD7"
          }}
        >
          <Image
            style={{ width: 140, height: 140, resizeMode: "stretch" }}
            source={require("../assets/Camera-05.png")}
          ></Image>

        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

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
      this.props.pickImage(result);
    }
    this.props.navigation.navigate("ChooseImage");
  };
}
const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, { pickImage, cropImage })(YourCamera);
