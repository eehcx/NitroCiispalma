import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput, setSum } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, setResultado, clear } from '../../../features/calc/foliar/PorcentaJepSlice';
// Componentes
import Input from '../../common/Forms/Input';
// Servicios
import { getCurve } from '../../../services/queryService';
import { pctJepCalc } from '../../../utils/calculator/foliarCalc';

export const PorcentaJep = () => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const calculoId = useSelector(state => state.client.clientId);
    const porcentajep = useSelector(state => state.porcentajep);
    const inputValue = useSelector(state => state.calculator.value);
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

    const handleCalc = () => {
        const result = pctJepCalc(
            parseFloat(AbsM),
            parseFloat(AbsB),
            parseFloat(M),
            parseFloat(B),
            parseFloat(Aforo),
            parseFloat(pesoMuestra),
            parseFloat(Alicuota)
        );
        dispatch(setResultado(result));
    };

    const handleCalculo = () => {
        dispatch(setSum(7));
        try{
            if (currentInput === 1) {
                setabsm(inputValue);
                dispatch(setAbsM(parseFloat(AbsM)));
            } else if (currentInput === 2) {
                setabsb(inputValue);
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
                setpesomuestra(inputValue);
                dispatch(setPesoMuestra(parseFloat(pesoMuestra)));
            } else if (currentInput === 7) {
                setalicuota(inputValue);
                dispatch(setAlicuota(parseFloat(Alicuota)));
            }

            //const result = pctJepCalc(porcentajep.AbsM, porcentajep.AbsB, porcentajep.m, porcentajep.b, porcentajep.aforo, porcentajep.pesoMuestra, porcentajep.alicuota);
            //dispatch(setResultado(result));
            handleCalc();

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
    }, [currentInput, inputValue]);
    const selected = "bg-slate-100 border-lime-700 border";
    const inputColor = "bg-slate-100 border-slate-200 border";
    const textSelected = "text-lime-700";
    const textColor = "text-gray-500";

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? selected : inputColor} TextColor={currentInput === 1 ? textSelected : textColor} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? selected : inputColor} TextColor={currentInput === 2 ? textSelected : textColor} placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? selected : inputColor} TextColor={currentInput === 3 ? textSelected : textColor} placeholder='Pendiente de calibración' value={M} label='Pendiente:' />
            <Input backgroundColor={currentInput === 4 ? selected : inputColor} TextColor={currentInput === 4 ? textSelected : textColor} placeholder='Valor de b' value={B} label='B:' />
            <Input backgroundColor={currentInput === 5 ? selected : inputColor} TextColor={currentInput === 5 ? textSelected : textColor} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 6 ? selected : inputColor} TextColor={currentInput === 6 ? textSelected : textColor} placeholder='Peso de la muestra (gramos)' value={pesoMuestra} label='Peso Muestra:' />
            <Input backgroundColor={currentInput === 7 ? selected : inputColor} TextColor={currentInput === 7 ? textSelected : textColor} placeholder='Volumen de la alícuota (ml)' value={Alicuota} label='Alicuota:' />

            <View className="flex-1 items-center justify-center py-6 rounded-2xl mb-10 bg-slate-200">
                <Text className="text-2xl font-semibold text-slate-500">{isNaN(porcentajep.resultado) ? "0000000000" : porcentajep.resultado.toFixed(3)}</Text>
            </View>
        </>
    );
};
