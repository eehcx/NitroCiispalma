import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setExtractante, setPesoMuestra, setResultado } from '../../../features/calc/foliar/BoroSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';
//import { AverageInput } from '../../interface/Forms/AverageInput';
// Servicios
import { getCurve } from '../../../services/queryService';
import { boronCalc } from '../../../utils/calculator/foliarCalc';

export const BoroCalc = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.client.clientId);
    const currentInput = useSelector(selectCurrentInput);
    const boro = useSelector(state => state.boro);
    // Formula
    const [AbsM, setabsM] = useState('');
    const [AbsB, setabsB] = useState('');
    const [M, setm] = useState('');
    const [Extractante, setextractante] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');

    const getSlope = async () => {
        const prefix = 'boro';
        try {
            const data = await getCurve(calculoId, prefix);
            if (data !== null) {
                setm(data.pendiente);
            }
            console.log(M);
        } catch (e) {
                console.error(e);
        }
    };

    //const handleAverage = (value) => { dispatch(setAbsM(value)); };

    const handleCalculo = () => {
        try{
            if (currentInput === 1) {
                setabsM(TextLabel);
                dispatch(setAbsM(parseFloat(AbsM)));
            } else if (currentInput === 2) {
                setabsB(TextLabel);
                dispatch(setAbsB(parseFloat(AbsB)));
            } else if (currentInput === 3) {
                setm(TextLabel);
                dispatch(setM(parseFloat(M)));
            } else if (currentInput === 4) {
                setextractante(TextLabel);
                dispatch(setExtractante(parseFloat(Extractante)));
            } else if (currentInput === 5) {
                setpesoMuestra(TextLabel);
                dispatch(setPesoMuestra(parseFloat(PesoMuestra)));
            }
            const result = boronCalc(boro.AbsM, boro.AbsB, boro.m, boro.Extractante, boro.pesoMuestra);
            dispatch(setResultado(result));
            console.log('RESULTADO: ', result);
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
        console.log(boro);
    }, [currentInput, TextLabel]);

    return(
        <>
            {/*<AverageInput placeholder={'Absorbancia de la muestra'} label={'AbsM: '} value={AbsM} setValue={setabsM} setDispatch={handleAverage} />*/}
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'}  placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'}  placeholder='Pendiente de calibración' value={M} label='Pendiente:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'}  placeholder='Valor del extractante' value={Extractante} label='Extractante:' />
            <Input backgroundColor={currentInput === 5 ? '#dadada' : '#ECECEC'}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {boro.resultado}</Text>
            </View>
        </>
    );
};
