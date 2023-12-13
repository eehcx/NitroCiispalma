import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
// React Native Paper
import { Button } from 'react-native-paper';
import InputForms from '../../../../styles/InputForms';
// Real Time Database
import { saveClient } from '../../../../services/setService';

export default RegisterCustomer = () => {
    const [name, setName] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [phone, setPhone] = useState('');

    const handleSaved = () => {
        saveClient(name, phone);
        setName('');
        setRazonSocial('');
        setPhone('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fafafa" }}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 44, paddingLeft: 25 }]} value={name} onChangeText={setName} placeholder="Nombre del cliente" maxLength={100}/>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 44, paddingLeft: 25 }]} value={razonSocial} onChangeText={setRazonSocial} placeholder="Razón Social" maxLength={100}/>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 44, paddingLeft: 25 }]} value={phone} onChangeText={setPhone} keyboardType="numeric" placeholder="Número de teléfono" maxLength={10}/>
                    <Button icon="content-save" buttonColor="#C7FBD7" mode="contained-tonal" onPress={handleSaved}> Guardar cliente </Button>
                </View>
            </View>
        </View>
    );
};