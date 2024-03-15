import React from 'react';
import { View } from 'react-native';
import CalculatorKeys from './calcKeys';

export default CalculatorRows = ({ buttons }) => (
    <View className='flex-row justify-between'>
        {buttons.map(({ label, onPress, backgroundColor }) => (
            <CalculatorKeys key={label} label={label} onPress={onPress} backgroundColor={backgroundColor}/>
        ))}
    </View>
);