import { View, Text } from 'react-native';
// React Native Paper
import { Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Data
import { Olsen, Boron, Sulfur, Bray } from "../../../components/models/CurveData";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { reset, Current, CurrentName, incrementCurrent, setCurrent } from '../../../features/calc/CalibrationCurveSlice';
// Estilos
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Componentes
import NewCalibrationCurveModal from '../../../components/calculator/calc/NewCalibrationCurveModal';
// Servicio
import { saveCalibrationCurve } from '../../../services/setService';
// Helpers
import calcSlope from '../../../utils/helpers/calcSlope';

export default NewCalibrationCurve = () => {
    // Navegación
    const navigation = useNavigation();
    // Redux 
    const dispatch = useDispatch();
    const CalibrationCurve = useSelector(state => state.calibrationCurve);
    const prefixes = useSelector(state => state.calibrationCurve.prefixes);
    const index = useSelector(Current);
    const currentName = useSelector(CurrentName);
    const calculoId = useSelector(state => state.calculator.IdCalc);

    const handleSave = async () => {
        const name = prefixes[index];
        try{
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

            // Regresar al inicio
            if (index === prefixes.length) { //-1
                dispatch(setCurrent(0));
                navigation.goBack();
            } else {
                // Ir hacía adelante
                dispatch(incrementCurrent());
            }
        }catch (error) {
            console.error('Error al cambiar el nombre', error);
        }
    };

    const onPressNext = async () => {
        try {
            await handleSave();
            handleNextElement();
        } catch (error) {
            console.error('Error al ejecutar handleSave o handleNextElement', error);
        }
    };

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    {currentName === 'Fósforo OLSEN' &&  <NewCalibrationCurveModal dataJson={Olsen} />}
                    {currentName === 'Fósforo BRAY' &&  <NewCalibrationCurveModal dataJson={Bray} />}
                    {currentName === 'Boro' &&  <NewCalibrationCurveModal dataJson={Boron} />}
                    {currentName === 'Azufre' &&  <NewCalibrationCurveModal dataJson={Sulfur} />}
                    <Text style={[Fonts.labelSubtitleNormal, { marginTop:10 }]}>{CalibrationCurve.name === null ? currentName: currentName}</Text>
                </View>
            </View>
            <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={onPressNext} > SIGUIENTE </Button>
        </View>
    );
};