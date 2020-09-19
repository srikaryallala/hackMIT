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
import Chat from './components/Chat';

export default class App extends Component {
  state = {
    location: null
  };

  findCoordinates = async () => {
    //console.log("started");
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [JSON.stringify(position.coords.latitude),JSON.stringify(position.coords.longitude)];
        //console.log(location[1])
        this.setState({location});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    );
    //console.log("loaded");
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