import React from 'react';
import { Pressable, Text, ImageBackground, View, StyleSheet} from 'react-native';
import Logo from '../../assets/splash.png'


export default function HomeScreen({navigation}) {
    return (
        <View style = {styles.container}>
            <ImageBackground source = {Logo} resizeMode="cover" style={styles.Logo}>
                <Pressable style = {styles.Login} onPress = {() => navigation.navigate("login")}><Text style = {styles.LoginText}>Login</Text>
                </Pressable > 
                <Pressable style = {styles.Signup} onPress = {() => navigation.navigate("signup")}>
                <Text style = {styles.SignUpText}>Sign Up</Text>
                </Pressable>

            </ImageBackground>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
    },
    Logo: {
        flex: 1
    },
    Login: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: '60%',
        height: 50,
        marginLeft: '20%',
        marginTop: 500,
        borderColor: '#2c6ade',
        borderWidth: 1,

        


    },
    LoginText: {
        fontSize: 25,
        color: '#2c6ade',
        marginTop: '4%',
    },
    Signup: {
        marginTop: '5%',
        alignItems: 'center',
        backgroundColor: '#2c6ade',
        borderRadius: 25,
        width: '60%',
        height: 50,
        marginLeft: '20%',
        borderColor: '#FFFFFF',
        borderWidth: 1,

    },
    SignUpText:{
        fontSize: 25,
        color: '#FFFFFF',
        marginTop: '4%',
    },

  });
  