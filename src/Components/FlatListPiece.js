import React, { Component } from "react";
import { PanResponder, View } from "react-native";
import { ClipPath, Svg, Defs, Path, Image } from "react-native-svg";
import { connect } from "react-redux";
import { removeImage, scrollEnabled } from "../Redux/action";
class FlatListPiece extends Component {
  constructor(props) {
    super();
    this.view = null;
    this.customStyle = {
      style: {
        top: 0,
        left: 0
      }
    };
    this.top = this.customStyle.style.top;
    this.left = this.customStyle.style.left;
    this.state = {
      isInList: true
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gesture) => true,
      onMoveShouldSetPanResponder: (evt, gesture) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderGrant: this._onPanResponderGrant.bind(this),
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
      onPanResponderTerminate: this._onPanResponderRelease.bind(this)
    });
  }
  componentDidMount() {
    // this.view && this.view.setNativeProps(this.customStyle);
  }

  updateNativeProps() {
    this.view && this.view.setNativeProps(this.customStyle);
  }
  _onPanResponderGrant = (event, gestureState) => {
    this.customStyle.style.top = gestureState.y0 - event.nativeEvent.locationY;
    this.customStyle.style.left = gestureState.x0 - event.nativeEvent.locationX;
    this.updateNativeProps();
  };
  _onPanResponderMove = (event, gestureState) => {
    this.customStyle.style.top = this.top + gestureState.dy;
    this.customStyle.style.left = this.left + gestureState.dx;
    this.props.scrollEnabled();
    this.updateNativeProps();
  };

  _onPanResponderRelease = (event, gestureState) => {
    if (this.state.isInList && gestureState.dy < -40) {
      this.props.removeImage(
        this.props.index,
        gestureState.moveX,
        gestureState.moveY
      );
      this.props.scrollEnabled();
      // console.log(event.nativeEvent);
      console.log(gestureState);

      this.setState({
        isInList: false
      });
    }
    console.log("===================================================");
  };

  render() {
    const parameter = 160 / 2;
    const X = 0;
    const Y = 0;
    const t = this.props.top;
    const b = this.props.bot;
    const l = this.props.left;
    const r = this.props.right;

    return (
      <View
        // onLayout = {(nativeEvent)=>{
        //  console.log(nativeEvent)
        // }}
        {...this.panResponder.panHandlers}
        ref={view => (this.view = view)}
        style={{
          width: parameter,
          height: parameter,
          position: "relative",
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
          viewBox={`${-29 / 2} ${-29 / 2} ${160 / 2} ${parameter}`}
        >
          <Defs>
            <ClipPath id="clip">
              <Path
                transform={{
                  scale: `${1 / 2},${1 / 2}`
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
            x={0 - 50 * this.props.correctX}
            y={-0 - 50 * this.props.correctY}
            width={200 * this.props.level}
            height={200 * this.props.level}
            href={this.props.image}
            clipPath="url(#clip)"
          ></Image>
          <Path
            stroke="grey"
            fill="none"
            strokeWidth={0.5}
            transform={{
              scale: `${1 / 2},${1 / 2}`
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
    level: state.level
  };
};

export default connect(mapStateToProps, { removeImage, scrollEnabled })(
  FlatListPiece
);
