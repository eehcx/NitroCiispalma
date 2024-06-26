import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput, setSum } from '../../../features/calc/CalculatorSlice';
import { setMgL_M, setMgL_B, setAforo, setPesoMuestra, setResultado, clear } from '../../../features/calc/foliar/MicronutrientesSlice';
// Componentes
import Input from '../../common/Forms/Input';
// Servicios
import { micronutrientsCalc } from '../../../utils/calculator/foliarCalc';

export const MicronutrientesCalc = () => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const micronutrientes = useSelector(state => state.micronutrientes);
    const inputValue = useSelector(state => state.calculator.value);
    // Formula
    const [mgLM, setmglm] = useState('');
    const [mgLB, setmglb] = useState('');
    const [Aforo, setaforo] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');

    const handleCalc = () => {
        const result = micronutrientsCalc(
            parseFloat(mgLM),
            parseFloat(mgLB),
            parseFloat(Aforo),
            parseFloat(PesoMuestra)
        );
        dispatch(setResultado(result));
    };

    const handleCalculo = () => {
        dispatch(setSum(4));
        try{
            if (currentInput === 1) {
                setmglm(inputValue); 
                dispatch(setMgL_M(parseFloat(mgLM)));
            } else if (currentInput === 2) {
                setmglb(inputValue);
                dispatch(setMgL_B(parseFloat(mgLB)));
            } else if (currentInput === 3) {
                setaforo(inputValue);
                dispatch(setAforo(parseFloat(Aforo)));
            } else if (currentInput === 4) {
                setpesoMuestra(inputValue);
                dispatch(setPesoMuestra(parseFloat(PesoMuestra)));
            }

            //const result = micronutrientsCalc(micronutrientes.mgL_M, micronutrientes.mgL_B, micronutrientes.aforo, micronutrientes.pesoMuestra);
            handleCalc();
            //dispatch(setResultado(result));

        } catch (error) {
            console.error('Error al mandar los datos', error);
        }
    };

    useEffect(() => {
        try{
            handleCalculo();
        } catch (error) {
            console.error('Error al obtener el Input', error);
        }
    }, [currentInput, inputValue]);
    const selected = "bg-slate-100 border-lime-700 border";
    const inputColor = "bg-slate-100 border-slate-200 border";
    const textSelected = "text-lime-700";
    const textColor = "text-gray-500";

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? selected : inputColor} TextColor={currentInput === 1 ? textSelected : textColor} placeholder='miligramos por litro de la muestra' value={mgLM} label='mgL M:' />
            <Input backgroundColor={currentInput === 2 ? selected : inputColor} TextColor={currentInput === 2 ? textSelected : textColor} placeholder='miligramos por litro del blanco' value={mgLB} label='mgL B:' />
            <Input backgroundColor={currentInput === 3 ? selected : inputColor} TextColor={currentInput === 3 ? textSelected : textColor} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 4 ? selected : inputColor} TextColor={currentInput === 4 ? textSelected : textColor}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />

            <View className="flex-1 items-center justify-center py-6 rounded-2xl mb-10 bg-slate-200">
                <Text className="text-2xl font-semibold text-slate-500">{isNaN(micronutrientes.resultado) ? "0000000000" : micronutrientes.resultado.toFixed(3)}</Text>
            </View>
        </>
    );
};