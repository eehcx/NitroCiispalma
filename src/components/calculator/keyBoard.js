import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorRows from '../../components/calculator/calcRows';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset, updateValue, Backspace } from '../../features/calc/CalculatorSlice';
// inputValue
export default KeyBoard = ({ PressRegister }) => {  
    // Redux 
    const dispatch = useDispatch();
    const calculator = useSelector(state => state.calculator);

    const rows = [
        [
            { label: '7', onPress: () => dispatch(updateValue('7')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '8', onPress: () => dispatch(updateValue('8')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '9', onPress: () => dispatch(updateValue('9')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '⌫', onPress: () => dispatch(Backspace()), backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '4', onPress: () => dispatch(updateValue('4')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '5', onPress: () => dispatch(updateValue('5')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '6', onPress: () => dispatch(updateValue('6')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '↑', onPress: () => dispatch(decrement()), backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '1', onPress: () => dispatch(updateValue('1')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '2', onPress: () => dispatch(updateValue('2')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '3', onPress: () => dispatch(updateValue('3')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '↓', onPress: () => dispatch(increment()), backgroundColor: '#82BF53', borderRadius: 25 },
        ],[
            { label: '0', onPress: () => dispatch(updateValue('0')), backgroundColor: '#fff', borderRadius: 25 },
            { label: '.', onPress: () => dispatch(updateValue('.')), backgroundColor: '#fff', borderRadius: 25 },
            { label: 'C', onPress: () => dispatch(reset()), backgroundColor: '#fff', borderRadius: 25 },
            { label: '=', onPress: PressRegister, backgroundColor: '#82BF53', borderRadius: 25 },
        ]
    ];

    useEffect(() => {
        console.log('VALOR: ', calculator.value);
    }, [calculator.value]);

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