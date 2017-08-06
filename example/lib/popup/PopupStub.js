'use strict'
import {
  View,
  Text
} from 'react-native'

import React, { Component } from 'react'
const uuidV1 = require('uuid/v1');

export default class PopupStub extends Component {
  static _popupStub = null

  static init (popupStub) {
    if (popupStub) PopupStub._popupStub = popupStub
  }

  static isShow () {
    return PopupStub._popupStub && PopupStub._popupStub.state &&
      PopupStub._popupStub.state.popups && PopupStub._popupStub.state.popups.size > 0
  }

  state = {
    popups: new Map()
  }

  static propTypes = {
    ...View.propTyps
  }

  getNewId() {
    return uuidV1()
  }
  /**
   *
   * @param element return unique id
   */
  addPopup (element, customId) {
    const newPopups = this.state.popups
    const id = customId || uuidV1()
    newPopups.set(id, element)
    this.setState({
      popups: newPopups
    })
    return id
  }

  removePopup (id) {
    const newPopups = this.state.popups
    newPopups.delete(id)
    this.setState({
      popups: newPopups
    })
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (this.state.popups.size === 0) {
      return null
    }
    const popupElements = []
    this.state.popups.forEach((item, id) => {
      popupElements.push(
        <View
          key={id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {item}
        </View>
      )
    })

    return (
      <View
        {...this.props}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {popupElements}
      </View>
    )
  }
}
