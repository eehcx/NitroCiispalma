import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// React Native Paper
import { Button } from 'react-native-paper';
import InputForms from '../../styles/InputForms';
// Real Time Database
import { saveClient } from '../../utils/services/setService';

const Tab = createBottomTabNavigator();

export default RegisterCustomer = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSaved = () => {
        saveClient(name, phone);
        setName('');
        setPhone('');
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} value={name} onChangeText={setName} placeholder="Nombre de la empresa" maxLength={100}/>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} value={phone} onChangeText={setPhone} keyboardType="numeric" placeholder="Numero de telefono" maxLength={10}/>
                    <Button icon="content-save" buttonColor="#C7FBD7" mode="contained-tonal" onPress={handleSaved}>
                        Guardar cliente
                    </Button>
                </View>
            </View>
        </View>
    );
};