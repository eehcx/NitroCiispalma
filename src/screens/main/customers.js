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
                    <FilterPagesReduced text="Listado" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Listado"} onPress={() => filterContent("Listado")}/>
                    <FilterPagesReduced isDisabled={!clientId} text="Informes" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Informes"} onPress={() => filterContent("Informes")}/>
                    <FilterPagesReduced isDisabled={!informId} text="Cálculos" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "Cálculos"} onPress={() => filterContent("Cálculos")}/>
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