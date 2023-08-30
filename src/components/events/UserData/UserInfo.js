import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TextInput, View, Text } from 'react-native';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase

export default UserInformationScreen = () => {

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Información de usuario</Text>
            </View>
        </>
    );
};