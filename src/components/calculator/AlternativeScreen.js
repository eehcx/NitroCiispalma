import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
// Redux
import { useSelector } from 'react-redux';
// Estilos globales
import Fonts from '../../styles/Fonts';

import { BoroCalc } from './calc/BoroCalc';
import { AzufreCalc } from './calc/AzufreCalc';
import { MacronutrientesCalc } from './calc/MacronutrientesCalc';
import { MicronutrientesCalc } from './calc/MicronutrientesCalc';
import { PorcentaJent } from './calc/PorcentajeJent';
import { PorcentaJep } from './calc/PorcentajeJep';

const NullScreen = ({}) => {

    return(
        <>
            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', padding:10 }]}>
                <Text style={[ Fonts.labelSubtitle ]}>Debes seleccionar un cálculo</Text>
            </View>
        </>
    )
}

export const AlternativeScreen = ({ inputValue }) => {
    const calc = useSelector(state => state.calculator);
    // Constantes para el scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // Opción seleccionada
    const [selectedOption, setSelectedOption] = useState(calc.selected);
    const filterContent = (option) => { setSelectedOption(option); };

    useEffect(() => {
    }, [inputValue]);

    return(
        <>
            <View style={[styles.ScreenCalculator]}>
                <SafeAreaView>
                    <ScrollView onScroll={onScroll}>
                        <View style={{ paddingVertical: 15, paddingHorizontal: 50}}>
                            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                                <Text style={[ Fonts.formTitle, {color: '#2F363B', marginBottom: 20}]}>{calc.selected ? calc.selected : 'Cálculo'}</Text>
                            </View>
                            {selectedOption === '' && <NullScreen />}
                            {selectedOption === 'Calcular Boro' && <BoroCalc TextLabel={inputValue} />}
                            {selectedOption === 'Calcular Azufre' && <AzufreCalc TextLabel={inputValue} />}
                            {selectedOption === 'Macronutrientes' && <MacronutrientesCalc TextLabel={inputValue} />}
                            {selectedOption === 'Micronutrientes' && <MicronutrientesCalc TextLabel={inputValue} />}
                            {selectedOption === 'Porcentaje Jent' && <PorcentaJent TextLabel={inputValue} />}
                            {selectedOption === 'Porcentaje Jep' && <PorcentaJep TextLabel={inputValue} />}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{ height: '35%', width: "100%", backgroundColor: '#f1f2f3' }
});