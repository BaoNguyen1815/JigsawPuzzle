import React, { Component } from "react";
import { View, ImageBackground, PanResponder, StatusBar } from "react-native";
import { connect } from "react-redux";
import { cropImage } from "../Redux/action";
import CroppedImage from "./CroppedImage";
import Table from "./Table";
import PieceList from "./PieceList";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

class Game extends Component {
  render() {
    const allImages = this.props.piecesAtTable.map((item, index) => (
      <CroppedImage
        key={index}
        x0={item.x0}
        y0={item.y0}
        correctX={item.piece.correctX}
        correctY={item.piece.correctY}
        top={item.piece.top}
        bot={item.piece.bot}
        left={item.piece.left}
        right={item.piece.right}
      ></CroppedImage>
    ));
    return (
      <ImageBackground
        source={require("../assets/images.jpeg")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.3 }}
      >
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={1}
          initialZoom={1}
          bindToBorders={true}
          onMoveShouldSetPanResponder={(evt, gesture) =>
            this.props.panresponder
          }

          style={{
            flex: 1,
            flexWrap: "wrap",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <View
            // onZoomAfter={this.logOutZoomState}
            style={{
              zIndex: 0,
              alignContent: "center",
              position: "relative"
            }}
          >
            <Table></Table>
            {allImages}
          </View>
        </ReactNativeZoomableView>
        <View
          style={{
            position: "relative",
            borderWidth: 1,
            backgroundColor: "white"
          }}
        >
          <PieceList></PieceList>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.image,
    pieces: state.pieces,
    piecesAtTable: state.piecesAtTable,
    level: state.level,
    panresponder: state.panresponder
  };
};

export default connect(mapStateToProps, { cropImage })(Game);
