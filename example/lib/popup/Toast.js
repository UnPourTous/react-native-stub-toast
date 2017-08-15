import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import * as Animatable from 'react-native-animatable'

import React, { Component } from 'react'

export default class Toast extends Component {
  static _popupStub
  static _refs = {}
  /**
   * @type {Array}
   * @private
   */
  static _toastQueue = []
  static _isToastShowing = false

  static init (popupStub) {
    Toast._popupStub = popupStub
  }

  static show (msg, duration, durationIn, durationOut) {
    const toast = {
      msg,
      duration,
      durationIn,
      durationOut
    }
    if (Toast._isToastShowing) {
      Toast._toastQueue.push(toast)
    } else {
      Toast._toastQueue.push(toast)
      Toast._showToastQueue()
    }
  }

  /**
   * @param toastConfig
   * {
   *   msg: '', // for simple toast with only text
   *   duration: '', // show duration
   *   component: '' // for custom toast with custom component,
   *   durationIn: '' // duration for in animation
   *   durationOut: '' // duration for out animation
   * }
   */
  static showCustom (toastConfig) {
    if (Toast._isToastShowing) {
      Toast._toastQueue.push(toastConfig)
    } else {
      Toast._toastQueue.push(toastConfig)
      Toast._showToastQueue()
    }
  }

  static _showToastQueue () {
    const toast = Toast._toastQueue.shift()
    Toast._isToastShowing = true
    const id = Toast._popupStub.getNewId()
    if (toast.component) {
      Toast._popupStub.addPopup(
        <Animatable.View
          ref={(_ref) => {
            if (_ref) {
              Toast._refs[id] = _ref
            }
          }}
          animation='fadeIn'
          duration={toast.durationIn || 300}>
          {toast.component}
        </Animatable.View>,
        id
      )
    } else {
      Toast._popupStub.addPopup(
        <Animatable.View animation='fadeIn' duration={toast.durationIn || 300} style={styles.content}>
          <Text style={styles.text}>{toast.msg}</Text>
        </Animatable.View>,
        id
      )
    }


    setTimeout(() => {
      Toast._refs[id]
      Toast._refs[id] && Toast._refs[id].fadeOut && Toast._refs[id].fadeOut(toast.durationOut || 300).then(() => {
        Toast._popupStub.removePopup(id)
        if (Toast._toastQueue.length > 0) {
          Toast._showToastQueue()
        } else {
          Toast._isToastShowing = false
        }
      })
    }, toast.duration || 1000)
  }
}

const styles = StyleSheet.create({
  content: {
    minWidth: 178,
    maxWidth: 220,
    paddingLeft: 25,
    paddingRight: 25,
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
