import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        checkLoginState();
    }, []);

    const checkLoginState = async () => {
        try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            // Si el usuario está logueado, navegamos a la pantalla "main"
            navigation.replace('main');
        } else {
            // Si el usuario no está logueado, navegamos a la pantalla "entrace"
            navigation.replace('entrace');
        }
        } catch (error) {
        console.log('Error al verificar el estado de inicio de sesión:', error);
        // En caso de error, también redirigir a la pantalla "entrace"
        navigation.replace('entrace');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: "#fafafa" }]}>
            <ActivityIndicator size="large" color="#82c491" />
            <Text style={{ marginTop: 4 }} variant='titleSmall' >Cargando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default LoadingScreen;
