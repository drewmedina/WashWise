import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { getDatabase, ref, set, push } from "firebase/database";
import { DB } from "../../FireBaseConfig.js";
import Logo from '../../assets/bcg.png';

const SignUp = ()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {

       // Generate a unique key for the new user
      const db = getDatabase();
      
      const newKey = email.replace(".", "_");
      const response = await createUserWithEmailAndPassword(auth, email, password)
      

      
      // Get a reference to the users node in the Realtime Database


      // Generate a unique key for the new user
     

      // Set user data in the Realtime Database
      set(ref(db, 'users/' + newKey), {
        username: username,
        email: email,
        phone: number,
      }).then(() => {
        // Update profile after setting user data
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          alert("Account Created and profile updated");
          console.log(username, auth.currentUser.displayName);
        }).catch((error) => {
          console.log("Error updating profile:", error);
          alert("Account Created but failed to update profile");
        });
      }).catch((error) => {
        alert('Error saving user data: ' + error.message);
      });


      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email address is already in use. Please use a different email.');
      } else {
        console.error(error);
      }
    }
    
  };
    
  
  return (
    <View style={styles.container}>
      <ImageBackground source = {Logo} style = {styles.Logo}>
      <KeyboardAvoidingView behavior="padding">
        <Text style = {styles.InfoText}></Text>
        <Text style = {styles.EmailHeader}>Email</Text>
        <TextInput value={email} style={styles.input} placeholder="Email" placeholderTextColor = '#FFFFFF' autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
        <Text style = {styles.UserHeader}>Username</Text>
        <TextInput value={username} style={styles.input} placeholder="Name" placeholderTextColor = '#FFFFFF' autoCapitalize="none" onChangeText={(text) => setUsername(text)} />
        <Text style = {styles.NumHeader}>Number</Text>
        <TextInput value={number} style={styles.input} placeholder= "Number" placeholderTextColor = '#FFFFFF' autoCapitalize="none" onChangeText={(text) => setNumber(text)} />
        <Text style = {styles.PassHeader}>Password</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" placeholderTextColor = '#FFFFFF' autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
        <Pressable style={styles.signUPBox} title="Create Account" onPress={signUp}>
          <Text style={styles.signUP}>Create Account</Text>
        </Pressable>
      </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginRight: 0,
    marginLeft:0,
    flex: 1,
    justifyContent: 'center',
  },
  Logo: {
    flex: 1,
  },
  input: {
    
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  signUPBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '60%',
    height: 50,
    marginLeft: '20%',
    marginTop: 50,
    borderColor: '#2c6ade',
    borderWidth: 1,
  },
  signUP: {
    fontSize: 25,
    color: '#2c6ade',
    marginTop: '4%',
  },
  InfoText: {
    textAlign: 'center',
    padding: 15,
    fontSize: 40,
    

  },
  EmailHeader:{
    marginTop: 50,
    marginHorizontal: 10,
    fontSize: 30,
    color: '#FFFFFF',
  },
  PassHeader: {
    marginHorizontal: 10,
    fontSize: 30,
    color: '#FFFFFF',
},
NumHeader: {
  marginHorizontal: 10,
  fontSize: 30,
  color: '#FFFFFF',
},
UserHeader: {
  marginHorizontal: 10,
  fontSize: 30,
  color: '#FFFFFF',
},
  
});


