import React, { useState } from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NativationBar';

const MainScreen = ({navigateToScreen}) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>
        Hola
      </Text>
      <NavBar />
    </View>
  );
};

export default MainScreen;