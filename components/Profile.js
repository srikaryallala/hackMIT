import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

import { ObjectUnsubscribedError } from 'rxjs';
import Firebase, { db } from '../config/Firebase';
import firebase from '../config/Firebase';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../actions/user'

// fonts
import * as Font from 'expo-font';

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile'
  }
  constructor(props) {
    super(props);
    this.state = {
      known: false,
      user: null,
    }
  }

  async componentDidMount() {
    let user = await Firebase.auth().currentUser;
    if(user) {
      this.setState({
        user: user.uid,
        isLoaded: true,
      })
    }
    await getUser(this.state.user);
    // look here
    this.setState({name: this.state.user.firstName + " " + this.state.user.lastName})
    //console.log(this.state.name)
  }

  render() {
    if (!this.state.known) {
      return (
        <View
        style={styles.container1}>
        <Text style={styles.nameText}>{this.props.name}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('Mailbox')}>
        <Image
          style={styles.mailboxImage}
          source={require('../assets/images/mailbox-open.png')}
        />
        <Text style={styles.text}>Mailbox</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
        <Image
          style={styles.reportImage}
          source={require('../assets/images/report1.png')}
        />
        <Text style={styles.text}>Report</Text>
        </TouchableOpacity>

        </View>
        )
      }
      else {
        <View style={styles.container2}>
        // something about like getUser and their pfp/animal icon
        <TouchableOpacity style={styles.row}>
        <Image
          style={styles.topImage}
          source={require('../assets/images/messages.png')}
        />
        <Text style={styles.text}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
        <Image
          style={styles.topImage}
          source={require('../assets/images/report2.png')}
        />
        <Text style={styles.text}>Report</Text>
        </TouchableOpacity>
        </View>
      }
    }
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    width: '80%',
    flexDirection: 'row',
  },
  nameText: {
    fontFamily: 'Avenir',
    color: '#F9F9F9',
    justifyContent: 'center',
    position: 'relative',
    fontSize: 40
  },
  text: {
    fontFamily: 'Avenir',
    color: '#F9F9F9',
    padding: 20,
    top: '-5%',
    fontSize: 30
  },
  mailboxImage: {
    padding: 20,
  },
  reportImage: {
    padding: 10,
  },
  bottomImage: {
    left: '10%',
    height: '70%'
  }
})
