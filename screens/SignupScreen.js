import * as Analytics from 'expo-firebase-analytics';
import Firebase from '../config/Firebase';

// import redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFirstName, updateLastName, updateUsername, updateEmail, updatePassword, signup } from '../actions/user'

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      <Text style={styles.textHeading}>First Name</Text>
        <TextInput
        value={this.props.user.firstName}
        onChangeText={firstName => this.props.updateFirstName(firstName)}
        style={[styles.textBar, styles.names]}
        autoCapitalize='none'
        />
      <Text style={styles.textHeading}>Last Name</Text>
        <TextInput
        value={this.props.user.lastName}
        onChangeText={lastName => this.props.updateLastName(lastName)}
        style={[styles.textBar, styles.names]}
        autoCapitalize='none'
        />
      <Text style={styles.textHeading}>Email</Text>
        <TextInput
        value={this.props.user.email}
        onChangeText={email => this.props.updateEmail(email)}
        style={[styles.textBar, styles.names]}
        autoCapitalize='none'
        />
      <Text style={styles.textHeading}>Username</Text>
        <TextInput
        value={this.props.user.username}
        onChangeText={username => this.props.updateUsername(username)}
        style={[styles.textBar, styles.names]}
        autoCapitalize='none'
        />
      <Text style={styles.textHeading}>Password</Text>
        <TextInput
        value={this.props.user.password}
        onChangeText={password => this.props.updatePassword(password)}
        style={[styles.textBar, styles.names]}
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
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
    position: 'absolute',
    width: '50%',
    height: '10%',
    top: '10%'
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
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#212121',
    borderBottomColor: '#F9F9F9',
    padding: 10
  },
  textHeading: {
    fontFamily: 'Avenir',
    position: 'relative',
    paddingRight: 190,
    color: '#D2D2D2',
    paddingTop: 10,
  },
  names: {
    color: '#F9F9F9',
    fontFamily: 'Avenir',
    fontSize: 20
  },
  button: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '5%',
    width: '75%',
    backgroundColor: '#F9F9F9',
    borderRadius: 23,
    borderColor: '#F9F9F9',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    lineHeight: 45,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.035,
    color: '#212121',
  },
});

//
//   render() {
//     return (
//       <View style={styles.container}>
//       // <View style={[styles.fields, styles.text]}>
//       <Image
//         style={styles.tinyLogo}
//         source={require('../assets/images/ontoologo.png')}
//       />
//         <TextInput
//         value={this.props.user.firstName}
//         onChangeText={firstName => this.props.updateFirstName(firstName)}
//         style={[styles.textBar, styles.names]}
//         placeholder='First Name'
//         placeholderTextColor='#F9F9F9'
//         />
//         <TextInput
//         value={this.props.user.lastName}
//         onChangeText={lastName => this.props.updateLastName(lastName)}
//         style={[styles.textBar, styles.names]}
//         placeholder='Last Name'
//         placeholderTextColor='#F9F9F9'
//         />
//       <TextInput
//       value={this.props.user.username}
//       onChangeText={username => this.props.updateUsername(username)}
//       style={styles.textBar}
//       placeholder='Username'
//       placeholderTextColor='#F9F9F9'
//       autoCapitalize='none'
//       />
//       <TextInput
//       value={this.props.user.email}
//       onChangeText={email => this.props.updateEmail(email)}
//       style={styles.textBar}
//       placeholder='Email Address'
//       placeholderTextColor='#F9F9F9'
//       autoCapitalize='none'
//       />
//       <TextInput
//       value={this.props.user.password}
//       onChangeText={password => this.props.updatePassword(password)}
//       style={styles.textBar}
//       placeholder='Password'
//       placeholderTextColor='#F9F9F9'
//       secureTextEntry={true}
//       />
//       // </View>
//       <TouchableOpacity style={styles.arrow} onPress={this.handleSignUp}>
//       <Text>HELLO</Text>
//       </TouchableOpacity>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#212121',
//     width: '100%',
//     height: '100%',
//   },
//   tinyLogo: {
//     position: 'relative',
//     width: '50%',
//     height: '10%',
//     top: '-10%'
//   },
//   title: {
//     position: 'relative',
//     textAlign: 'center',
//     fontSize: 64,
//     fontWeight: 'bold',
//     color: 'white',
//     width: '100%',
//     height: '10%',
//     top: '0%',
//     letterSpacing: 0.03,
//
//     textShadowColor: '#68B7AF',
//     textShadowOffset: {width: 3, height: 3},
//     textShadowRadius: 3
//   },
//   subtitle: {
//     fontSize: 18,
//     top: '0%',
//     color: '#579B94',
//     fontWeight: 'normal',
//     paddingBottom: 20,
//   },
//   fields: {
//     width: '90%',
//     height: '40%',
//     justifyContent: 'center',
//   },
//   textBar: {
//     fontFamily: 'Avenir',
//     position: 'relative',
//     justifyContent: 'center',
//     width: '70%',
//     height: '5%',
//     backgroundColor: '#F9F9F9',
//     borderWidth: 1,
//     borderColor: '#F9F9F9',
//     borderBottomColor: '#212121',
//     padding: 10,
//   },
//   names: {
//     flexGrow: 1,
//   },
//   arrow: {
//     position: 'relative',
//     width: 100,
//     height: 100,
//     top: '10%',
//     color: '#FFFFFF',
//   },
// });


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
