import React, { } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
// Redux
import { useSelector } from 'react-redux';
import { Name } from '../../features/calc/CalculatorSlice';
// Estilos globales
import Fonts from '../../styles/Fonts';

import { BoroCalc } from './calc/BoroCalc';
import { AzufreCalc } from './calc/AzufreCalc';
import { MacronutrientesCalc } from './calc/MacronutrientesCalc';
import { MicronutrientesCalc } from './calc/MicronutrientesCalc';
import { PorcentaJent } from './calc/PorcentajeJent';
import { PorcentaJep } from './calc/PorcentajeJep';

export const AlternativeScreen = () => {
    const calcName = useSelector(Name);
    // Constantes para el scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    return(
        <>
            <View className='h-2/6 w-full bg-slate-50'>
                <SafeAreaView>
                    <ScrollView onScroll={onScroll}>
                        <View style={{ paddingVertical: 15, paddingHorizontal: 50}}>
                            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                                <Text style={[ Fonts.formTitle, {color: '#2F363B', marginBottom: '15%'}]}>{calcName ? calcName : 'Cálculo'}</Text>
                            </View>
                            {calcName === 'Calcular Boro' && <BoroCalc />}
                            {calcName === 'Calcular Azufre' && <AzufreCalc />}
                            {calcName === 'Macronutrientes' && <MacronutrientesCalc />}
                            {calcName === 'Micronutrientes' && <MicronutrientesCalc />}
                            {calcName === 'Porcentaje Jent' && <PorcentaJent />}
                            {calcName === 'Porcentaje Jep' && <PorcentaJep />}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    );
};