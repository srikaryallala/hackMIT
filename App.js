import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './navigation/AuthStackNavigator'
import MainNavigator from './navigation/MainNavigator'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Firebase from './config/Firebase';
import Chat from './components/Chat';
import firebase from './config/Firebase';

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

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
      <Provider store={store}>
          <NavigationContainer>
            { this.state.user ? (
              <MainNavigator/>
            ) : (
              <AuthStackNavigator/>
            )}
          </NavigationContainer>
        </Provider>
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
