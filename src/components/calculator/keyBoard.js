import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorRows from '../../components/calculator/calcRows';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setInput, selectCurrentInput, reset } from '../../features/calc/CalculatorSlice';
// inputValue
export default KeyBoard = ({ onValueChange, PressRegister }) => {  
    // Redux 
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    // Valores de los inputs (texto)
    const [valor, setValor] = useState('');

    // Btn de backspace (borrar)
    const handleBackspace = () => {
        const newValue = valor.slice(0, -1);
        setValor(newValue);
        onValueChange(valor);
        //console.log('Valor restado: ',valor);
    };

    // Funcionamiento del teclado, ir sumando teclas
    const handleNumberPress = (number) => {
        try{
            setValor(valor + number);
            onValueChange(valor);
            //console.log('Valor nuevo: ', valor);
        } catch (error) {
            console.error('Error mandar el número:', error);
        }
    };

    const handleNext = () => {
        setValor('')
        dispatch(setInput(currentInput + 1));
        console.log('Input actual: ', currentInput)
    };

    const handleClear = () => {
        dispatch(reset());
        console.log('Input actual: ', currentInput)
    };

    const rows = [
        [
            { label: '7', onPress: () => handleNumberPress('7'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '8', onPress: () => handleNumberPress('8'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '9', onPress: () => handleNumberPress('9'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '⌫', onPress: handleBackspace, backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '4', onPress: () => handleNumberPress('4'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '5', onPress: () => handleNumberPress('5'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '6', onPress: () => handleNumberPress('6'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '↑', onPress: PressRegister, backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '1', onPress: () => handleNumberPress('1'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '2', onPress: () => handleNumberPress('2'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '3', onPress: () => handleNumberPress('3'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '↓', onPress: handleNext, backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '0', onPress: () => handleNumberPress('0'), backgroundColor: '#fff', borderRadius: 25 },
            { label: '.', onPress: () => handleNumberPress('.'), backgroundColor: '#fff', borderRadius: 25 },
            { label: 'C', onPress: handleClear,backgroundColor: '#fff', borderRadius: 25 },
            { label: '=', backgroundColor: '#82BF53', borderRadius: 25 },
        ]
    ];

    useEffect(() => {
        onValueChange(valor);
    }, [valor]);

    return (
        <>
            <View style={styles.keyboardContainer}>
                {rows.map((buttons, index) => (
                    <CalculatorRows key={index} buttons={buttons} />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});