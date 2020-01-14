import React, { Component } from "react";
import { View, PanResponder } from "react-native";
import { connect } from "react-redux";
import { isCorrect, ZIndexIncrease } from "../Redux/action";
import {
  ClipPath,
  G,
  Polygon,
  Text,
  Svg,
  Defs,
  Stop,
  Use,
  Mask,
  Path,
  Image
} from "react-native-svg";
class CroppedImage extends Component {
  constructor(props) {
    super();
    this.view = null;

    this.customStyle = {
      style: {
        top: 400 + Math.random() * 100,
        left: Math.random() * 290,
        zIndex: 0
      }
    };
    this.top = this.customStyle.style.top;
    this.left = this.customStyle.style.left;

    this.pansResponder = PanResponder.create({
      onPanResponderGrant: this._onPanResponderGrant.bind(this),
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
  };

  _isWinning = () => {
    let wincheck = 0;
    this.props.pieces.forEach(piece =>
      piece.isCorrect ? wincheck++ : wincheck
    );
    if (wincheck == 16) alert("Winning");
  };
  _onPanResponderGrant = (event, gestureState) => {
    this.props.ZIndexIncrease();
    this.customStyle.style.zIndex = this.props.zIndex;
    this.updateNativeProps();
  };
  _onPanResponderRelease = (event, gestureState) => {
    this.top += gestureState.dy;
    this.left += gestureState.dx;
    let leftX = 1 + (100 * this.props.correctX - 29) / this.props.level;
    let topY = 11 + (100 * this.props.correctY - 29) / this.props.level;
    const e = 30 / this.props.level;
    if (
      this.customStyle.style.top < topY + e &&
      this.customStyle.style.top > topY &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX + e
    ) {
      this._isCorrect(leftX, topY);
    } else if (
      this.customStyle.style.top < topY &&
      this.customStyle.style.top > topY - e &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX - e
    ) {
      this._isCorrect(leftX, topY);
    } else if (
      this.customStyle.style.top < topY + e &&
      this.customStyle.style.top > topY &&
      this.customStyle.style.left > leftX - e &&
      this.customStyle.style.left < leftX
    ) {
      this._isCorrect(leftX, topY);
    } else if (
      this.customStyle.style.top < topY &&
      this.customStyle.style.top > topY - e &&
      this.customStyle.style.left > leftX &&
      this.customStyle.style.left < leftX + e
    ) {
      this._isCorrect(leftX, topY);
    } else {
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
    const parameter = 160/this.props.level;
    const X = 0;
    const Y = 0;
    const t = this.props.top;
    const b = this.props.bot;
    const l = this.props.left;
    const r = this.props.right;
    return (
      <View
        style={{
          width: parameter,
          height: parameter,
          position: "absolute",
          overflow: "hidden"
        }}
        {...this.pansResponder.panHandlers}
        ref={view => (this.view = view)}
      >
        <Svg
          style={{
            width: parameter,
            height: parameter
          }}
          {...this.pansResponder.panHandlers}
          ref={view => (this.view = view)}
          position="absolute"
          viewBox={`${-29 / this.props.level} ${-29 / this.props.level} ${160 /
            this.props.level} ${parameter}`}
        >
          <Defs>
            <ClipPath id="clip">
              <Path
                transform={{
                  scale: `${1 / this.props.level},${1 / this.props.level}`
                }}
                stroke="red"
                strokeOpacity={0}
                strokeWidth={3}
                d={`M${X} ${Y} L${X + 40} ${Y} C${X - 15 + 40} ${Y -
                  29 * t}, ${X + 15 + 60} ${Y - 29 * t}, ${X + 60} ${Y}, L${X +
                  100} ${Y} L${X + 100} ${Y + 40} C${X + 100 - 29 * r} ${Y +
                  40 -
                  15}, ${X + 100 - 29 * r} ${Y + 60 + 15}, ${X + 100} ${Y +
                  60}, L${X + 100} ${Y + 100} L${X + 100 - 40} ${Y + 100} C${X +
                  100 -
                  40 +
                  15} ${Y + 100 + 29 * b}, ${X + 100 - 60 - 15} ${Y +
                  100 +
                  29 * b}, ${X + 100 - 60} ${Y + 100}, L${X} ${Y +
                  100} L${X} ${Y + 100 - 40} C${X + 29 * l} ${Y +
                  100 -
                  40 +
                  15}, ${X + 29 * l} ${Y - 15 + 100 - 60}, ${X} ${Y +
                  100 -
                  60} Z`}
              ></Path>
            </ClipPath>
          </Defs>
          <Image
            x={0 - 100 * this.props.correctX/this.props.level}
            y={-0 - 100 * this.props.correctY/this.props.level}
            width={400}
            height={400}
            href={this.props.image}
            clipPath="url(#clip)"
          ></Image>
          <Path
            stroke="grey"
            fill="none"
            strokeWidth={0.5}
            transform={{
              scale: `${1 / this.props.level},${1 / this.props.level}`
            }}
            d={`M${X} ${Y} L${X + 40} ${Y} C${X - 15 + 40} ${Y - 29 * t}, ${X +
              15 +
              60} ${Y - 29 * t}, ${X + 60} ${Y}, L${X + 100} ${Y} L${X +
              100} ${Y + 40} C${X + 100 - 29 * r} ${Y + 40 - 15}, ${X +
              100 -
              29 * r} ${Y + 60 + 15}, ${X + 100} ${Y + 60}, L${X + 100} ${Y +
              100} L${X + 100 - 40} ${Y + 100} C${X + 100 - 40 + 15} ${Y +
              100 +
              29 * b}, ${X + 100 - 60 - 15} ${Y + 100 + 29 * b}, ${X +
              100 -
              60} ${Y + 100}, L${X} ${Y + 100} L${X} ${Y + 100 - 40} C${X +
              29 * l} ${Y + 100 - 40 + 15}, ${X + 29 * l} ${Y -
              15 +
              100 -
              60}, ${X} ${Y + 100 - 60} Z`}
          ></Path>
        </Svg>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    image: state.image,
    pieces: state.pieces,
    zIndex: state.zIndex,
    level: state.level
  };
};

export default connect(mapStateToProps, { isCorrect, ZIndexIncrease })(
  CroppedImage
);
//Increase zIndex
