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

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='Valor de la muestra' value={Vm} label='Vm:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'} placeholder='Valor del blanco' value={Vb} label='Vb:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'} placeholder='Valor de N' value={N} label='N:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'} placeholder='Valor de p' value={P} label='P:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {porcentajent.resultado}</Text>
            </View>
        </>
    );
};