import React, { useEffect } from 'react';
import { View } from 'react-native';
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
            { label: '7', onPress: () => dispatch(updateValue('7')), backgroundColor: '#f1f2f3'},
            { label: '8', onPress: () => dispatch(updateValue('8')), backgroundColor: '#f1f2f3'},
            { label: '9', onPress: () => dispatch(updateValue('9')), backgroundColor: '#f1f2f3'},
            { label: '⌫', onPress: () => dispatch(Backspace()), backgroundColor: '#82BF53'},
        ],[
            { label: '4', onPress: () => dispatch(updateValue('4')), backgroundColor: '#f1f2f3'},
            { label: '5', onPress: () => dispatch(updateValue('5')), backgroundColor: '#f1f2f3'},
            { label: '6', onPress: () => dispatch(updateValue('6')), backgroundColor: '#f1f2f3'},
            { label: '↑', onPress: () => dispatch(decrement()), backgroundColor: '#82BF53'},
        ],[
            { label: '1', onPress: () => dispatch(updateValue('1')), backgroundColor: '#f1f2f3'},
            { label: '2', onPress: () => dispatch(updateValue('2')), backgroundColor: '#f1f2f3'},
            { label: '3', onPress: () => dispatch(updateValue('3')), backgroundColor: '#f1f2f3'},
            { label: '↓', onPress: () => dispatch(increment()), backgroundColor: '#82BF53'},
        ],[
            { label: '0', onPress: () => dispatch(updateValue('0')), backgroundColor: '#f1f2f3'},
            { label: '.', onPress: () => dispatch(updateValue('.')), backgroundColor: '#f1f2f3'},
            { label: 'C', onPress: () => dispatch(reset()), backgroundColor: '#f1f2f3', borderRadius: 25 },
            { label: '=', onPress: PressRegister, backgroundColor: '#82BF53', borderRadius: 25 },
        ]
    ];

    useEffect(() => {
        console.log('VALOR: ', calculator.value);
    }, [calculator.value]);

    return (
        <>
            <View className='flex-1 flex-col justify-around  p-5'>
                {rows.map((buttons, index) => (
                    <CalculatorRows key={index} buttons={buttons} />
                ))}
            </View>
        </>
    );
};