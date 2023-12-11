import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TextInput, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Appbar } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Componentes
import CalculatorRows from '../components/calculator/calcRows';
import KeyBoard from '../components/calculator/keyBoard';
import Fonts from '../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setClientId } from '../features/client/clientSlice';

export default CalculatorScreen = () => {
    // Redux 
    const dispatch = useDispatch();
    const uid = useSelector(state => state.client.clientId);
    // React Navigation
    const navigation = useNavigation();
    // Seleccion de la funcion
    const [selectedFunction, setSelectedFunction] = useState('');
    // Selecionar un tipo de keyboard
    const [keyboardType, setKeyboardType] = useState('Normal');
    // Valores de los inputs (texto)
    const [textScreen, setTextScreen] = useState('');
    const [resultValue, setResultValue] = useState("");
    const [IdLab, setIdLab] = useState('B')
    // Valores de los inputs (datos alternos)
    const [TextH_Al, setTextH_Al] = useState('');
    //
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [calculoId, setCalculoId] = useState('');
    // Convertir string a float
    const convertToFloat = (value) => { return parseFloat(value); };

    // Tipos de teclado
    const handleNumberPress = (number) => {
        try{
            if (keyboardType === 'Normal') {
                setTextScreen(textScreen + number);
            } else{
                setTextH_Al(TextH_Al + number);
            }
        } catch (error) {
            console.error('Error mandar el número:', error);
        }
    };

    // Btn de backspace (borrar)
    const handleBackspace = () => {
        if (keyboardType === 'Normal'){ const newValue = textScreen.slice(0, -1);
            setTextScreen(newValue);
        } else { const newValueH_Al = TextH_Al.slice(0, -1);
            setTextH_Al(newValueH_Al);
        }
    };

    // Cambiar el tipo de teclado
    const handleKeyboardChange = ({ type, functionKey }) => {
        setKeyboardType(type);
        setIsButtonEnabled(type !== 'Normal');
        if (functionKey) {
            setSelectedFunction(functionKey);
        }
    };

    const rows = [
        [
            { label: 'KeyBoard', onPress: () => handleKeyboardChange({ type: 'Normal' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: 'NaOH', onPress: () => handleKeyboardChange({ type: 'H-Al', functionKey: 'Acidez Intercambiable (NaOH)' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: 'HCl', onPress: () => handleKeyboardChange({ type: 'H-Al', functionKey: 'Aluminio (HCl)' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: '⌫', onPress: handleBackspace, backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '7', onPress: () => handleNumberPress('7'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '8', onPress: () => handleNumberPress('8'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '9', onPress: () => handleNumberPress('9'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '-', onPress: () => handleNumberPress('-'), backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '4', onPress: () => handleNumberPress('4'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '5', onPress: () => handleNumberPress('5'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '6', onPress: () => handleNumberPress('6'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '%', onPress: () => handleNumberPress('%'), backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '1', onPress: () => handleNumberPress('1'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '2', onPress: () => handleNumberPress('2'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '3', onPress: () => handleNumberPress('3'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '=', onPress: () => handleEquals(), backgroundColor: '#82BF53', borderRadius: 25 },
        ]
    ];

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />
            <>
                {/*PANTALLA DE LA CALCULADORA*/}
                <View style={[styles.ScreenCalculator]}>
                    <Text style={[Fonts.buttonTitle, { color:'#b3babe', backgroundColor:'#333',paddingLeft: 30, marginTop:10, borderRadius:20, marginHorizontal:50, paddingVertical:6 }]}>H-Al: {TextH_Al}</Text>
                    <Text style={[styles.SubtitleTextScreen]}>{textScreen}</Text>
                    <TextInput style={[styles.ScreenText]} editable={false} placeholder='00000000' value={resultValue} />
                </View>

                <KeyBoard />
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{ height: '42%', width: "100%", backgroundColor: '#f1f2f3' }, //f1f2f3
    ScreenText:{ textAlign: 'right', paddingRight: 20, fontSize: 67},
    SubtitleTextScreen:{ textAlign: 'right', paddingRight: 40, marginTop: 60, fontSize: 27, color: '#999' },
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});