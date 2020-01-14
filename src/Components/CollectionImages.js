import React, { Component } from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { pickImage, cropImage } from "../Redux/action";
import { Asset } from "expo-asset";
import { connect } from "react-redux";

class CollectionImages extends Component {
  constructor(props) {
    super();
  }
  _onpress = () => {
    this.props.pickImage(Asset.fromModule(this.props.source).uri);
    this.props.navigation.navigate("ChooseImage");
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this._onpress()}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              backgroundColor: "#696969",
              width: 300,
              height: 300,
              borderWidth: 5,
              borderColor: "#FAEBD7",
              marginBottom: "10%",
              position: "relative"
            }}
          >
            <Image
              source={this.props.source}
              style={{ width: 300, height: 300, resizeMode: "stretch" }}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const MapStateToProps = state => {
  return {
    topic: state.topic
  };
};
export default connect(MapStateToProps, { pickImage })(CollectionImages);
