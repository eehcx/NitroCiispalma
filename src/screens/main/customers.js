import React, { useEffect, useState } from 'react';
// Estilos globales
import InputForms from '../../styles/InputForms';
//React Native
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
// React Native Paper
import { Avatar, IconButton, Card, Divider, ActivityIndicator, MD2Colors, FAB, Portal, PaperProvider, Snackbar, Appbar, Checkbox, Switch } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// Components
import CustomersList from './customers/CustomersList';
import CustomersCalc from './customers/CustomersCalc';
import CustomersInform from './customers/CustomersInform';

// Componente de filtros
const FilterBtn = ({ icon, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor }) => (
    <TouchableOpacity style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#333" : backgroundColor, marginLeft, marginRight }]} onPress={onPress}>
        <View style={styles.FilterContainer}>
            <Text variant='titleSmall' style={[styles.txtIcon, { color: isSelected ? "white" : backgroundColor === "#333" ? "white" : "#000", fontSize: 13 }]}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

// Pagina de listado de clientes
const CustomersScreen = () => {
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Listado");
    const filterContent = (option) => { setSelectedOption(option); };
    // Navegación
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

    // Asignar color al avatar: 82c491
    const getRandomColor = () => {
        const greenVariants = [
        '#82c491'
          // Agrega más variantes de verde aquí si lo deseas
        ];
        return greenVariants[Math.floor(Math.random() * greenVariants.length)];
    };

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa' }}>
                <Appbar.Content title="Directorio de Clientes" />
            </Appbar.Header>
            <View style={[styles.BoxContainer, { marginBottom: 30, marginRight: 15 }]}>
                <View style={[styles.row]}>
                    <FilterBtn text="Listado" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Listado"} onPress={() => filterContent("Listado")}/>
                    <FilterBtn text="Informes" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Informes"} onPress={() => filterContent("Informes")}/>
                    <FilterBtn text="Cálculos" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Cálculos"} onPress={() => filterContent("Cálculos")}/>
                </View>
            </View>
            {selectedOption === 'Listado' && <CustomersList />}
            {selectedOption === 'Informes' && <CustomersInform />}
            {selectedOption === 'Cálculos' && <CustomersCalc />}
        </View>
    );
};

const styles = StyleSheet.create({
    // Estilos de btn
    groupChildLayout: {width: 90, height: 40, backgroundColor: "#ECECEC", borderRadius: 20},
    FilterContainer: {justifyContent: 'center', alignItems: 'center'},
    containerIco: {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    Icon3d: {marginBottom: 5},
    txtIcon: { textAlign: 'center', paddingTop: 8},
    // Estilos del container
    row: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default CustomersScreen; 