import React, { useEffect, useState } from 'react';
//React Native
import { SafeAreaView, ScrollView, View } from 'react-native';
// React Native Paper
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Styles
import InputForms from '../../../styles/InputForms';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setNombre, setRazonSocial, setClientId, setTelefono } from '../../../features/client/clientSlice';
// Servicio de consulta
import { getClientes } from '../../../services/clientes';

// Pagina de listado de clientes
export default CustomersList = () => {
    // Navegación
    const navigation = useNavigation();
    const [selectedClientId, setSelectedClientId] = useState(null);
    const dispatch = useDispatch();
    const clientId = useSelector(state => state.client.clientId);
    //const client = useSelector(state => state.client);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    // Hooks para el estado de los clientes
    const [clientes, setClientes] = useState([]);
    // Hooks para el estado del componente
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    const handleRadioButtonPress = (clienteId, Nombre, RazonSocial, Telefono) => {
        setSelectedClientId(clienteId);

        dispatch(setClientId(clienteId));
        dispatch(setNombre(Nombre));
        dispatch(setRazonSocial(RazonSocial));
        dispatch(setTelefono(Telefono));
        console.log('Cliente seleccionado: \n', Nombre, RazonSocial, clienteId, Telefono);
    };

    const handleDetails = async (clienteId, Nombre, RazonSocial, Telefono) => {
        try {
            setSelectedClientId(clienteId);

            dispatch(setClientId(clienteId));
            dispatch(setNombre(Nombre));
            dispatch(setRazonSocial(RazonSocial));
            dispatch(setTelefono(Telefono));

            navigation.navigate('ClientDetails')
        } catch (error) {
            console.error('Error al obtener datos de clientes', error);
        }
    };

    // Firebase Realtime Database
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const clientesData = await getClientes();
                setClientes(clientesData);
            } catch (error) {
                console.error('Error al obtener clientes', error);
            }
        };

        obtenerClientes();
        setLoading(false);
    }, []);

    return (
        <View className='flex-1 bg-zinc-50'>
            <SafeAreaView className='flex-grow'>
                {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                ) : (
                    <ScrollView onScroll={onScroll}>
                        {clientes.slice().reverse().map((cliente, index) => (
                            <View key={index}>
                                <ItemListRadioButton title={cliente.razon_social} content={cliente.uid} onPress={() => handleRadioButtonPress(cliente.uid, cliente.nombre, cliente.razon_social, cliente.telefono)} status={ clientId === cliente.uid ? 'checked' : 'unchecked'} value={cliente.uid} details={() => handleDetails(cliente.uid, cliente.nombre, cliente.razon_social, cliente.telefono)}/>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};