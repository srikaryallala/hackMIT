import {
  StatusBar
} from 'expo-status-bar';
//import React from 'react';
import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import firebase from '../config/Firebase';


export default class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    }
  }

  findChatRoom = () => {
    database = firebase.database();
    var chatRoomRef = database.ref('/');
    chatRoomRef.once('value').then(function(snapshot) {
      console.log(snapshot.val());
    });
  };

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
    return(
      <View style={styles.container}>
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
