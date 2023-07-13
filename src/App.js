import React, { useState, useEffect } from 'react';
import { configureFonts, MD2LightTheme, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { AppLoading } from 'expo';
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
import { handleLogout } from './utils/auth/authentication';
import MainScreen from './screens/home'
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

// Funcion principal de la aplicación
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('');

  useEffect(() => {
    checkLoginState();
  }, []);

  /*
  const [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }*/

  const checkLoginState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setCurrentScreen('home');
        setIsLoggedIn(true);
      } else {
        setCurrentScreen('entrace');
      }
    } catch (error) {
      //console.log('Error al verificar el estado de inicio de sesión:', error);
      setCurrentScreen('entrace'); 
    }
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'entrace' && <InputScreen navigateToScreen={navigateToScreen} />}
      {currentScreen === 'home' && <MainScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'login' && <LoginScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen =='logout' && <handleLogout navigateToScreen={navigateToScreen}/> }
      {currentScreen == 'signin' && <SignipScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'profile' && <ProfileScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'settings' && <SettingsScreen navigateToScreen={navigateToScreen}/>}
    </View>
  );
};
