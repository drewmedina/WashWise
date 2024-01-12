import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import Signup from '../app/appscreens/Signup.jsx';
import Login from '../app/appscreens/Login.jsx';
import Home from '../app/appscreens/Home.jsx';
import FloorSelect from '../app/appscreens/FloorSelect.jsx';
import FIREBASE_APP from '../FireBaseConfig.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Stack = createNativeStackNavigator();
import Logo from '../assets/bcg.png';
import LoggedInNavigator from '../routes/loggedInStack.js';
export class loginStack extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount(){
    const auth = getAuth(FIREBASE_APP);
    onAuthStateChanged(auth, user =>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render(){
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View><ImageBackground source = {Logo}></ImageBackground></View>
      )
    }
    if(!loggedIn){
  return (
<NavigationContainer><Stack.Navigator>
  <Stack.Screen name = "home" component={Home} options={{headerShown: false}}></Stack.Screen>
  <Stack.Screen name = "login" component={Login} options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name = "signup" component={Signup} options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name = "FloorSelect" component={FloorSelect} options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator></NavigationContainer>

  )}
  else{
    return(
    <LoggedInNavigator/>
    )
  };
  }
}

export default loginStack;