import React, { useState } from 'react';
import { configureFonts, MD2LightTheme, PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import InputScreen from './screens/entrace';
import LoginScreen from './screens/login';
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

const weights = ['100', '300', '500', '700', '900'];
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
  const [currentScreen, setCurrentScreen] = useState('entrace');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'entrace' && <InputScreen navigateToScreen={navigateToScreen} />}
      {currentScreen === 'home' && <MainScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'login' && <LoginScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'signin' && <SignipScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'profile' && <ProfileScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'settings' && <SettingsScreen navigateToScreen={navigateToScreen}/>}
    </View>
  );
};

export default App;