import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'

import Firebase from '../config/Firebase'

import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

class OpeningScreen extends Component {
  static navigationOptions = {
    title: 'OpeningScreen'
  }

  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.getUser(user.uid)
      }
    })
  }

  render() {
    return (
      <View
      style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/ontoologo.png')}
      />
        <TouchableOpacity
        title="LOG IN"
        style={styles.topButton}
        onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.darkText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
        title="Signup"
        style={styles.bottomButton}
        onPress={() => this.props.navigation.navigate('Signup')}
        buttonStyle={styles.button}
        >
          <Text style={styles.lightText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    position: 'relative',
    width: '50%',
    height: '10%',
    top: '-10%',
  },
  topButton: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '0%',
    width: '80%',
    backgroundColor: '#F9F9F9',
    borderRadius: 23,
  },
  bottomButton: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '3%',
    width: '80%',
    backgroundColor: '#212121',
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#F9F9F9'
  },
  darkText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    lineHeight: 45,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.035,
    color: '#212121',
  },
  lightText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    lineHeight: 45,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.035,
    color: '#F9F9F9',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpeningScreen)
