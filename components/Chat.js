import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ["hi"],
    }
  }


  render() {
    return ( 
      <GiftedChat 
        messages = { this.state.messages }

        user={{_id: 1}}
      />
    );
  }

}