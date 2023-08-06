import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// React Native Paper
import { Button } from 'react-native-paper';
import InputForms from '../../styles/InputForms';
// Real Time Database
import { saveClient } from '../../utils/models/Registers';

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

const styles = StyleSheet.create({
    datePicker: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
    },
    BoxContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        backgroundColor: '#ECECEC',
        width: 110,
        height: 110,
        borderRadius: 25
    },
    txtContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});