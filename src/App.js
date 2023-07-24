import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';

// Importación de fuentes
import { useFonts } from 'expo-font';
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

// Pantallas de la aplicación
import InputScreen from './screens/entrace';
import LoginScreen from './screens/login';
import MainScreen from './screens/main'
import HomeScreen from './screens/home';
import SignipScreen from './screens/signin';
import ProfileScreen from './screens/profile';
import SettingsScreen from './screens/settings';


// Fuentes de la aplicación
async function loadFonts() {
  await Font.loadAsync({
    'Poppins-100': Poppins_100Thin,
    'Poppins-100Italic': Poppins_100Thin_Italic,
    'Poppins-200': Poppins_200ExtraLight,
    'Poppins-200Italic': Poppins_200ExtraLight_Italic,
    'Poppins-300': Poppins_300Light,
    'Poppins-300Italic': Poppins_300Light_Italic,
    'Poppins-400': Poppins_400Regular,
    'Poppins-400Italic': Poppins_400Regular_Italic,
    'Poppins-500': Poppins_500Medium,
    'Poppins-500Italic': Poppins_500Medium_Italic,
    'Poppins-600': Poppins_600SemiBold,
    'Poppins-600Italic': Poppins_600SemiBold_Italic,
    'Poppins-700': Poppins_700Bold,
    'Poppins-700Italic': Poppins_700Bold_Italic,
    'Poppins-800': Poppins_800ExtraBold,
    'Poppins-800Italic': Poppins_800ExtraBold_Italic,
    'Poppins-900': Poppins_900Black,
    'Poppins-900Italic': Poppins_900Black_Italic,
  });
}

const Stack = createStackNavigator();
const navigationRef = React.createRef();

// Funcion principal de la aplicación
export default function App() {
  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        // Si el usuario está logueado, navegamos a la pantalla "home"
        navigationRef.current?.navigate('main');
      } else {
        // Si el usuario no está logueado, navegamos a la pantalla "entrace"
        navigationRef.current?.navigate('entrace');
      }
    } catch (error) {
      console.log('Error al verificar el estado de inicio de sesión:', error);
    }
  };

  const navigateToScreen = (screen) => {
    // Navegar a la pantalla especificada utilizando React Navigation
    navigationRef.current?.navigate(screen);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen 
        name="entrace" 
        component={InputScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="main" 
        component={MainScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="home" 
        component={HomeScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="login" 
        component={LoginScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="signin" 
        component={SignipScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen 
        name="profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
