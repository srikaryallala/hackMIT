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

let customFonts = {
  'Barlow-Regular': require('../assets/fonts/Barlow-Regular.ttf'),
  'Barlow-Medium': require('../assets/fonts/Barlow-Medium.ttf'),
};


class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
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
        source={require('../assets/images/backarrow.svg')}
      />
        <Text style={styles.title}>Login</Text>
        <TextInput
        value={this.props.user.email}
        onChangeText={email => this.props.updateEmail(email)}
        style={[styles.textBar, styles.username]}
        placeholder="email"
        autoCapitalize='none'
        />
        <TextInput
        value={this.props.user.password}
        onChangeText={password => this.props.updatePassword(password)}
        style={[styles.textBar, styles.password]}
        placeholder="password"
        secureTextEntry={true}
        />
        <LinearGradient
          // Button Linear Gradient
          colors={['#94DFBC', '#48DBC9']}
          style={styles.button}>
            <TouchableOpacity
            title="Login"
            onPress={this.props.login}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
        title="Signup"
        style={styles.bottomButton}
        onPress={() => this.props.navigation.navigate('Signup')}
        buttonStyle={styles.button}
        >
          <Text style={[styles.buttonText, styles.bottomButtonText]}>Don't have an account yet? Sign up :)</Text>
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
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    position: 'relative',
    width: '10%',
    height: '7%',
    top: '-20%',
    color: '#212121'
  },
  title: {
    position: 'relative',
    fontSize: 35,
    lineHeight: 41,
    fontWeight: 'bold',
    color: '#C4C4C4',
    width: '100%',
    height: '5%',
    left: '15%',
    paddingBottom: 60,
  },
  textBar: {
    position: 'relative',
    justifyContent: 'center',
    width: '75%',
    height: '5%',
    backgroundColor: '#FFFFFF',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 50,
    color: 'black',
    padding: 10
  },
  username: {
    // top: '%',
  },
  password: {
    top: '3%',
  },
  button: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '10%',
    width: '27%',
    backgroundColor: '#8AE3B9',
    borderRadius: 23,
  },
  bottomButton: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '20%',
    borderRadius: 23,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 45,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.035,
    color: '#FFFFFF',
  },
  bottomButtonText: {
    color: '#ABABAB',
    top: '80%',
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
