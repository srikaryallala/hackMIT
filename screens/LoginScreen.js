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
import Icon from 'react-native-vector-icons/FontAwesome5';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  handleLogin = () => {
    this.props.login()
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
      <Icon name="chevron-left" size={20} color="white"
        onPress={() => this.props.navigation.navigate('Opening')}
        style={styles.back}
      />
      <Text style={styles.textHeading}>Email</Text>
        <TextInput
        value={this.props.user.email}
        onChangeText={email => this.props.updateEmail(email)}
        style={[styles.textBar, styles.username]}
        />
      <Text style={styles.textHeading}>Password</Text>
        <TextInput
        value={this.props.user.password}
        onChangeText={password => this.props.updatePassword(password)}
        style={[styles.textBar, styles.password]}
        secureTextEntry={true}
        />
        <TouchableOpacity
        title="LOG IN"
        style={styles.button}
        onPress={this.handleLogin}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
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
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    position: 'relative',
    width: '50%',
    height: '10%',
    top: '-10%'
  },
  textHeading: {
    fontFamily: 'Avenir',
    position: 'relative',
    paddingRight: 190,
    color: '#D2D2D2',
    paddingTop: 10,
  },
  back: {
    top: 10,
    left: 5 ,
    padding: 10,
    width: 40,
  },
  textBar: {
    fontFamily: 'Avenir',
    position: 'relative',
    justifyContent: 'center',
    width: '70%',
    height: '5%',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F9F9F9',
    borderBottomColor: '#212121',
    padding: 10
  },
  button: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '7%',
    width: '80%',
    backgroundColor: '#212121',
    borderRadius: 23,
  },
  buttonText: {
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
)(LoginScreen)
