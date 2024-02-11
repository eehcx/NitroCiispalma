import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, setResultado, clear } from '../../../features/calc/foliar/azufreSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';
// Servicios
import { sulfurCalc } from '../../../utils/calculator/foliarCalc';

export const AzufreCalc = () => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const azufre = useSelector(state => state.azufre);
    const inputValue = useSelector(state => state.calculator.value);
    // Formula
    const [AbsM, setabsM] = useState('');
    const [AbsB, setabsB] = useState('');
    const [M, setm] = useState('');
    const [B, setb] = useState('');
    const [Aforo, setaforo] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');
    const [alicuota, setalicuota] = useState('');

    const handleCalculo = () => {
        try{
            if (currentInput === 1) {
                setabsM(inputValue); 
                dispatch(setAbsM(parseFloat(AbsM)));
            } else if (currentInput === 2) {
                setabsB(inputValue); 
                dispatch(setAbsB(parseFloat(AbsB)));
            } else if (currentInput === 3) {
                setm(inputValue);
                dispatch(setM(parseFloat(M)));
            } else if (currentInput === 4) {
                setb(inputValue);
                dispatch(setB(parseFloat(B)));
            } else if (currentInput === 5) {
                setaforo(inputValue);
                dispatch(setAforo(parseFloat(Aforo)));
            } else if (currentInput === 6) {
                setpesoMuestra(inputValue);
                dispatch(setPesoMuestra(parseFloat(PesoMuestra)));
            } else if (currentInput === 7) {
                setalicuota(inputValue);
                dispatch(setAlicuota(parseFloat(alicuota)));
            }
            const result = sulfurCalc(azufre.AbsM, azufre.AbsB, azufre.m, azufre.b, azufre.aforo, azufre.pesoMuestra, azufre.alicuota);
            dispatch(setResultado(result));
            //console.log('RESULTADO: ', result);
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
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'} placeholder='Valor de m' value={M} label='M:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'} placeholder='Valor de b' value={B} label='B:' />
            <Input backgroundColor={currentInput === 5 ? '#dadada' : '#ECECEC'} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 6 ? '#dadada' : '#ECECEC'}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />
            <Input backgroundColor={currentInput === 7 ? '#dadada' : '#ECECEC'}  placeholder='Volumen de la alícuota (ml)' value={alicuota} label='Alicuota:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {azufre.resultado}</Text>
            </View>
        </>
    );
};