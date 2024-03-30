import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput, setSum } from '../../../features/calc/CalculatorSlice';
import { setVm, setVb, setN, setP, setResultado, clear } from '../../../features/calc/foliar/PorcentaJentSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../common/Forms/Input';
// Servicios
import { pctJentCalc } from '../../../utils/calculator/foliarCalc';

export const PorcentaJent = () => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const porcentajent = useSelector(state => state.porcentajent);
    const inputValue = useSelector(state => state.calculator.value);
    // Formula
    const [Vm, setvm] = useState('');
    const [Vb, setvb] = useState('');
    const [N, setn] = useState('');
    const [P, setp] = useState('');

    const handleCalculo = () => {
        dispatch(setSum(4));
        try{
            if (currentInput === 1) {
                setvm(inputValue); 
                dispatch(setVm(parseFloat(Vm)));
            } else if (currentInput === 2) {
                setvb(inputValue);
                dispatch(setVb(parseFloat(Vb)));
            } else if (currentInput === 3) {
                setn(inputValue);
                dispatch(setN(parseFloat(N)));
            } else if (currentInput === 4) {
                setp(inputValue);
                dispatch(setP(parseFloat(P)));
            }

            const result = pctJentCalc(porcentajent.Vm, porcentajent.Vb, porcentajent.N, porcentajent.p);
            dispatch(setResultado(result));

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
            <Input backgroundColor={currentInput === 1 ? selected : inputColor} TextColor={currentInput === 1 ? textSelected : textColor} placeholder='Valor de la muestra' value={Vm} label='Vm:' />
            <Input backgroundColor={currentInput === 2 ? selected : inputColor} TextColor={currentInput === 2 ? textSelected : textColor} placeholder='Valor del blanco' value={Vb} label='Vb:' />
            <Input backgroundColor={currentInput === 3 ? selected : inputColor} TextColor={currentInput === 3 ? textSelected : textColor} placeholder='Valor de N' value={N} label='N:' />
            <Input backgroundColor={currentInput === 4 ? selected : inputColor} TextColor={currentInput === 4 ? textSelected : textColor} placeholder='Valor de p' value={P} label='P:' />

            <View className="flex-1 items-center justify-center py-6 rounded-2xl mb-10 bg-slate-200">
                <Text className="text-2xl font-semibold text-slate-500">{isNaN(porcentajent.resultado) ? "0000000000" : porcentajent.resultado.toFixed(3)}</Text>
            </View>
        </>
    );
};