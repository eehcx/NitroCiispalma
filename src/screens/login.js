import React, { useState } from 'react';
import { withExpoSnack } from 'nativewind';
import { StyleSheet, Switch, TouchableOpacity,  Alert, TextInput, Text, Button, View, ImageBackground } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';

import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';

const LoginScreen = ({ navigateToScreen }) => {
  //onPress={handleLogin}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Usuario loggeado');
          const user = userCredential.user;
          //console.log(user);
          // Realiza la navegación a la siguiente pantalla
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
            maxLength={10}
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
};

export default LoginScreen;