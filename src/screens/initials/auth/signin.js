// Componentes necesarios
import React, { useState } from 'react';
// Firebase dependencias e importaciones
import { app } from '../../../app/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
// Importación de estilos y utileria
import { ImageBackground, TouchableOpacity, TextInput, Text, View } from 'react-native';
import buttonStyles from '../../../styles/buttonStyles';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

// React Navigation
import { useNavigation } from '@react-navigation/native';

export default SignipScreen = () => {
  // React Navigation
  const navigation = useNavigation();
  // Firebase
  const auth = getAuth(app);
  // Estados de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (text) => { setPassword(text); };
  const [displayName, setDisplayName] = useState('');
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
        <ImageBackground className='flex-1 justify-center' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/static%2FImages%2Ffondo.jpg?alt=media&token=6768490a-3093-451c-aa41-4cf583fe9d3b' }} resizeMode="cover" >
        <View style={InputForms.container}>
          <View style={InputForms.formContainer}>
            <Text style={[Fonts.formTitle, {color: '#2F363B', marginBottom: 20}]}>Crear cuenta</Text>
            <TextInput style={InputForms.input} value={displayName} onChangeText={setDisplayName} placeholder="Nombre" maxLength={90} />
            <TextInput style={InputForms.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo Electrónico" maxLength={90} />
            <PasswordInput placeholder="Contraseña" onPasswordChange={handlePasswordChange} passwordValue={password} />
            <TouchableOpacity style={buttonStyles.formButton} onPress={handleCreateAccount}>
              <Text style={[Fonts.buttonTitle, {textAlign: 'center', color: '#2F363B'}]}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={InputForms.signInText} onPress={handleNavigateToLogIn} >¿Ya estas registrado? <Text style={InputForms.signInLink}>LOG IN</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
};