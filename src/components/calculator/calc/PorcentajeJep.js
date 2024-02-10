import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, setResultado, clear } from '../../../features/calc/foliar/PorcentaJepSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';
// Servicios
import { getCurve } from '../../../services/queryService';
import { pctJepCalc } from '../../../utils/calculator/foliarCalc';

export const PorcentaJep = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const calculoId = useSelector(state => state.client.clientId);
    const porcentajep = useSelector(state => state.porcentajep);
    // Formula
    const [AbsM, setabsm] = useState('');
    const [AbsB, setabsb] = useState('');
    const [M, setm] = useState('');
    const [B, setb] = useState('');
    const [Aforo, setaforo] = useState('');
    const [pesoMuestra, setpesomuestra] = useState('');
    const [Alicuota, setalicuota] = useState('');

    const getSlope = async () => {
        const prefix = 'fosforo_olsen';
        try {
            const data = await getCurve(calculoId, prefix);
            if (data !== null) {
                setm(data.pendiente);
                setb(data.interseccion_eje_y);
            }
            console.log(M);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCalculo = () => {
        try{
            if (currentInput === 1) {
                setabsm(TextLabel);
                dispatch(setAbsM(parseFloat(AbsM)));
            } else if (currentInput === 2) {
                setabsb(TextLabel);
                dispatch(setAbsB(parseFloat(AbsB)));
            } else if (currentInput === 3) {
                setm(TextLabel);
                dispatch(setM(parseFloat(M)));
            } else if (currentInput === 4) {
                setb(TextLabel);
                dispatch(setB(parseFloat(B)));
            } else if (currentInput === 5) {
                setaforo(TextLabel);
                dispatch(setAforo(parseFloat(Aforo)));
            } else if (currentInput === 6) {
                setpesomuestra(TextLabel);
                dispatch(setPesoMuestra(parseFloat(pesoMuestra)));
            } else if (currentInput === 7) {
                setalicuota(TextLabel);
                dispatch(setAlicuota(parseFloat(Alicuota)));
            }

            const result = pctJepCalc(porcentajep.AbsM, porcentajep.AbsB, porcentajep.m, porcentajep.b, porcentajep.aforo, porcentajep.pesoMuestra, porcentajep.alicuota);
            dispatch(setResultado(result));

        } catch (error) {
            console.error('Error al mandar los datos', error);
        }
    };

    useEffect(() => {
        try{
            getSlope();
            handleCalculo();
        } catch (error) {
            console.error('Error al obtener el Input', error);
        }
    }, [currentInput, TextLabel]);

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'} placeholder='Pendiente de calibración' value={M} label='Pendiente:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'} placeholder='Valor de b' value={B} label='B:' />
            <Input backgroundColor={currentInput === 5 ? '#dadada' : '#ECECEC'} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 6 ? '#dadada' : '#ECECEC'} placeholder='Peso de la muestra (gramos)' value={pesoMuestra} label='Peso Muestra:' />
            <Input backgroundColor={currentInput === 7 ? '#dadada' : '#ECECEC'} placeholder='Volumen de la alícuota (ml)' value={Alicuota} label='Alicuota:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {porcentajep.resultado}</Text>
            </View>
        </>
    );
};
