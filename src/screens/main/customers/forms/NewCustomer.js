import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
// React Native Paper
import { Button } from 'react-native-paper';
import Fonts from '../../../../styles/Fonts';
import InputForms from '../../../../styles/InputForms';
// Real Time Database
import { setCliente } from '../../../../services/clientes';

export default RegisterCustomer = () => {
    const [name, setName] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [phone, setPhone] = useState('');

    const handleSaved = () => {
        setCliente(name, razonSocial, phone);
        setName('');
        setRazonSocial('');
        setPhone('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fafafa" }}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>Nombre</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 25 }, { height: 45, paddingLeft: 25 }]} value={name} onChangeText={setName} placeholder="Nombre del cliente" maxLength={100}/>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>Empresa</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 25 }, { height: 45, paddingLeft: 25 }]} value={razonSocial} onChangeText={setRazonSocial} placeholder="Razón Social" maxLength={100}/>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>Teléfono</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 25 }, { height: 45, paddingLeft: 25 }]} value={phone} onChangeText={setPhone} keyboardType="numeric" placeholder="Número de teléfono" maxLength={10}/>
                </View>
            </View>
            <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleSaved}> GUARDAR </Button>
        </View>
    );
};