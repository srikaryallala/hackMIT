import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

import LocationInfo from '../screens/LocationInfo'

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
      initialRouteName="Location"
      screenOptions={{
        headerShown: false
      }}
    >
      <MainNavigator.Screen
        name="Location"
        component = {LocationInfo}
      />

    </MainNavigator.Navigator>
  );
}
