import React, { useState } from 'react';
import { View } from 'react-native';
import InputScreen from './screens/entrace';
// COMPONENTES

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('entrace');

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'entrace' && <InputScreen navigateToScreen={navigateToScreen} />}
    </View>
  );
};

export default App;
