import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
// Importación de fuentes
import { useFonts } from 'expo-font';
import { Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins';


export default LoadingScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({ 'Poppins-100': Poppins_100Thin,'Poppins-200': Poppins_200ExtraLight,'Poppins-300': Poppins_300Light,'Poppins-400': Poppins_400Regular,'Poppins-500': Poppins_500Medium,'Poppins-600': Poppins_600SemiBold,'Poppins-700': Poppins_700Bold,'Poppins-800': Poppins_800ExtraBold,'Poppins-900': Poppins_900Black });

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
