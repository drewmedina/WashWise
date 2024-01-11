import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Signup from '../app/appscreens/Signup.jsx';
import Login from '../app/appscreens/Login.jsx';
import Home from '../app/appscreens/Home.jsx';
import FloorSelect from '../app/appscreens/FloorSelect.jsx';

const Stack = createNativeStackNavigator();

function loginScreens({navigation}){
  return (
<NavigationContainer><Stack.Navigator>
  <Stack.Screen name = "home" component={Home} options={{headerShown: false}}></Stack.Screen>
  <Stack.Screen name = "login" component={Login} options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name = "signup" component={Signup} options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name = "FloorSelect" component={FloorSelect} options={{headerShown: false}}></Stack.Screen></Stack.Navigator></NavigationContainer>

  );
}

export default loginScreens;