import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { calcularBoro, setAbsM, setAbsB, setM, setExtractante, setPesoMuestra } from '../../../features/calc/foliar/BoroSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';

export const BoroCalc = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const boro = useSelector(state => state.boro);
    // Formula
    const [AbsM, setabsM] = useState('');
    const [AbsB, setabsB] = useState('');
    const [M, setm] = useState('');
    const [Extractante, setextractante] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');

    const handleCalculo = () => {
        NumAbsM = parseFloat(AbsM);
        NumAbsB = parseFloat(AbsB);
        NumM = parseFloat(M);
        NumExtractante = parseFloat(Extractante);
        NumPesoMuestra = parseFloat(PesoMuestra)
        try{
            if (currentInput === 1) {
                setabsM(TextLabel); 
                dispatch(setAbsM(NumAbsM));
            } else if (currentInput === 2) {
                setabsB(TextLabel); 
                dispatch(setAbsB(NumAbsB));
            } else if (currentInput === 3) {
                setm(TextLabel);
                dispatch(setM(NumM));
            } else if (currentInput === 4) {
                setextractante(TextLabel);
                dispatch(setExtractante(NumExtractante));
            } else if (currentInput === 5) {
                setpesoMuestra(TextLabel);
                dispatch(setPesoMuestra(NumPesoMuestra));
            }
            dispatch(calcularBoro());
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
        console.log(boro);
    }, [currentInput, TextLabel]);

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'}  placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'}  placeholder='Valor de M' value={M} label='M:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'}  placeholder='Valor del extractante' value={Extractante} label='Extractante:' />
            <Input backgroundColor={currentInput === 5 ? '#dadada' : '#ECECEC'}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {boro.resultado}</Text>
            </View>
        </>
    );
};