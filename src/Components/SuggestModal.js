import React, { Component } from "react";
import { Modal, Image, View, Button } from "react-native";
import { connect } from "react-redux";

class SuggestModal extends Component {
  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Image source={this.props.img}></Image>
            </View>
            <Button title="X"></Button>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps)(SuggestModal);
