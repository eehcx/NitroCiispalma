import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity,  Alert, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button   } from 'react-native-paper';

// Firebase dependencias e importaciones
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../utils/firebase/firebase';

import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';

const LoginScreen = ({ navigateToScreen }) => {
  const [text, setText] = React.useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  //onPress={handleLogin}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        console.log('Usuario loggeado');
        const user = userCredential.user;

        // Guardar el estado de la sesión con AsyncStorage
        const saveLoginState = async (user) => {
          try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.log('Error al guardar el estado de inicio de sesión:', error);
          }
        };
        saveLoginState(user);
        console.log(user);
        navigateToScreen('home');
      })
      .catch((error) => {
        console.log('Error al loggear usuario:', error);
      });
  };

  return (
    <View style={InputForms.container}>
      <View style={InputForms.formContainer}>
          <Text style={InputForms.formTitle}>Iniciar sesión</Text>
          <TextInput style={[InputForms.input, { marginBottom: 30 }]}
          placeholder="Correo electrónico" 
          keyboardType="email-address" 
          maxLength={100} 
          value={email}
          onChangeText={setEmail}
          />
          <TextInput style={InputForms.input} 
          placeholder="Contraseña" 
          secureTextEntry={true}
          maxLength={25}
          value={password}
          onChangeText={setPassword}
          />
          <TouchableOpacity style={[buttonStyles.formButton, { marginTop: 19 }]} onPress={handleLogin} >
            <Text style={buttonStyles.buttonText_Black}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text onPress={() => navigateToScreen('signin')} style={InputForms.signInText}>¿No estás registrado? <Text style={InputForms.signInLink}>SIGN IN</Text></Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;