//React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, Touchable } from 'react-native';
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
// Estilos
import Fonts from '../../../styles/Fonts';

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
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {elements.map((name, index) => (
                                <View key={index}>
                                    <ItemListRadioButton title={name} content={fechaFormateada} onPress={() => dispatch(setIndex(index))} status={calcName === name ? 'checked' : 'unchecked'} value={name} details={()=> alert('Mensaje de pruebas')}/>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

export default CalculationsList = () => {
    const navigation = useNavigation();
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Análisis Foliar");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <View style={[styles.BoxContainer, { paddingHorizontal:20, marginVertical: 15}]}>
                <View style={[styles.row]}>
                    <FilterPagesExtended text="Análisis Foliar" backgroundColor="#e4e5e6" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                    <FilterPagesExtended text="Análisis Suelos" backgroundColor="#e4e5e6" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                </View>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }} onPress={()=> navigation.navigate('CalibrationCurve')}>
                <Icon name="analytics" size={24} color='#767983' />
                <Text style={[styles.txtLabels, Fonts.addText]}>Curva de calibración</Text>
            </TouchableOpacity>
            <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
            {selectedOption === 'Análisis Foliar' && <ListFoliar />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
    // Estilos del container
    row: { flexDirection: 'row', justifyContent: 'space-between' },
});