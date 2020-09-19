import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }],
    }
  }

  function sendMessage(message) {
    this.state.messages.push(message);
    console.log(this.state.messages);
    return true;
  }

  function myFunction(p1, p2) {
    return p1 * p2;   // The function returns the product of p1 and p2
  }

  render() {
    return ( 
      <GiftedChat 
        messages = { this.state.messages }
        onSend={message => sendMessage(message)}
        user={{_id: 1}}
      />
    );
  }

}