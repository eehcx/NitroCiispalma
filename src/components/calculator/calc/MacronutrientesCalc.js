import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setMgL_M, setMgL_B, setAforo, setPesoMuestra, PorcentajeMacronutrientes, setResultado, clear } from '../../../features/calc/foliar/MacronutrientesSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';
// Servicios
import { macroPctCalc } from '../../../utils/calculator/foliarCalc';

export const MacronutrientesCalc = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const macronutrientes = useSelector(state => state.macronutrientes);
    // Formula
    const [mgLM, setmglm] = useState('');
    const [mgLB, setmglb] = useState('');
    const [Aforo, setaforo] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');

    const handleCalculo = () => {
        try{
            if (currentInput === 1) {
                setmglm(TextLabel); 
                dispatch(setMgL_M(parseFloat(mgLM)));
            } else if (currentInput === 2) {
                setmglb(TextLabel);
                dispatch(setMgL_B(parseFloat(mgLB)));
            } else if (currentInput === 3) {
                setaforo(TextLabel);
                dispatch(setAforo(parseFloat(Aforo)));
            } else if (currentInput === 4) {
                setpesoMuestra(TextLabel);
                dispatch(setPesoMuestra(parseFloat(PesoMuestra)));
            }

            const result = macroPctCalc(macronutrientes.mgL_M, macronutrientes.mgL_B, macronutrientes.aforo, macronutrientes.pesoMuestra);
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
    }, [currentInput, TextLabel]);

    return(
        <>
            <Input backgroundColor={currentInput === 1 ? '#dadada' : '#ECECEC'} placeholder='miligramos por litro de la muestra' value={mgLM} label='mgL M:' />
            <Input backgroundColor={currentInput === 2 ? '#dadada' : '#ECECEC'} placeholder='miligramos por litro del blanco' value={mgLB} label='mgL B:' />
            <Input backgroundColor={currentInput === 3 ? '#dadada' : '#ECECEC'} placeholder='Aforo (ml)' value={Aforo} label='Aforo:' />
            <Input backgroundColor={currentInput === 4 ? '#dadada' : '#ECECEC'}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {macronutrientes.resultado}</Text>
            </View>
        </>
    );
};