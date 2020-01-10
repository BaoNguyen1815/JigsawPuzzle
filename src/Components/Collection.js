import React, { Component } from 'react'
import { View, Button, Image, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";
import { connect } from "react-redux";
import { chooseTopic } from "../Redux/action";

class Collection extends Component {

  render() {
             return (
               <TouchableOpacity onPress={this._onPress}>
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
                     source={this.props.link}
                   ></Image>
                 </View>
               </TouchableOpacity>
             );
           }
  _onPress = () => {
    this.props.chooseTopic(this.props.topic);
    this.props.navigation.navigate("CollectionPage");
  }
}
export default connect(null,{chooseTopic})(Collection)
