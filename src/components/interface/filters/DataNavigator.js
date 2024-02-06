import React, { useState, useCallback, useEffect  } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { incrementCurrent, decrementCurrent, CurrentName } from '../../../features/calc/CalibrationCurveSlice';

const DataNavigator = () => {
    // Redux
    const dispatch = useDispatch();
    const currentName = useSelector(CurrentName);

    const handlePrev = () =>{
        dispatch(decrementCurrent());
    }

    const handleNext = () =>{
        dispatch(incrementCurrent());
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '3%', marginHorizontal: 20 }}>
            <TouchableOpacity onPress={handlePrev} style={{ marginHorizontal: 10, backgroundColor: '#ddd', borderRadius: 20, padding: 4 }}>
                <Icon name="arrow-back" size={24} color='#888' />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', paddingHorizontal: '10%', fontSize: 17 }}>{currentName}</Text>
            <TouchableOpacity onPress={handleNext} style={{ marginHorizontal: 10, backgroundColor: '#ddd', borderRadius: 20, padding: 4 }}>
                <Icon name="arrow-forward" size={24} color='#888' />
            </TouchableOpacity>
        </View>
    );
};

export default DataNavigator;
