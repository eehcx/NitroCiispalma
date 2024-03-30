import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput, setSum } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, setResultado, clear } from '../../../features/calc/foliar/azufreSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../common/Forms/Input';
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
        dispatch(setSum(7));
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
    const selected = "bg-slate-100 border-lime-700 border";
    const inputColor = "bg-slate-100 border-slate-200 border";
    const textSelected = "text-lime-700";
    const textColor = "text-gray-500";

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? selected : inputColor} TextColor={currentInput === 1 ? textSelected : textColor} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? selected : inputColor} TextColor={currentInput === 2 ? textSelected : textColor} placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? selected : inputColor} TextColor={currentInput ===3 ? textSelected : textColor} placeholder='Valor de m' value={M} label='M:' />
            <Input backgroundColor={currentInput === 4 ? selected : inputColor} TextColor={currentInput === 4 ? textSelected : textColor} placeholder='Valor de b' value={B} label='B:' />
            <Input backgroundColor={currentInput === 5 ? selected : inputColor} TextColor={currentInput === 5 ? textSelected : textColor} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 6 ? selected : inputColor} TextColor={currentInput === 6 ? textSelected : textColor} placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />
            <Input backgroundColor={currentInput === 7 ? selected : inputColor} TextColor={currentInput === 7 ? textSelected : textColor} placeholder='Volumen de la alícuota (ml)' value={alicuota} label='Alicuota:' />

            <View className="flex-1 items-center justify-center py-6 rounded-2xl mb-10 bg-slate-200">
                <Text className="text-2xl font-semibold text-slate-500">{isNaN(azufre.resultado) ? "0000000000" : azufre.resultado.toFixed(3)}</Text>
            </View>
        </>
    );
};