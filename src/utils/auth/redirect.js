// redirect.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/loading';

export default LoadingScreen = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(true);

    /*
    useEffect(() => {
        checkInternetConnection();
    }, []);    

    const checkInternetConnection = async () => {
        try {
            const response = await fetch('https://www.google.com', { method: 'HEAD' });
            if (response.status === 200) {
                setIsConnected(true);
                checkLoginState();
            } else {
                setIsConnected(false);
            }
        } catch (error) {
            setIsConnected(false);
        }
    };*/

    const checkLoginState = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (!user) {
                navigation.replace('auth');
            } else {
                navigation.replace('main');
            }
        } catch (error) {
            console.log('Error al verificar el estado de inicio de sesión:', error);
            navigation.replace('entrace');
        }
    };

    useEffect(() => {
        checkLoginState();
    }, []);

    return (
        <>
            {isConnected ? (
                <Loading />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No hay conexión a Internet. Por favor, conéctese a una red y vuelva a intentarlo.</Text>
                </View>
            )}
        </>
    );
};