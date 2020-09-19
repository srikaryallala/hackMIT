import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './navigation/AuthStackNavigator'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Firebase from './config/Firebase';
import Chat from './components/Chat';

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
      <Provider store={store}>
          <NavigationContainer>
            { this.state.user ? (
              <BottomTabNavigator/>
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
