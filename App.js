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

import Firebase from './config/Firebase';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoading: true,
      fontsLoading: true,
      location: null,
    };
  }

  async componentDidMount() {

  }

  findCoordinates = async () => {
    console.log("started");
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [JSON.stringify(position.coords.latitude),JSON.stringify(position.coords.longitude)] ;
        // console.log(location[1])
        console.log(location)
        this.setState({location});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
    console.log("loaded");
  };

  render() {
    return (
      <View style = { styles.container }>
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
