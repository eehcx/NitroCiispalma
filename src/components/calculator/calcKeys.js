import React from 'react';
import { View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

export default CalculatorKeys = ({ label, onPress, backgroundColor, borderRadius }) => (
    <TouchableHighlight style={{ borderRadius }} activeOpacity={0} delayPressIn={500} underlayColor={backgroundColor === '#d7dfe3' ? '#d7dfe3' : '#d7dfe4'} onPress={onPress} >
        <View style={[styles.btnCalculator, { backgroundColor }]}>
            <View style={styles.Keycontainer}>
                <Text style={{ color: backgroundColor === '#fff' || backgroundColor === '#d7dfe4' ? '#000' : backgroundColor === '#82BF53' ? '#fff' : '#000', }}
                variant={backgroundColor === '#d7dfe4' ? 'headlineLarge' : 'displaySmall'}> {label} </Text>
            </View>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    btnCalculator: { width: (Dimensions.get('window').width > 768) ? 160 : 80, height: (Dimensions.get('window').height > 1024) ? 100 : 80, borderRadius: 25 },
    Keycontainer:{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }
});