import React, { useState } from 'react';
import { View } from 'react-native';
import InputScreen from './screens/entrace';
import HomeScreen from './screens/home'
// COMPONENTES

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'entrace' && <InputScreen navigateToScreen={navigateToScreen} />}
      {currentScreen === 'home' && <HomeScreen navigateToScreen={navigateToScreen}/>}
    </View>
  );
};

export default App;