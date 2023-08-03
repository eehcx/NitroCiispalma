//React Native y React Native Paper: TouchableNativeFeedback no funciona en iOS
import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TextInput, View } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Formulas: 4 en uso
import { CE_Cm_Dsm, mL_FeSO4_Mo, mlNaOH_cmol, mlHCl_cmol } from '../utils/functions/Formulas';
import { saveCE, saveMO } from '../utils/models/Registers'
// Firebase
import { app } from '../utils/firebase/firebaseInit';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// Componentes
import CalculatorRows from '../components/interface/calcRows';

const CalculatorScreen = () => {
    // React Navigation
    const navigation = useNavigation();
    const handleGoBack = () => { navigation.goBack(); };
    // Seleccion de la funcion
    const [selectedFunction, setSelectedFunction] = useState('CE');
    // Selecionar un tipo de keyboard
    const [keyboardType, setKeyboardType] = useState('Normal');
    // Valores de los inputs (texto)
    const [textScreen, setTextScreen] = useState('');
    const [resultValue, setResultValue] = useState("");
    const [IdLab, setIdLab] = useState('B')
    // Valores de los inputs (datos alternos)
    const [TextH_Al, setTextH_Al] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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
        if (keyboardType === 'Normal'){
            const newValue = textScreen.slice(0, -1);
            setTextScreen(newValue);
        } else {
            const newValueH_Al = TextH_Al.slice(0, -1);
            setTextH_Al(newValueH_Al);
        }
    };

    // Btn de igual (=)
    const handleEquals = () => {
        try {
            const inputValue = convertToFloat(textScreen);
            const inputValueH_Al = convertToFloat(TextH_Al);
            if (isNaN(inputValue)) {
                throw new Error('El valor ingresado no es un número válido');
            }
            let resultado;
            if (selectedFunction === 'CE') {
                resultado = CE_Cm_Dsm(inputValue);
                saveCE(IdLab,inputValue.toString(),resultado.toString());
            } else if (selectedFunction === 'MO') {
                resultado = mL_FeSO4_Mo(inputValue);
                saveMO(IdLab,inputValue.toString(),resultado.toString())
            } else if (selectedFunction === 'H-Al (HCl)'){
                // mlHcl = inputValue
                // N_HCl = inputValueH_Al
                resultado = mlHCl_cmol(inputValue, inputValueH_Al);
            } else if (selectedFunction === 'H-Al (NaOH)'){
                resultado = mlNaOH_cmol(inputValue, inputValueH_Al);
            }
            setResultValue(resultado);

        } catch (error) {
            console.error('Error al calcular el resultado:', error);
        }
    };

    const handleKeyboardChange = ({ type, functionKey }) => {
        setKeyboardType(type);
        setIsButtonEnabled(type !== 'Normal');
        if (functionKey) {
            setSelectedFunction(functionKey);
        }
    };

    const rows = [
        [
            { label: 'HCl', onPress: () => handleKeyboardChange({ type: 'H-Al', functionKey: 'H-Al (HCl)' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: 'NaOH', onPress: () => handleKeyboardChange({ type: 'H-Al', functionKey: 'H-Al (NaOH)' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: '1234', onPress: () => handleKeyboardChange({ type: 'Normal' }), backgroundColor: '#d7dfe4', borderRadius: 25 },
            { label: '⌫', onPress: handleBackspace, backgroundColor: '#82c491', borderRadius: 25 },
        ],
        [
            { label: '7', onPress: () => handleNumberPress('7'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '8', onPress: () => handleNumberPress('8'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '9', onPress: () => handleNumberPress('9'), backgroundColor: '#fff', borderRadius: 25 },
            { label: 'CE', onPress: () => handleKeyboardChange({ type: 'Normal', functionKey: 'CE' }), backgroundColor: '#82c491', borderRadius: 25 },
        ],
        [
            { label: '4', onPress: () => handleNumberPress('4'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '5', onPress: () => handleNumberPress('5'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '6', onPress: () => handleNumberPress('6'), backgroundColor: '#fff', borderRadius: 25 },
            { label: 'MO', onPress: () => handleKeyboardChange({ type: 'Normal', functionKey: 'MO' }), backgroundColor: '#82c491', borderRadius: 25 },
        ],
        [
            { label: '1', onPress: () => handleNumberPress('1'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '2', onPress: () => handleNumberPress('2'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '3', onPress: () => handleNumberPress('3'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '', onPress: () => handleKeyboardChange({ type: 'Normal', functionKey: '' }), backgroundColor: '#82c491', borderRadius: 25 },
        ],
        [
            { label: '.', onPress: () => handleNumberPress('.'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '0', onPress: () => handleNumberPress('0'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '=', onPress: () => handleEquals(), backgroundColor: '#fff', borderRadius: 25 },
            { label: '', onPress: () => handleKeyboardChange({ type: 'Normal', functionKey: ' ' }), backgroundColor: '#82c491', borderRadius: 25 },
        ],
    ];

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />

            <Appbar.Header style={{ backgroundColor: '#f1f2f3' }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content title={'Calculadora : ' + selectedFunction} />
                <Appbar.Action icon="dots-vertical" onPress={() => {}} />
            </Appbar.Header>

            <View style={[styles.ScreenCalculator]}>
                <Text variant='labelLarge' style={{ color:'#b3babe', paddingLeft: 40, marginTop:10 }}>
                    H-Al: {TextH_Al}
                </Text>
                <TextInput style={[styles.SubtitleTextScreen]} placeholder="Escribe un número" value={textScreen} editable={false} />
                <TextInput style={[styles.ScreenText]} editable={false} placeholder='00000000' value={resultValue} />
            </View>

            {/* KEYBOARD */}
            <View style={styles.keyboardContainer}>
                {rows.map((buttons, index) => (
                    <CalculatorRows key={index} buttons={buttons} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{ height: 220, width: "100%", backgroundColor: '#f1f2f3' },
    ScreenText:{ textAlign: 'right', paddingRight: 40, marginTop: 0, fontSize: 67 },
    SubtitleTextScreen:{ textAlign: 'right', paddingRight: 40, marginTop: 60, fontSize: 27 },
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' }
});

export default CalculatorScreen;