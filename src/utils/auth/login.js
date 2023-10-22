import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity,  Alert, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button   } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase dependencias e importaciones
import { initializeAuth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../app/firebase';
// Estilos de la pantalla
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';
import Fonts from '../../styles/Fonts';
// Componentes
import PasswordInput from '../../components/interface/Forms/PasswordInput';

const LoginScreen = () => {
  // Firebase
  const auth = getAuth(app);

  /*
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });*/

  const navigation = useNavigation();
  const handleNavigateToSignIn = () => { navigation.navigate('signin'); };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text); // Actualiza el valor de la contraseña en tu vista
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
        setEmail('');
        setPassword('');
        console.log(userId + ' ' + userEmail + ' ' + userDisplayName);
        navigation.navigate('main');
      })
      .catch((error) => {
        console.log('Error al loggear usuario:', error);
      });
  };

  return (
    <ImageBackground
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/ui1.jpg?alt=media&token=23fac606-f1db-4f2a-baa5-35156a06461c&_gl=1*inpi9s*_ga*OTkyMTAxNDIzLjE2ODcwNTgxODg.*_ga_CW55HF8NVT*MTY5NzkzMDc4MC4yOTYuMS4xNjk3OTMxNzA1LjM2LjAuMA..' }} 
          style={{ flex: 1, justifyContent: 'center' }}
          resizeMode="cover"
    >
      <View style={InputForms.container}>
        <View style={InputForms.formContainer}>
          <Text style={[ Fonts.formTitle, {color: '#2F363B', marginBottom: 20}]}>Iniciar sesión</Text>
          <TextInput style={[InputForms.input, { marginBottom: 30 }]}
          placeholder="Correo electrónico" 
          keyboardType="email-address" 
          maxLength={100} 
          value={email}
          onChangeText={setEmail}
          />
          <PasswordInput
          placeholder="Contraseña"
          onPasswordChange={handlePasswordChange}
          passwordValue={password}
        />
          <TouchableOpacity style={[buttonStyles.formButton, { marginTop: 19 }]} onPress={handleLogin} >
            <Text style={[Fonts.buttonTitle, {textAlign: 'center', color: '#2F363B'}]}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text onPress={handleNavigateToSignIn} style={InputForms.signInText}>¿No estás registrado? <Text style={InputForms.signInLink}>SIGN IN</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;