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
        this.setState({
          user: user.uid,
          isLoading: false,
        });
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
