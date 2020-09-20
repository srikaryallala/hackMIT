import { StatusBar } from 'expo-status-bar';
import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import firebase from '../config/Firebase';

// styling
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

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
          <StatusBar hidden />
        <MapView
        style={styles.mapStyle}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseInt(this.state.location[0])-0.25,
          longitude: parseInt(this.state.location[1])-0.25,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }}
        showsUserLocation={true}
        scrollEnabled={false}
        zoomEnabled={false}
         />
         <TouchableOpacity
         style={styles.icon}>
         <Image
         style={[styles.icon]}
         source={require('../assets/images/people.png')}/>
         </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Chat')}
          style={styles.button}>

          <Text style={{ fontSize: 30, lineHeight: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center',  }}>
            JUMP ON
          </Text>

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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '80%', backgroundColor:
    '#B31B1B',
    height: '7%',
    width: '55%',
    borderRadius: 15
  },
  // icon styling
  icon: {
    position: 'absolute',
    top: '50%',
    borderWidth: 2,
    borderColor: 'white',
  },
});
