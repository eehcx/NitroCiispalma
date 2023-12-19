import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
// React Native Paper
import { Avatar, Divider, ActivityIndicator, MD2Colors, FAB, Portal, PaperProvider, RadioButton } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setNombre, setRazonSocial, setClientId } from '../../../features/client/clientSlice';
// Servicio de consulta
import { getClientes } from '../../../services/clientes';
// Componentes
import FilterPagesIcon from '../../../components/interface/filters/FilterPagesIcon';

// Pagina de listado de clientes
const CustomersList = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const dispatch = useDispatch();
    const clientId = useSelector(state => state.client.clientId);
    //const client = useSelector(state => state.client);

    // Navegación
    const navigation = useNavigation();
    const handleNavigateToNewCustomer = () => { navigation.navigate('registerCustomer'); };
    const handleNavigateToInforms = () => { navigation.navigate('registerInform'); };
    const handleNavigateToPackage = () => { navigation.navigate('registerPackage'); }
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    // FAB Hooks
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    // Hooks para el estado de los clientes
    const [clientes, setClientes] = useState([]);
    // Hooks para el estado del componente
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    const handleRadioButtonPress = (clienteId, Nombre, RazonSocial) => {
        setSelectedClientId(clienteId);

        dispatch(setClientId(clienteId));
        dispatch(setNombre(Nombre));
        dispatch(setRazonSocial(RazonSocial));
        console.log('Cliente seleccionado: \n', Nombre, RazonSocial, clienteId);
    };

    const handleDetails = async (informeId) => {
        try {
        } catch (error) {
            console.error('Error al obtener datos de informes', error);
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
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {clientes.slice().reverse().map((cliente, index) => (
                                <View key={index}>
                                    <ItemListRadioButton title={cliente.razon_social} content={cliente.uid} onPress={() => handleRadioButtonPress(cliente.uid, cliente.nombre, cliente.razon_social)} status={ clientId === cliente.uid ? 'checked' : 'unchecked'} value={cliente.uid} details={() => handleDetails()}/>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
                <Portal>
                    <FAB.Group open={open} color='#fff' visible fabStyle={{ backgroundColor:"#41525C" }} rippleColor="#f1f1f1" icon={open ? 'plus' : 'plus'}
                    actions={[
                        { color:'#f1f1f1', icon: 'account-cog', label: 'Paquetes', onPress: handleNavigateToPackage, style: { backgroundColor: '#41525C' } },
                        { color:'#f1f1f1', icon: 'account-cog', label: 'Clientes', onPress: handleNavigateToNewCustomer, style: { backgroundColor: '#41525C' } },
                        { color:'#f1f1f1', icon: 'account-cog', label: 'Informes', onPress: handleNavigateToInforms, style: { backgroundColor: '#41525C' } },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                        // do something if the speed dial is open
                        }
                    }}
                    />
                </Portal>
            </PaperProvider>
        </View>
    );
};

export default CustomersList;

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});