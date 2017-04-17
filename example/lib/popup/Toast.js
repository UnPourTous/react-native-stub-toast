import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import React, { Component } from 'react'

export default class Toast extends Component {
  static _popupStub
  static showingToast = []

  static init (popupStub) {
    Toast._popupStub = popupStub
  }

  static show (msg, duration) {
    // prevent duplicate msg
    if (Toast.showingToast.indexOf(msg) !== -1) {
      return
    }
    Toast.showingToast.push(msg)

    const id = Toast._popupStub.addPopup(
      <View style={styles.content}>
        <Text style={styles.text}>{msg}</Text>
      </View>
    )

    setTimeout(() => {
      Toast._popupStub.removePopup(id)
      Toast.showingToast = Toast.showingToast.filter((item) => {
        return item !== msg
      })
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
