import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

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
