import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import * as Animatable from 'react-native-animatable';

import React, { Component } from 'react'

export default class Toast extends Component {
  static _popupStub
  static _toastQueue = []
  static _isToastShowing = false

  static init (popupStub) {
    Toast._popupStub = popupStub
  }

  static show (msg, duration) {
    const toast = {
      msg,
      duration
    }
    if (Toast._isToastShowing) {
      Toast._toastQueue.push(toast)
    } else {
      Toast._toastQueue.push(toast)
      Toast._showToastQueue()
    }
  }
  static _showToastQueue () {
    const toast = Toast._toastQueue.shift()
    Toast._isToastShowing = true
    const id = Toast._popupStub.addPopup(
      <Animatable.View animation="fadeIn" style={styles.content}>
        <Text style={styles.text}>{toast.msg}</Text>
      </Animatable.View>
    )

    setTimeout(() => {
      Toast._popupStub.removePopup(id)
      if (Toast._toastQueue.length > 0) {
        Toast._showToastQueue()
      } else {
        Toast._isToastShowing = false
      }
    }, toast.duration || 1000)
  }
}

const styles = StyleSheet.create({
  content: {
    minWidth: 178,
    maxWidth: 220,
    paddingLeft: 10,
    paddingRight: 10,
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
