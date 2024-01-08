import {View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Pressable} from 'react-native';
import React, {useState} from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Login = ()=>{
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
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch (error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <View style = {styles.container}>
            <KeyboardAvoidingView behavior = "padding">
            <Text style = {styles.Header}> Login or Sign Up </Text>
            <TextInput value = {email} style = {styles.input} placeholder = "Email" autoCapitalize = "none" onChangeText={(text) => setEmail(text)}/>
            <TextInput secureTextEntry = {true} value = {password} style = {styles.input} placeholder = "Password" autoCapitalize = "none" onChangeText={(text) => setPassword(text)}/>

            {loading ? <ActivityIndicator size = "large" color = "0000f" />
            :(<>
            <Pressable style = {styles.LoginBox}  onPress={signIn}><Text style = {styles.Login}>Login</Text></Pressable>
            <Pressable style = {styles.signUPBox} title = "Create Account" onPress={signUp}><Text style = {styles.signUP}>Sign Up</Text></Pressable>
            </>
            )}
            </KeyboardAvoidingView>
           
        </View>
    );
}
export default Login;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 0,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#23395d',
    },
    input: {    
        borderColor: '#000000',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 5,
        

    },
    Header: {
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 30,
    },
    LoginBox: {
        marginVertical: 50,
        marginBottom: 10,
        marginHorizontal: '25%',
        alginItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        width: '50%',
        borderRadius: 25,

    },
    Login: {
        fontSize: 30,
        textAlign: 'center',
    },
    signUPBox: {
        marginVertical: 10,
        marginHorizontal: '25%',
        alginItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        width: '50%',
        borderRadius: 25,

    },
    signUP: {
        fontSize: 30,
        textAlign: 'center',
    },


   
  });