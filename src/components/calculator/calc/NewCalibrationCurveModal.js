import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurveData } from '../../../features/calc/CalibrationCurveSlice';
// Estilos
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

export default NewCalibrationCurveModal  = ({ dataJson }) => {
    const dispatch = useDispatch();
    const CalibrationCurve = useSelector(state => state.calibrationCurve);

    const [Abs, setAbs] = useState('');
    const [data, setData] = useState(dataJson);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(data.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        let newData = [...data];
        newData[currentIndex].abs = Abs;
        setData(newData);
        setAbs('')

        if (currentIndex === data.length - 1) {
            setCurrentIndex(0);
            dispatch(setCurveData(data));
            console.log('DATOS ARRAY REDUX:', CalibrationCurve.curveData);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
        console.log('DATOS ARRAY:',data);
    };

    useEffect(() => {

    }, [data]);

    return(
        <>
            <Text style={[Fonts.modalText, { marginRight: 200 }]}>Absorbancia</Text>
            <TextInput keyboardType='numeric' style={[InputForms.input, { marginBottom: 30 }, { height: 41, paddingLeft: 25, borderRadius: 17, backgroundColor: '#ECECEC' }]} placeholder='Ingresar la Absorbancia' value={Abs} onChangeText={setAbs} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
                <TouchableOpacity onPress={handlePrev} style={{ marginHorizontal:10, backgroundColor:'#ECECEC', borderRadius:20, padding:2 }}>
                    <Icon name="arrow-back" size={27} color='#888' />
                </TouchableOpacity>
                <Text style={[ Fonts.normalText, { textAlign: 'left' }]}>Concentración: {data[currentIndex].concentracion} </Text>
                <TouchableOpacity style={{ marginHorizontal:10, backgroundColor:'#ECECEC', borderRadius:20, padding:2 }} onPress={handleNext}>
                    <Icon name="arrow-forward" size={27} color='#888' />
                </TouchableOpacity>
            </View>
        </>
    )
}