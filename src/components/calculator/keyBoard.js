import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorRows from '../../components/calculator/calcRows';

// FALTA AGREGAR ONPRESS PERSONALISADO
const rows = [
    [
        { label: 'KeyBoard', backgroundColor: '#d7dfe4', borderRadius: 25 },
        { label: 'NaOH', backgroundColor: '#d7dfe4', borderRadius: 25 },
        { label: 'HCl', backgroundColor: '#d7dfe4', borderRadius: 25 },
        { label: '⌫', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '7', backgroundColor: '#fff', borderRadius: 25 },
        { label: '8', backgroundColor: '#fff', borderRadius: 25 },
        { label: '9', backgroundColor: '#fff', borderRadius: 25 },
        { label: '-', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '4', backgroundColor: '#fff', borderRadius: 25 },
        { label: '5', backgroundColor: '#fff', borderRadius: 25 },
        { label: '6', backgroundColor: '#fff', borderRadius: 25 },
        { label: '%', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '1', backgroundColor: '#fff', borderRadius: 25 },
        { label: '2', backgroundColor: '#fff', borderRadius: 25 },
        { label: '3', backgroundColor: '#fff', borderRadius: 25 },
        { label: '=', backgroundColor: '#82BF53', borderRadius: 25 },
    ]
];

export default KeyBoard = ({}) => (
    <View style={styles.keyboardContainer}>
        {rows.map((buttons, index) => (
            <CalculatorRows key={index} buttons={buttons} />
        ))}
    </View>
);

const styles = StyleSheet.create({
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});