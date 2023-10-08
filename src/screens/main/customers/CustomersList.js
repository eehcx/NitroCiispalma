import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
// React Native Paper
import { Avatar, Divider, ActivityIndicator, MD2Colors, FAB, Portal, PaperProvider, RadioButton } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

import { useDispatch, useSelector } from 'react-redux';
import { setClientId } from '../../../features/client/clientSlice';

// Pagina de listado de clientes
const CustomersList = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const dispatch = useDispatch();
    const clientId = useSelector(state => state.client.clientId);

    const handleRadioButtonPress = (clienteId) => {
        setSelectedClientId(clienteId);
        console.log('Cliente ID seleccionado:', clienteId); // Añade este log para verificar el ID
        dispatch(setClientId(clienteId));
    };

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
    // 
    const [visible, setVisible] = React.useState(false);
    const closeDialog = () => { setVisible(false); };
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Firebase Realtime Database
    useEffect(() => {
        const database = getDatabase(app);
        const clientesRef = ref(database, 'clientes');
        const onClientesValue = onValue(clientesRef, (snapshot) => {
        const data = snapshot.val();
        const clientesArray = data ? Object.values(data) : [];
        setClientes(clientesArray);
        setLoading(false);
    });
    return () => {
        off(clientesRef, 'value', onClientesValue);
    };
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, }}>
                                        <Avatar.Text style={[{backgroundColor: '#d7dfe4', borderColor: "#bbb", borderWidth: 1}]} size={50} label={cliente.nombre.substring(0, 1)} />
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Text style={[styles.txtLabels, Fonts.modalText]}>{cliente.nombre}</Text>
                                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{cliente.uid}</Text>
                                        </View>
                                        <RadioButton.Item
                                        color='#167139'
                                        value={cliente.uid}
                                        status={clientId === cliente.uid ? 'checked' : 'unchecked'}
                                        onPress={() => handleRadioButtonPress(cliente.uid)}/>
                                    </View>
                                    <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
                <Portal>
                    <FAB.Group open={open} color='#fff' visible fabStyle={{ backgroundColor:"#41525C" }} rippleColor="#f1f1f1" icon={open ? 'cog' : 'plus'}
                    actions={[
                        { color:'#f1f1f1', icon: 'plus', style: { backgroundColor: '#41525C' } },
                        { color:'#f1f1f1', icon: 'layers', label: 'Paquetes', onPress: handleNavigateToPackage, style: { backgroundColor: '#41525C' } },
                        { color:'#f1f1f1', icon: 'account-group', label: 'Clientes', onPress: handleNavigateToNewCustomer, style: { backgroundColor: '#41525C' } },
                        { color:'#f1f1f1', icon: 'file', label: 'Informes', onPress: handleNavigateToInforms, style: { backgroundColor: '#41525C' } },
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

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});

export default CustomersList; 