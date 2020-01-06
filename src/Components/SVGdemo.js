import React, { Component } from "react";
import { View } from "react-native";
import {
  ClipPath,
  G,
  Polygon,
  Text,
  Svg,
  Defs,
  Stop,
  Use,
  Image,
  Mask,
  Path
} from "react-native-svg";
export default class SVGdemo extends Component {
  render() {
    const X = 0;
    const Y = 0;
    return (
      <Svg height="120" width="120">
        <Defs>
          <ClipPath id="clip">
            <Path
              d={`M${X} ${Y} L${X + 40} ${Y} C${X + 40} ${Y - 20}, ${X +
                60} ${Y - 20}, ${X + 60} ${Y}, L${X + 100} ${Y} L${X +
                100} ${Y + 40} C${X + 100 - 20} ${Y + 40}, ${X + 100 - 20} ${Y +
                60}, ${X + 100} ${Y + 60}, L${X + 100} ${Y + 100} L${X +
                100 -
                40} ${Y + 100} C${X + 100 - 40} ${Y + 100 + 20}, ${X +
                100 -
                60} ${Y + 100 + 20}, ${X + 100 - 60} ${Y + 100}, L${X} ${Y +
                100} L${X} ${Y + 100 - 40} C${X + 20} ${Y + 100 - 40}, ${X+20} ${Y+100-60}, ${X} ${Y+100-60} Z`}
            ></Path>
          </ClipPath>
        </Defs>

        <Image
          x="-150"
          y="-100"
          width="400"
          height="400"
          href={require("../assets/background.jpg")}
          clipPath="url(#clip)"
        ></Image>
      </Svg>
    );
  }
}
