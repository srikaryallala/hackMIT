import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

import LocationInfo from '../screens/LocationInfo'
import Map from '../screens/Map'
import Chat from '../components/Chat'
import Profile from '../components/Profile'
import Mailbox from '../screens/Mailbox'

import {
  Ionicons
} from '@expo/vector-icons';
import {
  Entypo
} from '@expo/vector-icons';
import {
  AntDesign
} from '@expo/vector-icons';
import {
  FontAwesome
} from '@expo/vector-icons';
import {
  FontAwesome5
} from '@expo/vector-icons';
import {
  createStackNavigator
} from '@react-navigation/stack';

import {
  createSwitchNavigator
} from 'react-navigation'

import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from 'react-navigation';

const Drawer = createDrawerNavigator();

export default function MainStackNavigator() {
  /* Query the Realtime db to determine all other users in the vicinity. */
  return (
    <Drawer.Navigator
    initialRouteName="Map"
    screenOptions={
      {
        headerShown: false,
      }
    }
    drawerType={"right"}
    drawerPosition={'right'}
    drawerBackgroundColor={'#F9F9F9'}>
      <Drawer.Screen name="Map" component={Map}/>
      <Drawer.Screen name="Mailbox" component={Mailbox}/>
      <Drawer.Screen name="Stranger Profile" component={Profile}/>
      <Drawer.Screen name="Chat" component={MainStackNavigator2}/>
    </Drawer.Navigator>
  );
}

const MainNavigator = createStackNavigator();

function MainStackNavigator2() {
  return (
    <MainNavigator.Navigator initialRouteName = "Chat"
    screenOptions = {
      {
        headerShown: false
      }
    }>

    <MainNavigator.Screen name = "Location"
    component = {
      LocationInfo
    }/>

    <MainNavigator.Screen name = "MapScreen"
    component = {
      Map
    }/>

    <MainNavigator.Screen name = "Chat"
    component = {
      Chat
    }/>

    <MainNavigator.Screen name = "Mailbox"
    component = {
      Mailbox
    }/>

      <MainNavigator.Screen
        name="Profile"
        component = {Profile}
      />

    </MainNavigator.Navigator>
  );
}
