// Componentes necesarios
import React, { useState } from 'react';
// Firebase dependencias e importaciones
import { app } from '../firebase/firebaseInit';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
// Importación de estilos y utileria
import { StyleSheet, Button, ImageBackground, StatusBar, TouchableOpacity, KeyboardAvoidingView , TextInput, Image, Text, View } from 'react-native';
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const SignipScreen = () => {
  // React Navigation
  const navigation = useNavigation();
  // Firebase
  const auth = getAuth(app);
  // Estados de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  // Funciones de navegación
  const handleNavigateToLogIn = () => {
    navigation.navigate('login');
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName })
          .then(() => {
            console.log(user);
            navigation.navigate('login');
          })
          .catch((error) => {
            console.log('Error al guardar el displayName:', error);
          });
      })
      .catch((error) => {
        console.log('Error al crear usuario:', error);
      });
  };

    return (
        <ImageBackground
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/signup.jpg?alt=media&token=1b56ef87-73b9-49b2-b9ef-5ed793977835' }} 
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
        <View style={InputForms.container}>
          <View style={InputForms.formContainer}>
            <Text style={InputForms.formTitle}>Crear cuenta</Text>
            <TextInput style={InputForms.input} value={displayName} onChangeText={setDisplayName} placeholder="Nombre" maxLength={90} />
            <TextInput style={InputForms.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo Electrónico" maxLength={90} />
            <TextInput style={InputForms.input} value={password} onChangeText={setPassword} placeholder="Contraseña" maxLength={90} keyboardType="default" secureTextEntry={true} />
            <TouchableOpacity style={buttonStyles.formButton} onPress={handleCreateAccount}>
              <Text style={buttonStyles.buttonText_Black}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={InputForms.signInText} onPress={handleNavigateToLogIn} >¿Ya estas registrado? <Text style={InputForms.signInLink}>LOG IN</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 37,
    borderWidth: 1,
    backgroundColor: '#e6e6fa',
    borderColor: '#e6e6fa',
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SignipScreen;