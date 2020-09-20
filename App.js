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
import Firebase, {realtime} from './config/Firebase';
import Chat from './components/Chat';
import firebase from './config/Firebase';

import { updateLocation } from './actions/user'

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

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        var location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        location = location.toString();
        this.setState({location});
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
  };

  async componentDidMount() {
    await this.findCoordinates();
    await Firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        this.setState({
          user: user.uid,
          isLoading: false,
        });
        await store.dispatch(updateLocation(this.state.location))
        var locationsRef = realtime.ref(this.state.location);
        locationsRef.set({
          user: user.uid
        });
        locationsRef.ref(this.state.location).child(user.uid).onDisconnect().remove();
      }
      else {
        this.setState({
          user: null,
          isLoading: false,
        })
      }
    });
  }

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
