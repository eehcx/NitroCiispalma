import React from 'react';
// Estilos globales
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';
//React Native
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert, ImageBackground, TextInput, View } from 'react-native';
import { useTheme, Text, Button, TouchableRipple,  } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Formulas: 9

const CustomersScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />

            <Text>Clientes Screen</Text>

        </View>
    );
};

const styles = StyleSheet.create({
});

export default CustomersScreen;