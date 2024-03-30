import React, { } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
// Redux
import { useSelector } from 'react-redux';
import { Name } from '../../features/calc/CalculatorSlice';

import { BoroCalc } from './calc/BoroCalc';
import { AzufreCalc } from './calc/AzufreCalc';
import { MacronutrientesCalc } from './calc/MacronutrientesCalc';
import { MicronutrientesCalc } from './calc/MicronutrientesCalc';
import { PorcentaJent } from './calc/PorcentajeJent';
import { PorcentaJep } from './calc/PorcentajeJep';

export const AlternativeScreen = () => {
    const IdLab = useSelector(state => state.calculator.IdLab);
    const calcName = useSelector(Name);
    // Constantes para el scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    return(
        <>
            <View className='h-2/6 w-full bg-slate-50'>
                <SafeAreaView>
                    <ScrollView onScroll={onScroll}>
                        <View className='py-3 px-10'>
                            <View className='flex-row justify-between mb-10 mt-2 px-2'>
                                <Text className="text-lg font-normal tracking-wide text-gray-800">{calcName ? calcName : 'Cálculo'}: </Text>
                                <Text className="text-lg font-medium text-black">Id Lab. {IdLab}</Text>
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