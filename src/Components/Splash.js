import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> SPLASH SCREEN </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'rgb(32,53,70)',
    flex : 1,
    alignItems : 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight : "bold",
    fontSize: 28,
    color : 'white'
  }
})
