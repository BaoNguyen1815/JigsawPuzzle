import React, { Component } from "react";
import { View, Text, Image, Modal, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { cropImage } from "../Redux/action";
import CroppedImage from "./CroppedImage";
import Table from "./Table";
import SuggestModal from "./SuggestModal";

class Game extends Component {
  constructor(props) {
    super();
    this.state = {
      modalVisible: false
    };
  }
  _setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  componentDidMount() {}

  render() {
    const allImages = this.props.pieces.map((img, index) => (
      <CroppedImage
        key={index}
        correctX={img.x}
        correctY={img.y}
        imageUri={img.image.uri}
      ></CroppedImage>
    ));
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
            justifyContent: "center",
            alignSelf: "center",
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
          {allImages}

          {/* <SuggestModal modalVisible={this.state.modalVisible}></SuggestModal> */}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image,
    pieces: state.pieces
  };
};

export default connect(mapStateToProps, { cropImage })(Game);
