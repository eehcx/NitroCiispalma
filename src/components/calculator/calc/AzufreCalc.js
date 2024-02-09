import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentInput } from '../../../features/calc/CalculatorSlice';
import { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, calcularAzufre, clear } from '../../../features/calc/foliar/azufreSlice';
// Estilos globales
import Fonts from '../../../styles/Fonts';
// Componentes
import Input from '../../interface/Forms/Input';
// Servicios
import { getCurve } from '../../../services/queryService';

export const AzufreCalc = ({ TextLabel }) => {
    // Redux
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.client.clientId);
    const currentInput = useSelector(selectCurrentInput);
    const azufre = useSelector(state => state.azufre);
    //
    const [query, setQuery]= useState(false)
    // Formula
    const [AbsM, setabsM] = useState('');
    const [AbsB, setabsB] = useState('');
    const [M, setm] = useState('');
    const [B, setb] = useState('');
    const [Aforo, setaforo] = useState('');
    const [PesoMuestra, setpesoMuestra] = useState('');
    const [alicuota, setalicuota] = useState('');

    const getSlope = async () => {
        const prefix = 'azufre';
        try {
            const data = await getCurve(calculoId, prefix);
            if (data !== null) {
                setm(data.pendiente);
                setb(data.interseccion_eje_y);
                //setQuery(true);
            }
            console.log(M);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCalculo = async () => {
        try {
            let valor;
            switch (currentInput) {
                case 1:
                    setabsM(TextLabel);
                    valor = parseFloat(AbsM);
                    await dispatch(setAbsM(AbsM));
                    break;
                case 2:
                    setabsB(TextLabel);
                    valor = parseFloat(AbsB);
                    await dispatch(setAbsB(AbsB));
                    break;
                case 3:
                    setm(TextLabel);
                    valor = parseFloat(M);
                    await dispatch(setM(M));
                    break;
                case 4:
                    setb(TextLabel);
                    valor = parseFloat(B);
                    await dispatch(setB(B));
                    break;
                case 5:
                    setaforo(TextLabel);
                    valor = parseFloat(Aforo);
                    await dispatch(setAforo(Aforo));
                    break;
                case 6:
                    setpesoMuestra(TextLabel);
                    valor = parseFloat(PesoMuestra);
                    await dispatch(setPesoMuestra(PesoMuestra));
                    break;
                case 7:
                    setalicuota(TextLabel);
                    valor = parseFloat(alicuota);
                    await dispatch(setAlicuota(alicuota));
                    break;
                default:
                    break;
            }
            dispatch(calcularAzufre());
        } catch (error) {
            console.error('Error al mandar los datos', error);
        }
    };

    useEffect(() => {
        try{
            /*
            if (!query) {
                getSlope();
            }*/
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
            <Input backgroundColor={currentInput === 6 ? '#dadada' : '#ECECEC'}  placeholder='Peso de la muestra (gramos)' value={PesoMuestra} label='Peso Muestra:' />
            <Input backgroundColor={currentInput === 7 ? '#dadada' : '#ECECEC'}  placeholder='Volumen de la alícuota (ml)' value={alicuota} label='Alicuota:' />

            <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[ Fonts.modalText, {color: '#2F363B', marginBottom: 20}]}>Resultado: {azufre.resultado}</Text>
            </View>
        </>
    );
};
