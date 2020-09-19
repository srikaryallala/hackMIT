import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ObjectUnsubscribedError } from 'rxjs';
import Firebase, { db } from '../config/Firebase';
import firebase from '../config/Firebase';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        _id: 0,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },],
      user: null,
      isLoaded: false,
      location: null,
    }
  }

  async componentDidMount() {
    await this.findCoordinates();
    let user = await Firebase.auth().currentUser;
      if(user) {
        this.setState({
          user: user.uid,
          isLoaded: true,
        })
      }
  }

  findMessages = async () => {
    var unsubscribe = db.collection('messages').doc(this.state.location.toString())
    .onSnapshot(function(doc) {
      console.log(doc.data());
    });
    //unsubscribe();
  }

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        var location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        location = location.toString();
        this.setState({location});
        this.findMessages();
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
  };

  oSend(messages) {
    let x = this.state.messages;
    let y = x.push(messages[0]);
    this.setState({messages: x});

    // set the remote firebase to update messages accordingly
    db.collection("messages").doc(this.state.location).set({
      location: this.state.location,
      message: messages[0],
    }).then(() => {
      console.log("successfully added a new message!")
    })
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <View style={styles.container}>
        <GiftedChat
          messages = { this.state.messages }
          onSend = {messages => this.oSend(messages)}
          user={{_id: this.state.user}}
          renderUsernameOnMessage = {true}
          inverted = {false}
        />
        </View>
      );
    }
    else {
      return(
        null
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  // logout button for debugging purposes
  logoutButton: {
    position: 'relative',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    top: '10%',
  },
  logoutButtonText: {
    fontSize: 20,
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser, logout }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
