//React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
// React Native Paper
import { MD2Colors, ActivityIndicator } from 'react-native-paper';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../../features/calc/CalculatorSlice';
// Helpers
import { formatDateToString } from '../../../utils/helpers/dateHelpers';
// Styles
import InputForms from '../../../styles/InputForms';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Componentes
import ItemListRadioButton from '../../../components/interface/ItemListRadioButton';

// Pagina de listado de clientes
export default CalculationsList = () => {
    // Redux
    const dispatch = useDispatch();
    const selected = useSelector(state => state.calculator.selected);
    // Navegación
    const navigation = useNavigation();
    // ID Muestra
    const [selectedCalculation, setSelectedCalculation] = useState(null);
    // Fecha
    const fecha = new Date();
    const fechaFormateada = formatDateToString(fecha);
    // ID Muestra
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    const elementos = [
        { id: 1, nombre: 'Micronutrientes' },
        { id: 2, nombre: 'Macronutrientes' },
        { id: 3, nombre: 'Calcular Boro' },
        { id: 4, nombre: 'Calcular Azufre' },
        { id: 5, nombre: 'Porcentaje Jent' },
        { id: 6, nombre: 'Porcentaje Jep' }
    ];

    // Radio Button para seleccionar el id de muestra
    const handleRadioButtonPress = async (selectedCalcs) => {
        setSelectedCalculation(selectedCalcs);
        dispatch(setSelected(selectedCalcs));
    };

    const handleDetails = async () => {
        try{
            alert('Mensaje de pruebas')
        } catch (error) {
            console.error('Error al obtener el Input', error);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <View style={[{ flex: 1 }]}>
            <SafeAreaView>
                {loading ? (
                    <View style={InputForms.container}>
                        <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                    </View>
                ) : (
                    <ScrollView onScroll={onScroll}>
                        {elementos.map((elemento, index) => (
                            <View key={index}>
                                <ItemListRadioButton title={elemento.nombre} content={fechaFormateada} onPress={() => handleRadioButtonPress(elemento.nombre)} status={selected === elemento.nombre ? 'checked' : 'unchecked'} value={elemento.nombre} details={()=> handleDetails()}/>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};