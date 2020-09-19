import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
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
    this.findCoordinates();
    let user = await Firebase.auth().currentUser;
      if(user) {
        this.setState({
          user: user.uid,
          isLoaded: true,
        })
      }
  }

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        this.setState({location});
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
  };

  oSend(messages) {
    let x = this.state.messages;
    let y = x.push(messages[0]);
    this.setState({messages: x});
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <GiftedChat
          messages = { this.state.messages }
          onSend = {messages => this.oSend(messages)}
          user={{_id: this.state.uid}}
          renderUsernameOnMessage = {true}
          inverted = {false}
        />
      );
    }
    else {
      return(
        null
      );
    }
  }
}
