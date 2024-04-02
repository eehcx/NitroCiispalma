//React Native
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { MD2Colors, ActivityIndicator, PaperProvider, Divider } from 'react-native-paper';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIndex, Name } from '../../../features/calc/CalculatorSlice';
// Helpers
import { formatDateToString } from '../../../utils/helpers/dateHelpers';
// Styles
import InputForms from '../../../styles/InputForms';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Componentes
import ItemListRadioButton from '../../../components/common/ItemListRadioButton';
import FilterPagesExtended from '../../../components/common/filters/FilterPagesExtended';
// Iconos
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListFoliar = () => {
    // Redux
    const dispatch = useDispatch();
    const elements = useSelector(state => state.calculator.calcNames);
    const calcName = useSelector(Name);
    // Fecha
    const fecha = new Date();
    const fechaFormateada = formatDateToString(fecha);
    // Scroll 
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    useEffect(() => {
        setLoading(false);
    }, []);

    return(
        <View className='flex-1 bg-slate-50'>
            <PaperProvider>
                <SafeAreaView className='flex-grow'>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {elements.map((element, index) => (
                                <View key={index}>
                                    <ItemListRadioButton title={element.name} content={element.description} onPress={() => dispatch(setIndex(index))} status={calcName === element.name ? 'checked' : 'unchecked'} value={element.name} />
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};
//details={()=> alert('Mensaje de pruebas')}
export default CalculationsList = () => {
    const navigation = useNavigation();
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Análisis Foliar");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View className='flex-1 bg-slate-50'>
            <View className='px-5 py-4'>
                <View className='flex-row justify-between'>
                    <FilterPagesExtended text="Análisis Foliar" backgroundColor="#e4e5e6" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                    <FilterPagesExtended text="Análisis Suelos" backgroundColor="#e4e5e6" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                </View>
            </View>
            <TouchableOpacity className='flex-row items-center justify-center p-3' onPress={()=> navigation.navigate('CalibrationCurve')}>
                <Icon name="analytics" size={24} color='#4b5563' />
                <Text className='ml-3 text-gray-600 text-lg font-semibold'>Curva de calibración</Text>
            </TouchableOpacity>
            <Divider className='bg-neutral-300 mx-5'/>
            {selectedOption === 'Análisis Foliar' && <ListFoliar />}
        </View>
    );
};