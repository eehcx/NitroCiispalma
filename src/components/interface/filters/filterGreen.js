import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

export default FilterGreen = ({ icon, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor }) => (
    <TouchableOpacity style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#4ab269" : backgroundColor, marginLeft, marginRight }]} onPress={onPress}>
        <View style={styles.containerIco}>
            <View style={styles.FilterContainer}>
            <Octicons name={icon} size={32} color={isSelected ? "white" : backgroundColor === "#333" ? "white" : "#333"} style={styles.Icon3d} />
            <Text variant='titleSmall' style={[styles.txtIcon, { color: isSelected ? "white" : backgroundColor === "#333" ? "white" : "#000", fontSize: 11 }]}>
                {text}
            </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    groupChildLayout: {width: 90, height: 90, backgroundColor: "#ECECEC", borderRadius: 13, position: "absolute"},
    containerIco: {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    FilterContainer: {justifyContent: 'center', alignItems: 'center'},
    Icon3d: {marginBottom: 5},
    txtIcon: {textAlign: 'center'}
});