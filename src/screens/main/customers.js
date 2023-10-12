import React, { useEffect, useState } from 'react';
// Estilos globales
import InputForms from '../../styles/InputForms';
//React Native
import { StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { Appbar } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Components
import CustomersList from './customers/CustomersList';
import CustomersCalc from './customers/CustomersCalc';
import CustomersInform from './customers/CustomersInform';

// Componente de filtros
const FilterBtn = ({ icon, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor }) => (
    <TouchableOpacity style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#41525C" : backgroundColor, marginLeft, marginRight }]} onPress={onPress} >
        <View style={styles.FilterContainer}>
            <Text variant='titleSmall' style={[styles.txtIcon, { color: isSelected ? "white" : backgroundColor === "#41525C" ? "white" : "#000", fontSize: 13 }]}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

// Pagina de listado de clientes
const CustomersScreen = () => {
    // Navegación
    const navigation = useNavigation();
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Listado");
    const filterContent = (option) => { setSelectedOption(option); };

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
// customerList
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