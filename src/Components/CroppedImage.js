import React, { Component } from "react";
import { View, PanResponder } from "react-native";
import { connect } from "react-redux";
import { isCorrect, ZIndexIncrease, panResponder } from "../Redux/action";
import { ClipPath, Svg, Defs, Path, Image } from "react-native-svg";
class CroppedImage extends Component {
  constructor(props) {
    super();
    this.view = null;
    this.customStyle = {
      style: {
        top: props.y0,
        left: props.x0,
        zIndex: 1
      }
    };
    this.onMoveShouldSetPanResponder = true;
    this.top = this.customStyle.style.top;
    this.left = this.customStyle.style.left;

    this.pansResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.onMoveShouldSetPanResponder,
      onStartShouldSetPanResponder: (evt, gestureState) => this.onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponder: (event, gestureState) => this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this._onPanResponderGrant.bind(this),
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }

  componentDidMount() {
    this.checkCorrect();
    this.view && this.view.setNativeProps(this.customStyle);
  }

  checkCorrect = () => {
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
  };

  updateNativeProps() {
    this.view && this.view.setNativeProps(this.customStyle);
  }
  _isCorrect = (leftX, topY) => {
    this.customStyle.style.left = leftX;
    this.customStyle.style.top = topY;
    let arr = this.props.piecesAtTable;
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].piece.correctX == this.props.correctX &&
        arr[i].piece.correctY == this.props.correctY
      ) {
        arr[i].piece.isCorrect = true;
      }
    }
    this.props.isCorrect(arr);
    this.customStyle.style.zIndex = 1;
    this.onMoveShouldSetPanResponder = false;
  };
  _isNotCorrect = () => {
    let arr = this.props.piecesAtTable;
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].piece.correctX == this.props.correctX &&
        arr[i].piece.correctY == this.props.correctY
      ) {
        arr[i].piece.isCorrect = false;
      }
    }
    this.props.isCorrect(arr);
  };

  _isWinning = () => {
    let wincheck = 0;
    this.props.piecesAtTable.forEach(piece =>
      piece.piece.isCorrect ? wincheck++ : wincheck
    );
    if (wincheck == 16*this.props.level*this.props.level) alert("Winning");
  };
  _onPanResponderGrant = (event, gestureState) => {
    this.props.panResponder();
    this.props.ZIndexIncrease();
    this.customStyle.style.zIndex = this.props.zIndex;
    this.updateNativeProps();
  };
  _onPanResponderRelease = (event, gestureState) => {
    this.props.panResponder();
    this.top += gestureState.dy;
    this.left += gestureState.dx;
    this.checkCorrect();
    this.updateNativeProps();
    this._isWinning();
  };
  _onPanResponderMove = (event, gestureState) => {
    this.customStyle.style.top = this.top + gestureState.dy/this.props.zoomLevel;
    this.customStyle.style.left = this.left + gestureState.dx/this.props.zoomLevel;
    this.updateNativeProps();
  };

  render() {
    const parameter = 160 / this.props.level;
    const X = 0;
    const Y = 0;
    const t = this.props.top;
    const b = this.props.bot;
    const l = this.props.left;
    const r = this.props.right;
    return (
      <View
        {...this.pansResponder.panHandlers}
        ref={view => (this.view = view)}
        style={{
          width: parameter,
          height: parameter,
          position: "absolute",
          overflow: "hidden",
          flex: 1
        }}
      >
        <Svg
          style={{
            width: parameter,
            height: parameter
          }}
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
            x={0 - (100 * this.props.correctX) / this.props.level}
            y={-0 - (100 * this.props.correctY) / this.props.level}
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
    piecesAtTable: state.piecesAtTable,
    zIndex: state.zIndex,
    level: state.level,
    zoomLevel : state.zoomLevel
  };
};

export default connect(mapStateToProps, {
  isCorrect,
  ZIndexIncrease,
  panResponder
})(CroppedImage);
//Increase zIndex
