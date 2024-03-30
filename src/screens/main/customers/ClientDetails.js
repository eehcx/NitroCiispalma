import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Componentes
import InputText from '../../../components/common/Forms/InputText';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../features/client/clientSlice';

export default ClientDetails = () => {
    // Redux
    const dispatch = useDispatch();
    // Navegación
    const navigation = useNavigation();
    // Redux
    const client = useSelector(state => state.client);
    const uid = useSelector(state => state.client.clientId);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // Variables
    const [nombre, setNombre] = useState('');
    const [razon_social, setRazonSocial] = useState('');
    const [telefono, setTelefono] = useState('');
    const newData = { nombre, razon_social, telefono };

    const handleUpdate = () => {
        fetch(`https://us-central1-ciispalmaapp.cloudfunctions.net/app/api/clients/${uid}`, { 
            method: 'PUT', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newData), 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                dispatch(update(nombre, razon_social, telefono));
                //console.log(client);
                return response.json();
            })
            .then(data => {
                //console.log('Colección actualizada:', data);
                navigation.goBack();
            })
            .catch(error => {
                console.error('Hubo un problema al actualizar la colección:', error);
            });
    };

    useEffect(() => {
        const handleRedux = async () => {
            try {
                setNombre(client.Nombre);
                setRazonSocial(client.RazonSocial);
                setTelefono(client.Telefono);
            } catch (error) {
                console.error('Error al obtener el informe:', error);
            }
        };

        handleRedux();
    }, []);

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <SafeAreaView className='bg-zinc-50 flex-1'>
                <ScrollView onScroll={onScroll}>
                    <View style={InputForms.container}>
                        <View style={InputForms.formContainer}>
                            <InputText backgroundColor='#ECECEC' placeholder='Nombre del cliente' value={nombre} onChange={setNombre} label='Nombre' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Razón social' value={razon_social} onChange={setRazonSocial} label='Empresa' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Número de telefono' value={telefono} onChange={setTelefono} label='Telefono' marginRight={200} />
                        </View>
                    </View>
                </ScrollView>
                <Button onPress={handleUpdate} mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> Actualizar </Button>
            </SafeAreaView>
        </>
    );
};