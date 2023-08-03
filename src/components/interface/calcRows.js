import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorKeys from './calcKeys';

export default CalculatorRows = ({ buttons }) => (
    <View style={styles.row}>
        {buttons.map(({ label, onPress, backgroundColor, borderRadius }) => (
        <CalculatorKeys
            key={label}
            label={label}
            onPress={onPress}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
        />
        ))}
    </View>
);


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});