import React, { useState } from 'react';
//React Native
import { StatusBar, View } from 'react-native';
// React Native Paper
import { Appbar, PaperProvider } from 'react-native-paper';
// Components
import RenderViews from '../../components/common/RenderingViews';
import CustomersList from './customers/CustomersList';
import CustomersCalc from './customers/CustomersCalc';
import CustomersInform from './customers/CustomersInform';
import FilterPagesIcon from '../../components/common/filters/FilterPagesIcon';
import FABGroups from '../../components/interface/FABGroups';
// Redux
import { useSelector } from 'react-redux';

const Views = { 
    LIST: CustomersList, 
    INFORM: CustomersInform, 
    CALC: CustomersCalc
};

// Pagina de listado de clientes
export default CustomersScreen = () => {
    const clientId = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("LIST");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View className='flex-1 bg-zinc-50'>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header className='bg-zinc-50' >
                <Appbar.Content title="Directorio de Clientes" />
            </Appbar.Header>
            <View className='mb-8 mr-4'>
                <View className='flex-row justify-between'>
                    <FilterPagesIcon icon='group' iconSize={24} text="Listado" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "LIST"} onPress={() => filterContent("LIST")}/>
                    <FilterPagesIcon isDisabled={!clientId} icon='feed' iconSize={24} text="Informes" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "INFORM"} onPress={() => filterContent("INFORM")}/>
                    <FilterPagesIcon isDisabled={!informId} icon='functions' iconSize={24} text="Cálculos" marginLeft={15} backgroundColor="#ECECEC" isSelected={selectedOption === "CALC"} onPress={() => filterContent("CALC")}/>
                </View>
            </View>
            <PaperProvider>
                <RenderViews data={Views} render={selectedOption} />
                <FABGroups/>
            </PaperProvider>
        </View>
    );
};