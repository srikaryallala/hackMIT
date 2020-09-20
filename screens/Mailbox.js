import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'

import Firebase from '../config/Firebase'

import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

export default class Mailbox extends Component {
  static navigationOptions = {
      title: 'Mailbox'
  }

  render() {
    return (
      <View
      style={styles.container}>
      <Text style={styles.text}>
      HI
      </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#212121',
    fontFamily: 'Avenir',
    fontSize: 60
  },
})
