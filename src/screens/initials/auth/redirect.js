// redirect.js
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/loading';
// Redux
import { useDispatch } from 'react-redux';
import { addUser } from '../../../features/user/userSlice';

export default LoadingScreen = ({ navigation }) => {
    const dispatch = useDispatch();

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
        const checkUserInAsyncStorage = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    dispatch(addUser(user));
                }
                else{
                    navigation.replace('auth');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario desde AsyncStorage:', error);
            }
        };

        checkUserInAsyncStorage();
        checkLoginState();
    }, []);

    return (
        <>
            <Loading />
        </>
    );
};