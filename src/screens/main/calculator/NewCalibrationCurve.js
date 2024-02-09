import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
// React Native Paper
import { Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Data
import { Olsen, Boron, Sulfur, Bray } from "../../../components/models/CurveData";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPrefix, reset } from '../../../features/calc/CalibrationCurveSlice';
// Estilos
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Componentes
import NewCalibrationCurveModal from '../../../components/calculator/calc/NewCalibrationCurveModal';
// Servicio
import { saveCalibrationCurve } from '../../../services/setService';
// Helpers
import calcSlope from '../../../utils/helpers/calcSlope';


const Welcome = () => {
    return(
        <>
            <Text style={[ Fonts.labelSubtitle ]}>Dale a siguiente</Text>
        </>
    );
};

export default NewCalibrationCurve = () => {
    // Navegación
    const navigation = useNavigation();
    // Redux 
    const dispatch = useDispatch();
    const CalibrationCurve = useSelector(state => state.calibrationCurve);
    const calculoId = useSelector(state => state.calculator.IdCalc);
    // Filtro y prefijos del nombre de elemento
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedPrefix, setSelectedPrefix] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    // Arrays de nombres y prefijos
    const names = ['Fósforo Olsen', 'Fósforo Bray', 'Azufre', 'Boro'];
    const PrefNames = ['fosforo_bray', 'azufre', 'boro'];

    const handleSave = async () => {
        try{
            const name = CalibrationCurve.prefix || 'fosforo_olsen';
            const data = CalibrationCurve.curveData || [];
            // Calcular la curva de calibración
            const results = calcSlope(CalibrationCurve.curveData);
            const slope = results.slope.toString();
            const b = results.b.toString();
            const r2 = results.r2.toString();

            // Servicio para guardar el registro
            await saveCalibrationCurve(calculoId, name, data, slope, b, r2);

            console.log(calculoId, name, data, slope, b, r2);

            dispatch(reset());
        }catch (error) {
            console.error('Error al guardar el registro', error);
        }
    };

    const handleNextElement = () => {
        try{
            setSelectedOption(names[currentIndex]);
            dispatch(setName(selectedOption));
            setSelectedPrefix(PrefNames[currentIndex]);
            dispatch(setPrefix(selectedPrefix));

            // Regresar al incio
            if (currentIndex === names.length) { //-1
                setCurrentIndex(0);
                navigation.goBack();
            } else {
                // Ir hacía adelante
                setCurrentIndex(currentIndex + 1);
            }
        }catch (error) {
            console.error('Error al cambiar el nombre', error);
        }
    };

    const onPressNext = async () => {
        try {
            if (selectedOption === '') {
                handleNextElement();
            } else{
                await handleSave();
                handleNextElement();
            }
        } catch (error) {
            console.error('Error al ejecutar handleSave o handleNextElement', error);
        }
    };

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    {selectedOption === '' &&  <Welcome/>}
                    {selectedOption === 'Fósforo Olsen' &&  <NewCalibrationCurveModal dataJson={Olsen} />}
                    {selectedOption === 'Fósforo Bray' &&  <NewCalibrationCurveModal dataJson={Bray} />}
                    {selectedOption === 'Azufre' &&  <NewCalibrationCurveModal dataJson={Sulfur} />}
                    {selectedOption === 'Boro' &&  <NewCalibrationCurveModal dataJson={Boron} />}
                    <Text style={[Fonts.labelSubtitleNormal, { marginTop:10 }]}>{CalibrationCurve.name === null ? selectedOption: selectedOption}</Text>
                </View>
            </View>
            <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={onPressNext} > SIGUIENTE </Button>
        </View>
    );
};