import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity,  Alert, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button   } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase dependencias e importaciones
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebaseInit';
// Estilos de la pantalla
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';

const LoginScreen = () => {
  // Firebase
  const auth = getAuth(app);
  // React Navigation
  const navigation = useNavigation();
  // Estados de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToSignIn = () => {
    navigation.navigate('signin');
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        console.log('Usuario loggeado');
        const user = userCredential.user;
        const userId = user.uid;
        const userEmail = user.email;
        const userDisplayName = user.displayName;

        // Guardar el estado de la sesión con AsyncStorage
        const saveLoginState = async (user) => {
          try {
            const jsonFirebaseUser = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonFirebaseUser);
          } catch (error) {
            console.log('Error al guardar el estado de inicio de sesión:', error);
          }
          console.log('Done.')
        };
        saveLoginState(user);
        console.log(userId + ' ' + userEmail + ' ' + userDisplayName);
        navigation.navigate('main');
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
          maxLength={100}
          value={password}
          onChangeText={setPassword}
          />
          <TouchableOpacity style={[buttonStyles.formButton, { marginTop: 19 }]} onPress={handleLogin} >
            <Text style={buttonStyles.buttonText_Black}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text onPress={handleNavigateToSignIn} style={InputForms.signInText}>¿No estás registrado? <Text style={InputForms.signInLink}>SIGN IN</Text></Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;