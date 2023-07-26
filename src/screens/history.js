import React from 'react';
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';
//REACT NATIVE Y TAILWIND CSS
import { StyleSheet, SafeAreaView, StatusBar, Alert, ImageBackground, View } from 'react-native';
import { useTheme, Text, Button, TouchableRipple,  } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text>History Screen</Text>
        </View>
    );
};

export default HistoryScreen;