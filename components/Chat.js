import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../config/Firebase';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },],
      user: null,
      isLoaded: false
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
  }

   oSend(messages) {
    let x = this.state.messages;
    let y = x.unshift(messages[0]);
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
