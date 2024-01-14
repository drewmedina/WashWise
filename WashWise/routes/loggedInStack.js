import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import FloorSelect from '../app/appscreens/FloorSelect.jsx';
import Floor2 from '../app/appscreens/Floor2.jsx';
import Floor3 from '../app/appscreens/Floor3.jsx';

import FIREBASE_APP from '../FireBaseConfig.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Stack = createNativeStackNavigator();
import Logo from '../assets/bcg.png';

function loggedInStack({navigation}){
  return (
        <NavigationContainer><Stack.Navigator>
            <Stack.Screen name = "FloorSelect" component={FloorSelect} options={{headerShown: false}}></Stack.Screen>

            <Stack.Screen name = "Floor2" component={Floor2} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name = "Floor3" component={Floor3} options={{headerShown: false}}></Stack.Screen>

            </Stack.Navigator></NavigationContainer>

  );
}

export default loggedInStack;