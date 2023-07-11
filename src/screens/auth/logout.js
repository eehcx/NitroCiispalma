import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, BottomNavigation } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase dependencias e importaciones
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';

import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';

export default LogoutScreen = ({ navigateToScreen }) => {

    const handleLogout = async () => {
        try {
            // Eliminar el estado de inicio de sesión de AsyncStorage
            await AsyncStorage.removeItem('user');

            navigateToScreen('login');
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={InputForms.container}>
            <View style={InputForms.formContainer}>
                <TouchableOpacity style={[buttonStyles.formButton, { marginTop: 19 }]} onPress={handleLogout}>
                <Text style={buttonStyles.buttonText_Black}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};