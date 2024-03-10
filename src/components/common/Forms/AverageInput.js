import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Redux
import { selectCurrentInput, setInput } from '../../../features/calc/CalculatorSlice';
import { useDispatch, useSelector } from 'react-redux';
// Helpers
import calcAverage from '../../../utils/helpers/calcAverage';

export const AverageInput = ({ placeholder, label, value, setValue, setDispatch }) => {
    // Redux
    const dispatch = useDispatch();
    const currentInput = useSelector(selectCurrentInput);
    const boro = useSelector(state => state.boro);
    //
    const [Data, setData] = useState([]);
    const [Current, setCurrent] = useState(0);

    const handlePrev = () =>{
        if (Current === 0){
            setCurrent(Data.length - 1);
        } else {
            setCurrent(Current - 1);
        }
    }

    const handleNext = () =>{
        let newData = Data.map(num => parseFloat(num));
        const average = calcAverage(newData);
        try {
            if (Data.length <= 2) {
                setCurrent(Current + 1);
                setData(prevData => [...prevData, value]);
                setValue('');
            } else { 
                dispatch(setInput(currentInput + 1));
            }
            console.log('PROMEDIO: ', average);
            // Hacer condición para que se registre cuando llegue al tope del array: Data
            //dispatch(setDispatch(average));
            //setDispatch(average);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(Data);

    }, [Data]);

    return(
        <View style={{ width: '100%' }}>
            <Text style={[Fonts.modalText, { marginLeft: 20 }]}>{label}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={handlePrev} style={{ backgroundColor: currentInput === 1 ? '#dadada' : '#ECECEC', borderRadius: 10, padding: 4, justifyContent: 'center', height: 40 }}>
                    <Icon name="arrow-back" size={24} color='#888' />
                </TouchableOpacity>

                <TextInput style={[InputForms.input, { marginBottom: 30 }, { width: '78%', height: 41, paddingLeft: 25, borderRadius: 10, backgroundColor: currentInput === 1 ? '#dadada' : '#ECECEC' }]} placeholder={placeholder} editable={false} value={value} />

                <TouchableOpacity onPress={handleNext} style={{ backgroundColor: currentInput === 1 ? '#dadada' : '#ECECEC', borderRadius: 10, padding: 4, justifyContent: 'center', height: 40 }}>
                    <Icon name="arrow-forward" size={24} color='#888' />
                </TouchableOpacity>
            </View>
        </View>
    );
};