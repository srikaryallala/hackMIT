import * as Analytics from 'expo-firebase-analytics';
import Firebase from '../config/Firebase';

// import redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFirstName, updateLastName, updateUsername, updateEmail, updatePassword, signup } from '../actions/user'

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

// fonts
import * as Font from 'expo-font';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup'
  }

  handleSignUp = () => {
    this.props.signup()
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={[styles.title]}>sign up</Text>
      <Text style={[styles.subtitle]}>it's nice to meet you!</Text>
      <View style={[styles.fields, styles.text]}>
      <View style={styles.row}>
        <TextInput
        value={this.props.user.firstName}
        onChangeText={firstName => this.props.updateFirstName(firstName)}
        style={[styles.textBar, styles.names]}
        placeholder='First Name'
        placeholderTextColor='#FFFFFF'
        />
        <TextInput
        value={this.props.user.lastName}
        onChangeText={lastName => this.props.updateLastName(lastName)}
        style={[styles.textBar, styles.names]}
        placeholder='Last Name'
        placeholderTextColor='#FFFFFF'
        />
      </View>
      <TextInput
      value={this.props.user.username}
      onChangeText={username => this.props.updateUsername(username)}
      style={styles.textBar}
      placeholder='Username'
      placeholderTextColor='#FFFFFF'
      autoCapitalize='none'
      />
      <TextInput
      value={this.props.user.email}
      onChangeText={email => this.props.updateEmail(email)}
      style={styles.textBar}
      placeholder='Email Address'
      placeholderTextColor='#FFFFFF'
      autoCapitalize='none'
      />
      <TextInput
      value={this.props.user.password}
      onChangeText={password => this.props.updatePassword(password)}
      style={styles.textBar}
      placeholder='Password'
      placeholderTextColor='#FFFFFF'
      secureTextEntry={true}
      />
      </View>
      <TouchableOpacity style={styles.arrow} onPress={this.handleSignUp}>
      <Text>HELLO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginPageButton} onPress={() => this.props.navigation.navigate('Login')}>
      <Text style={[styles.loginPageButtonText]}>Have an account? Log in :)</Text>
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
    backgroundColor: '#8AE3B9',
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    height: '10%',
    top: '0%',
    letterSpacing: 0.03,

    textShadowColor: '#68B7AF',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 3
  },
  subtitle: {
    fontSize: 18,
    top: '0%',
    color: '#579B94',
    fontWeight: 'normal',
    paddingBottom: 20,
  },
  fields: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  loginPageButton: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '-12%',
    borderRadius: 23,
    backgroundColor: '#8AE3B9',
  },
  textBar: {
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 50,
    color: 'white',
    padding: 10,
    margin: 10,
    fontSize: 18,
  },
  names: {
    flexGrow: 1,
  },
  loginPageButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    top: '20%'
  },
  arrow: {
    position: 'relative',
    width: 100,
    height: 100,
    top: '10%',
    color: '#FFFFFF',
  },
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateFirstName, updateLastName, updateUsername, updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
