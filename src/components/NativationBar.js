import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/EvilIcons'; // Importa el componente Icon y el conjunto de iconos EvilIcons

export default function NavBar () {
    return (
        <View style={{ flex: 1 }}>
            <Text>NavBar</Text>
            <Icon name="navicon" size={30} color="red" />
        </View>
    );
}