import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

import LocationInfo from '../screens/LocationInfo'
import MapScreen from '../screens/MapScreen'
import Chat from '../components/Chat'
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

function DrawerNavigator() {
  /* Query the Realtime db to determine all other users in the vicinity. */
  return (
    <Drawer.Navigator
    initialRouteName="MapScreen"
    screenOptions={
      {
        headerShown: false,
      }
    }
    drawerType={"right"}>
      <Drawer.Screen name="MapScreen" component={MapScreen}/>
      <Drawer.Screen name="Chat" component={Chat}/>
      <Drawer.Screen name="Mailbox" component={Mailbox}/>
    </Drawer.Navigator>
  );
}

const MainNavigator = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainNavigator.Navigator initialRouteName = "MapScreen"
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
      MapScreen
    }/>

    <MainNavigator.Screen name = "PeopleDrawer"
    component = {
      DrawerNavigator
    }/>

    <MainNavigator.Screen name = "Chat"
    component = {
      Chat
    }/>

    <MainNavigator.Screen name = "Mailbox"
    component = {
      Mailbox
    }/>

    </MainNavigator.Navigator>
  );
}
