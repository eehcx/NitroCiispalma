import React from 'react';
import { View, TouchableHighlight, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const keySize = windowWidth / 5;
//console.log(keySize)

export default CalculatorKeys = ({ label, onPress, backgroundColor }) => (
    <TouchableHighlight className='rounded-2xl md:rounded-3xl' activeOpacity={0} delayPressIn={500} underlayColor={backgroundColor === '#d7dfe3' ? '#d7dfe3' : '#d7dfe4'} onPress={onPress} >
        <View className='h-20 rounded-3xl md:rounded-3xl' style={[{ backgroundColor, width:keySize }]}>
            <View className='flex-1 flex-row justify-center items-center'>
                <Text style={{ color: backgroundColor === '#fff' || backgroundColor === '#d7dfe4' ? '#000' : backgroundColor === '#82BF53' ? '#fff' : '#000', }}
                variant={backgroundColor === '#d7dfe4' ? 'headlineLarge' : 'displaySmall'}> {label} </Text>
            </View>
        </View>
    </TouchableHighlight>
);