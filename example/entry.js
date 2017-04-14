/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text, TouchableHighlight,
  View
} from 'react-native'
import { PopupStub, Toast } from './lib'

export default class example extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            Toast.show('This is a Toast')
          }}>
          <Text>Show Toast</Text>
        </TouchableHighlight>

        {/* Set PopupStub and Init Toast */}
        <PopupStub ref={component => {
          Toast.init(component)
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
