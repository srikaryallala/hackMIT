import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Chat from './components/Chat';
import firebase from './config/Firebase';

export default class App extends Component {
  state = {
    location: null,
    chatRoom: null,
  };

  findChatRoom = () => {
    database = firebase.database();
    //console.log('completed')
    var chatRoomRef = database.ref('/');
    //console.log('completed')
    chatRoomRef.once('value').then(function(snapshot) {
      console.log(snapshot.val())
    })
    //console.log(database);
  }

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        this.setState({location});
        //console.log(this.state.location);
        this.findChatRoom();
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
  };

  render() {
    return ( 
      <View style = { styles.container } >
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text> Location: { this.state.location } </Text> 
        </TouchableOpacity>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});