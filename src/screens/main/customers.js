import React, { useState } from 'react';
//React Native
import { StyleSheet, StatusBar, View } from 'react-native';
// React Native Paper
import { Appbar } from 'react-native-paper';
// Components
import CustomersList from './customers/CustomersList';
import CustomersCalc from './customers/CustomersCalc';
import CustomersInform from './customers/CustomersInform';
import FilterPagesReduced from '../../components/interface/filters/FilterPagesReduced';
import FilterPagesIcon from '../../components/interface/filters/FilterPagesIcon';
// Redux
import { useSelector } from 'react-redux';

// Pagina de listado de clientes
export default CustomersScreen = () => {
    const clientId = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);
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
                    <FilterPagesIcon icon='group' iconSize={24} text="Listado" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Listado"} onPress={() => filterContent("Listado")}/>
                    <FilterPagesIcon isDisabled={!clientId} icon='feed' iconSize={24} text="Informes" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Informes"} onPress={() => filterContent("Informes")}/>
                    <FilterPagesIcon isDisabled={!informId} icon='functions' iconSize={24} text="Cálculos" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Cálculos"} onPress={() => filterContent("Cálculos")}/>
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
    containerIco: {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    // Estilos del container
    row: { flexDirection: 'row', justifyContent: 'space-between' },
});