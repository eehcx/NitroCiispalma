import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// React Native Paper
import { Button } from 'react-native-paper';
import Fonts from '../../../../styles/Fonts';
import InputForms from '../../../../styles/InputForms';
// Real Time Database
import { setCliente } from '../../../../services/clientes';
// Componentes
import InputText from '../../../../components/interface/Forms/InputText';

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
                    <InputText backgroundColor='#ECECEC' placeholder='Nombre del cliente' value={name} onChange={setName}label='Nombre' marginRight={200} />
                    <InputText backgroundColor='#ECECEC' placeholder='Razón Social' value={razonSocial} onChange={setRazonSocial} label='Empresa' marginRight={200} />
                    <InputText backgroundColor='#ECECEC' placeholder='Número de teléfono' value={phone} onChange={setPhone} label='Teléfono' marginRight={200} />
                </View>
            </View>
            <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleSaved}> GUARDAR </Button>
        </View>
    );
};