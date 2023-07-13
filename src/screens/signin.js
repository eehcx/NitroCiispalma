// Componentes necesarios
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../utils/firebase/firebase';

// Importación de estilos y utileria
import { StyleSheet, Button, ImageBackground, StatusBar, TouchableOpacity, KeyboardAvoidingView , TextInput, Image, Text, View } from 'react-native';
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';

//<TextInput style={InputForms.input} placeholder="Confirmar contraseña"  maxLength={20} secureTextEntry={true} />
const SignipScreen = ({ navigateToScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario creado');
        const user = userCredential.user;
        //console.log(user);
        // Realiza la navegación a la siguiente pantalla
        navigateToScreen('login');
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
            <TextInput style={InputForms.input} placeholder="Nombre" maxLength={90} />
            <TextInput style={InputForms.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo Electrónico" maxLength={90} />
            <TextInput style={InputForms.input} value={password} onChangeText={setPassword} placeholder="Contraseña" maxLength={10} keyboardType="default" secureTextEntry={true} />
            <TouchableOpacity style={buttonStyles.formButton} onPress={handleCreateAccount}>
              <Text style={buttonStyles.buttonText_Black}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={InputForms.signInText} onPress={() => navigateToScreen('login')} >¿Ya estas registrado? <Text style={InputForms.signInLink}>LOG IN</Text></Text>
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