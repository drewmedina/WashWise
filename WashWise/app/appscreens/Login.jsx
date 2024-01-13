import {Image, View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Pressable, ImageBackground} from 'react-native';
import React, {useState, Component} from 'react';
import Logo from '../../assets/bcg.png';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        try{
            const response = await signInWithEmailAndPassword(auth, email,password);
            console.log(response);
            alert('Check your email');
        }
        catch (error){
            console.log(error);
        }
        finally{
        }
    }
    return (
        <View style = {styles.container}>
                        <ImageBackground source = {Logo} resizeMode="cover" style={styles.Logo}>

            <KeyboardAvoidingView behavior = "padding">
            <Pressable style = {styles.BackButton}  onPress={() => navigation.navigate('home')}><Text style = {styles.BackButton}>{'< Back'}</Text></Pressable>

            <Text style = {styles.Header}> Welcome Back! </Text>

            <Text style = {styles.EmailHeader}>Email</Text>
            <TextInput value = {email} style = {styles.inputEmail} placeholder = "example@email.com" placeholderTextColor = '#FFFFFF' autoCapitalize = "none" onChangeText={(text) => setEmail(text)}/>
            <Text style = {styles.PasswordHeader}>Password</Text>

            <TextInput secureTextEntry = {true} value = {password} style = {styles.inputPass} placeholder = "Password" placeholderTextColor = '#FFFFFF' autoCapitalize = "none" onChangeText={(text) => setPassword(text)}/>

            {loading ? <ActivityIndicator size = "large" color = "#0000f" />
            :(<>
            <Pressable style = {styles.Login}  onPress={signIn}><Text style = {styles.LoginText}>Login</Text></Pressable>
            </>
            )}
            </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}
export default Login;

const styles = StyleSheet.create({
    container: {
    
      marginHorizontal: 0,
      marginRight: 0,
      marginLeft:0,
      flex: 1,
      justifyContent: 'center',
    },
    inputEmail: {    
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 5,

        

    },
    inputPass: {    
        borderColor: '#FFFFFF',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 5,
        

    },
    PasswordHeader: {
        marginHorizontal: 10,
        fontSize: 30,
        color: '#FFFFFF',

        
    },
    EmailHeader: {
        marginTop: 150,
        marginHorizontal: 10,
        fontSize: 30,
        color: '#FFFFFF',

        
    },
    Header: {
        marginTop: 100,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 40,
        color: '#FFFFFF',
    },
    Login: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: '60%',
        height: 50,
        marginLeft: '20%',
        marginTop: 75,
        borderColor: '#2c6ade',
        borderWidth: 1,

        


    },
    LoginText: {
        fontSize: 25,
        color: '#2c6ade',
        marginTop: '4%',
    },
    Logo: {
        flex: 1,
    },
    BackButton: {
        color: '#FFFFFF',
        marginHorizontal: 10,
        marginVertical: 30,
        fontSize: 20,

        
    },
    Back: {
        textDecorationLine: 'underline',

    },
    
    

   
  });