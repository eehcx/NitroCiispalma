import React from 'react';
// import type {PropsWithChildren} from 'react';
import { 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  Alert, 
  TextInput, 
  Text, 
  Button, 
  View, 
  ImageBackground 
} from 'react-native';
// import { styled } from 'nativewind';
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

import Notices from '../components/announcements';

const HomeScreen = ({ navigateToScreen }) => {
  return (
      
      <StyledView style={{ flex: 1 }}>
        <Notices />
      </StyledView>
  );
};


export default HomeScreen;