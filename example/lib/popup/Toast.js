import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import React, { Component } from 'react'

export default class Toast extends Component {
  static _popupStub

  static init (popupStub) {
    Toast._popupStub = popupStub
  }

  static show (msg, duration) {
    const id = Toast._popupStub.addPopup(
      <View style={styles.content}>
        <Text style={styles.text}>{msg}</Text>
      </View>
    )

    setTimeout(() => {
      Toast._popupStub.removePopup(id)
    }, duration || 1000)
  }
}

const styles = StyleSheet.create({
  content: {
    width: 178,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5
  },
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
})
