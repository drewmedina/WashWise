// App.js
import React from 'react';
import WashingMachine from './components/WashingMachine';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './app/appscreens/Signup.jsx';

const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignUp'>
        <Stack.Screen name = 'SignUp' component={SignUp} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
