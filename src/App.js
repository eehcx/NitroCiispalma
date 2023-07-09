import React, { useState } from 'react';
import { View } from 'react-native';
import InputScreen from './screens/entrace';
import LoginScreen from './screens/login';
import MainScreen from './screens/home'
import SignipScreen from './screens/sigin';
// COMPONENTES

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'entrace' && <InputScreen navigateToScreen={navigateToScreen} />}
      {currentScreen === 'home' && <MainScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'login' && <LoginScreen navigateToScreen={navigateToScreen}/>}
      {currentScreen == 'signin' && <SignipScreen navigateToScreen={navigateToScreen}/>}
    </View>
  );
};

export default App;