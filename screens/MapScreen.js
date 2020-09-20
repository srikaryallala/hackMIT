import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import firebase from '../config/Firebase';


export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.findCoordinates();
  }

  findChatRoom = () => {

  };

  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        const location = [position.coords.latitude.toFixed(0),position.coords.longitude.toFixed(0)];
        this.setState({
          location: location,
          isLoading: false,
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 10000 }
    )

  };

  render() {
    if(!this.state.isLoading) {
      return(
        <View style={styles.container}>
        <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: parseInt(this.state.location[0])-0.214,
          longitude: parseInt(this.state.location[1])-0.405,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
        showsUserLocation={true}
        scrollEnabled={false}
        zoomEnabled={false}
         />
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat')}
        style={{
          justifyContent: 'center',
          position: 'absolute',
          top: 40,
        }}
        >
        <Text style={{
          flex: 1,
          top: '50%',
          padding: 20,
          fontSize: 30,
        }}>BACK</Text>
        </TouchableOpacity>
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
        <Text>Page loading!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
