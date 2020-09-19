import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../config/Firebase';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ["hi"],
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

  render() {
    if(this.state.isLoaded) {
      console.log(this.state.user)
      return (
        <GiftedChat
          messages = { this.state.messages }

          user={{_id: 1}}
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
