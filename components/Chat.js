import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ObjectUnsubscribedError } from 'rxjs';
import Firebase, { db } from '../config/Firebase';
import firebase from '../config/Firebase';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../actions/user'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
    this.props.getUser(this.state.user);
    // look here
    console.log(this.props.user)
  }

  findMessages = async () => {
    var docRef = db.collection('messages').doc(this.state.location.toString())
    const doc = await docRef.get();
    if(doc.exists) {
      //console.log();
      let x = doc.data().messages;
      let y = [];
      for(var i = 0; i < x.length;i++) {
        x[i].createdAt = new Date(x[i].createdAt.toDate().toDateString());
        //console.log(x[i]);
      }
      this.setState({messages: x});
    }

    // .onSnapshot(function(doc) {
    //   console.log(doc.data());
    // });
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
    //console.log(this.state.messages);
    let y = x.push(messages[0]);
    this.setState({messages: x});


    // set the remote firebase to update messages accordingly
    db.collection("messages").doc(this.state.location).set({
      messages: this.state.messages,
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
  return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
