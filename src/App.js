import React, { useState, useEffect } from 'react';
import { configureFonts, MD2LightTheme, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import InputScreen from './screens/entrace';
import LoginScreen from './screens/login';
import LogoutScreen from './screens/auth/logout'
import MainScreen from './screens/home'
import SignipScreen from './screens/signin';
import ProfileScreen from './screens/profile';
import SettingsScreen from './screens/settings';

/*CONFIGURACION DE LAS FUENTES DE APLICACION*/

const fontConfig = {
  web: {},
  ios: {},
  android: {},
};

const weights = ['100', '300', '500', '700', '800', '900'];
const styles = ['', 'italic'];

weights.forEach((weight) => {
  styles.forEach((style) => {
    const key = `Poppins-${weight}${style}`;
    const fontFamily = `Poppins-${weight}${style}`;

    fontConfig.web[key] = { fontFamily, fontWeight: 'normal' };
    fontConfig.ios[key] = { fontFamily, fontWeight: 'normal' };
    fontConfig.android[key] = { fontFamily, fontWeight: 'normal' };
  });
});

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};

// Entradas de la aplicación (screens)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('');

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        setCurrentScreen('home'); // Hay un usuario logueado, redirige a 'home'
      } else {
        setCurrentScreen('entrace'); // No hay un usuario logueado, redirige a 'entrace'
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
      {currentScreen == 'logout' && <LogoutScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'signin' && <SignipScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'profile' && <ProfileScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'settings' && <SettingsScreen navigateToScreen={navigateToScreen}/>}
    </View>
  );
};

export default App;