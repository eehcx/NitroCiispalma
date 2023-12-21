import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setVm, setVb, setN, setP, calcularPorcentajeNt, clear } from '../../../features/calc/foliar/PorcentaJentSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';

export const PorcentaJent = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const porcentajent = useSelector(state => state.porcentajent);
    // Formula
    const [Vm, setvm] = useState('');
    const [Vb, setvb] = useState('');
    const [N, setn] = useState('');
    const [P, setp] = useState('');

    const handleCalculo = () => {
        NumVm = parseFloat(Vm);
        NumVb = parseFloat(Vb);
        NumN = parseFloat(N);
        NumP = parseFloat(P);
        try{
            if (currentInput === 1) {
                setvm(TextLabel); 
                dispatch(setVm(NumVm));
            } else if (currentInput === 2) {
                setvb(TextLabel);
                dispatch(setVb(NumVb));
            } else if (currentInput === 3) {
                setn(TextLabel);
                dispatch(setN(NumN));
            } else if (currentInput === 4) {
                setp(TextLabel);
                dispatch(setP(NumP));
            }
            dispatch(calcularPorcentajeNt());
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
    }, [currentInput, TextLabel]);

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