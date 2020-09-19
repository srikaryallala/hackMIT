import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

import LocationInfo from '../screens/LocationInfo'
import Chat from '../components/Chat'

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


const MainNavigator = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false
      }}
    >
      <MainNavigator.Screen
        name="Location"
        component = {LocationInfo}
      />

      <MainNavigator.Screen
        name="Chat"
        component = {Chat}
      />

    </MainNavigator.Navigator>
  );
}
