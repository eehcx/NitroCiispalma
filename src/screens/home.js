import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const HomeScreen = ({ navigateToScreen }) => {
  return (
      
      <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Text>InputScreen</Text>
      </View>
  );
};


export default HomeScreen;