import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput, setSum } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setExtractante, setPesoMuestra, setResultado } from '../../../features/calc/foliar/BoroSlice';
// Componentes
import Input from '../../common/Forms/Input';
//import { AverageInput } from '../../interface/Forms/AverageInput';
// Servicios
import { getCurve } from '../../../services/queryService';
import { boronCalc } from '../../../utils/calculator/foliarCalc';

export const BoroCalc = () => {
    // Redux
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.client.clientId);
    const currentInput = useSelector(selectCurrentInput);
    const boro = useSelector(state => state.boro);
    const inputValue = useSelector(state => state.calculator.value);
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

    const handleCalc = () => {
        const result = boronCalc(
            parseFloat(AbsM),
            parseFloat(AbsB),
            parseFloat(M),
            parseFloat(Extractante),
            parseFloat(PesoMuestra)
        );
        dispatch(setResultado(result));
    };

    const handleCalculo = () => {
        dispatch(setSum(5));
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
                setextractante(inputValue);
                dispatch(setExtractante(parseFloat(Extractante)));
            } else if (currentInput === 5) {
                setpesoMuestra(inputValue);
                dispatch(setPesoMuestra(parseFloat(PesoMuestra)));
            }
            //const result = boronCalc(boro.AbsM, boro.AbsB, boro.m, boro.Extractante, boro.pesoMuestra);
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
        console.log(boro);
    }, [currentInput, inputValue]);
    const selected = "bg-slate-100 border-lime-700 border";
    const inputColor = "bg-slate-100 border-slate-200 border";
    const textSelected = "text-lime-700";
    const textColor = "text-gray-500";

    return(
        <>
            {/*<AverageInput placeholder={'Absorbancia de la muestra'} label={'AbsM: '} value={AbsM} setValue={setabsM} setDispatch={handleAverage} />*/}
            <Input backgroundColor={currentInput === 1 ? selected : inputColor} TextColor={currentInput === 1 ? textSelected : textColor} placeholder='Absorbancia de la muestra' value={AbsM} label='AbsM:' />
            <Input backgroundColor={currentInput === 2 ? selected : inputColor} TextColor={currentInput === 2 ? textSelected : textColor}  placeholder='Absorbancia del blanco' value={AbsB} label='AbsB:' />
            <Input backgroundColor={currentInput === 3 ? selected : inputColor} TextColor={currentInput === 3 ? textSelected : textColor}  placeholder='Pendiente de calibración' value={M} label='Pendiente:' />
            <Input backgroundColor={currentInput === 4 ? selected : inputColor} TextColor={currentInput === 4 ? textSelected : textColor}  placeholder='Valor del extractante' value={Extractante} label='Extractante:' />
            <Input backgroundColor={currentInput === 5 ? selected : inputColor} TextColor={currentInput === 5 ? textSelected : textColor}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />

            <View className="flex-1 items-center justify-center py-6 rounded-2xl mb-10 bg-slate-200">
                <Text className="text-2xl font-semibold text-slate-500">{isNaN(boro.resultado) ? "0000000000" : boro.resultado.toFixed(3)}</Text>
            </View>
        </>
    );
};