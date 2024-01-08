import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const db = getFirestore();
      await addDoc(collection(db, 'users'), {
        name: username,
        number: number,
        email: email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {

    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styles.input} placeholder="Email" placeholderTextColor = '#000000' autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
        <TextInput value={username} style={styles.input} placeholder="Name" placeholderTextColor = '#000000' autoCapitalize="none" onChangeText={(text) => setUsername(text)} />
        <TextInput value={number} style={styles.input} placeholder= "Number" placeholderTextColor = '#000000' autoCapitalize="none" onChangeText={(text) => setNumber(text)} />
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" placeholderTextColor = '#000000' autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
        <Pressable style={styles.signUPBox} title="Create Account" onPress={signUp}>
          <Text style={styles.signUP}>Create Account</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
export default SignUp;
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
  signUPBox: {
    marginVertical: 10,
    marginHorizontal: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    width: '50%',
    borderRadius: 25,
  },
  signUP: {
    fontSize: 30,
    textAlign: 'center',
    color: '#000000',
  },
});


