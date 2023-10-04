import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
// Estilos
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addUser, logout } from '../../../features/user/userSlice';

export default UserInformationScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    // placeholder del perfil
    const placeholderName = user.displayName ? user.displayName : 'Establecer un Nombre';
    const placeholderEmail = user.email ? user.email : 'Establecer un Email';
    const placeholderPhone = user.phoneNumber ? user.phoneNumber : 'Establecer un Teléfono';

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <View style={{ backgroundColor: "#fafafa", flex: 1 }}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>Nombre</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder={placeholderName} maxLength={50}/>
                    <Text style={[Fonts.modalText, { marginRight: 210 }]}>Email</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder={placeholderEmail} maxLength={50}/>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>Teléfono</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder={placeholderPhone} maxLength={50}/>
                </View>
            </View>    
                <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}>
                    Enviar
                </Button>
            </View>
        </>
    );
};