import React, { useEffect, useState } from 'react';
// Estilos globales
import InputForms from '../styles/InputForms';
//React Native
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
// React Native Paper
import { Avatar, IconButton, Card, Divider, ActivityIndicator, MD2Colors, FAB, Portal, PaperProvider, Snackbar, Appbar } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../utils/firebase/firebaseInit';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const CustomersScreen = () => {
    const navigation = useNavigation();
    const handleNavigateToNewCustomer = () => { navigation.navigate('registerCustomer'); };
    const handleNavigateToInforms = () => { navigation.navigate('registerInform'); };
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [selectedCliente, setSelectedCliente] = useState('');
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

    const onToggleSnackBar = (cliente) => {
        setSelectedCliente(cliente); 
        console.log(cliente)
        setVisible(true);
    };

    const onDismissSnackBar = () => setVisible(false);

    // Copiar ID al portapapeles
    const copyClientIdToClipboard = async (clientId) => {
        try {
            await Clipboard.setStringAsync(clientId);
            closeDialog(); 
            console.log(clientId)
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
        }
    };

    // Asignar color al avatar
    const getRandomColor = () => {
        const greenVariants = [
          '#82c460', '#82c476', '#82c491'
          // Agrega más variantes de verde aquí si lo deseas
        ];
        return greenVariants[Math.floor(Math.random() * greenVariants.length)];
      };

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa' }}>
                <Appbar.Content title="Clientes Registrados" />
            </Appbar.Header>
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
                                <Card.Title style={styles.cardList} title={cliente.nombre} subtitle={`ID: ${cliente.uid}`}
                                left={(props) => <Avatar.Text style={{backgroundColor: getRandomColor()}} size={48} label={cliente.nombre.substring(0, 1)} /> }
                                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => onToggleSnackBar(cliente)} />} 
                                />
                                <Divider style={styles.cardList} />
                            </View>
                        ))}
                    </ScrollView>
                    )}
                </SafeAreaView>
                <Portal>
                    <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'cog' : 'plus'}
                    actions={[
                        { icon: 'plus', onPress: () => console.log('Pressed add') },
                        { icon: 'account-group', label: 'Clientes', onPress: handleNavigateToNewCustomer },
                        { icon: 'file', label: 'Informes', onPress: handleNavigateToInforms },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                        // do something if the speed dial is open
                        }
                    }}
                    />
                    <Snackbar visible={visible} onDismiss={onDismissSnackBar} action={{ label: 'copy', onPress: () => { copyClientIdToClipboard(selectedCliente.uid) } }}>
                        Copiar ID en el portapapeles
                    </Snackbar>
                </Portal>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 10, marginBottom: 5 },
});

export default CustomersScreen; 