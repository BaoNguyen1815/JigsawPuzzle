import React, { Component } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import FlatListPiece from "./FlatListPiece";
import { connect } from "react-redux";

class PieceList extends Component {

  render() {
    return (
      <FlatList
      scrollEnabled = {this.props.scrollEnabled}
        style={{
          overflow: "visible"
        }}
        data={this.props.pieces}
        horizontal={true}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <FlatListPiece
            key={item.key}
            index={index}
            correctX={item.correctX}
            correctY={item.correctY}
            top={item.top}
            bot={item.bot}
            left={item.left}
            right={item.right}
          />
        )}
      ></FlatList>
    );
  }
}

const mapStateToProps = state => {
  return {
    level: state.level,
    pieces: state.pieces,
    scrollEnabled : state.scrollEnabled
  };
};

export default connect(mapStateToProps)(PieceList);
