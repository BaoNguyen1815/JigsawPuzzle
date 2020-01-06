import React, { Component } from "react";
import { View, Image, PanResponder } from "react-native";
import { connect } from "react-redux";
import { isCorrect } from "../Redux/action";
class CroppedImage extends Component {
  constructor(props) {
    super();
    this.view = null;

    this.customStyle = {
      style: {
        top: Math.random() * 400,
        left: Math.random() * 400
      }
    };
    this.top = this.customStyle.style.top;
    this.left = this.customStyle.style.left;
    this.pansResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }

  componentDidMount() {
    this.view && this.view.setNativeProps(this.customStyle);
  }
  updateNativeProps() {
    this.view && this.view.setNativeProps(this.customStyle);
  }
  _isCorrect = (leftX, topY) => {
    this.customStyle.style.left = leftX;
    this.customStyle.style.top = topY;
    let arr = this.props.pieces;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x == this.props.correctX && arr[i].y == this.props.correctY) {
        arr[i].isCorrect = true;
      }
    }
    this.props.isCorrect(arr);
  };
  _isNotCorrect = () => {
    let arr = this.props.pieces;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x == this.props.correctX && arr[i].y == this.props.correctY) {
        arr[i].isCorrect = false;
      }
    }
    this.props.isCorrect(arr);
  }

  _isWinning = () => {
    let wincheck = 0;
    this.props.pieces.forEach(piece =>
      piece.isCorrect ? wincheck++ : wincheck
    );
    if (wincheck == 16) alert("Winning");
  };
  _onPanResponderRelease = (event, gestureState) => {
    this.top += gestureState.dy;
    this.left += gestureState.dx;
    let leftX = 2 + 100 * this.props.correctX;
    let topY = 134 + 100 * this.props.correctY;
    if (
      this.customStyle.style.top < topY + 30 &&
      this.customStyle.style.top > topY &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX + 30
    ) {
      this._isCorrect(leftX, topY);
    }
    else if (
      this.customStyle.style.top < topY &&
      this.customStyle.style.top > topY - 30 &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX - 30
    ) {
      this._isCorrect(leftX, topY);
    }

    else if (
      this.customStyle.style.top < topY + 30 &&
      this.customStyle.style.top > topY &&
      this.customStyle.style.left > leftX - 30 &&
      this.customStyle.style.left < leftX
    ) {
      this._isCorrect(leftX, topY);
    }
    else if (
      this.customStyle.style.top < topY &&
      this.customStyle.style.top > topY - 30 &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX + 30
    ) {
      this._isCorrect(leftX, topY);
    }
    else{
      this._isNotCorrect();
    }
    this.updateNativeProps();
    this._isWinning();
  };
  _onPanResponderMove = (event, gestureState) => {
    this.customStyle.style.top = this.top + gestureState.dy;
    this.customStyle.style.left = this.left + gestureState.dx;
    this.updateNativeProps();
  };

  render() {
    return (
      <Image
        source={{ uri: this.props.imageUri }}
        {...this.pansResponder.panHandlers}
        ref={view => (this.view = view)}
        style={{
          width: 100,
          height: 100,
          borderWidth: 1,
          borderColor: "black",
          position: "absolute"
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    image: state.image,
    pieces: state.pieces
  };
};

export default connect(mapStateToProps, { isCorrect })(CroppedImage);
