import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/interface/loading';

export default LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        checkLoginState();
    }, []);

    const checkLoginState = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (!user) {
                navigation.replace('entrace');
            } else {
                navigation.replace('main');
            }
        } catch (error) {
            console.log('Error al verificar el estado de inicio de sesión:', error);
            navigation.replace('entrace');
        }
    };

    return (
        <>
            <Loading />
        </>
    );
};