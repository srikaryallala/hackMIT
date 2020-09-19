import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../config/Firebase';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser, logout } from '../actions/user'

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
    // console.log(this.props)
    let user = await Firebase.auth().currentUser;
      if(user) {
        this.setState({
          user: user.uid,
          isLoaded: true,
        })
      }
  }

  handleLogOut = () => {
    this.props.logout();
  }

   oSend(messages) {
    let x = this.state.messages;
    let y = x.unshift(messages[0]);
    this.setState({messages: x});
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <View style={styles.container}>
        <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => this.handleLogOut()}>
        <Text style={[styles.logoutButtonText, styles.text]}>Log Out</Text>
        </TouchableOpacity>
        {/*<GiftedChat
          messages = { this.state.messages }
          onSend = {messages => this.oSend(messages)}
          user={{_id: this.state.uid}}
          renderUsernameOnMessage = {true}
        />*/}
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
