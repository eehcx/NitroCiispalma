import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase dependencias e importaciones
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../app/firebase';
// Estilos de la pantalla
import buttonStyles from '../../../styles/buttonStyles';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Componentes
import PasswordInput from '../../../components/common/Forms/PasswordInput';

export default LoginScreen = () => {
  const navigation = useNavigation();
  const handleNavigateToSignIn = () => { navigation.navigate('signin'); };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (text) => { setPassword(text); };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
    <ImageBackground className='flex-1 justify-center' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/static%2FImages%2Ffondo.jpg?alt=media&token=6768490a-3093-451c-aa41-4cf583fe9d3b' }} resizeMode="cover" >
      <View style={InputForms.container}>
        <View style={InputForms.formContainer}>
          <Text style={[ Fonts.formTitle, {color: '#2F363B', marginBottom: 20}]}>Iniciar sesión</Text>
          <TextInput style={[InputForms.input, { marginBottom: 30 }]} placeholder="Correo electrónico" keyboardType="email-address" maxLength={100} value={email} onChangeText={setEmail} />
          <PasswordInput placeholder="Contraseña" onPasswordChange={handlePasswordChange} passwordValue={password} />
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