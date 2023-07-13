import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase dependencias e importaciones
/*
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
*/

export const handleLogout = async (navigateToScreen) => {
    try {
        // Eliminar el estado de inicio de sesión de AsyncStorage
        await AsyncStorage.removeItem('user');
        navigateToScreen('entrace');
    } catch (error) {
        console.log('Error al cerrar sesión:', error);
    }
};