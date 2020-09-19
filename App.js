import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Chat from './components/Chat';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoading: true,
      fontsLoading: true,
      location: null,
      chatRoom: null,
    };
  }

  async componentDidMount() {
    await Firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        console.log(user);
        this.setState({
          user: user.uid,
          isLoading: false,
        });
        //await console.log(new Date().getTime() - this.state.timer);
      }
      else {
        this.setState({
          user: null,
          isLoading: false,
        })
      }
    });
  }

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        this.setState({location});
      },
      error => Alert.alert(error.message),
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
