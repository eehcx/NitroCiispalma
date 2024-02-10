//React Native
import React, { useEffect } from 'react';
import { View } from 'react-native';
// React Native Paper
import { PaperProvider, Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSlope, setCurveData, Current } from '../../../features/calc/CalibrationCurveSlice';
// Componentes
import DataNavigator from '../../../components/interface/filters/DataNavigator';
import TableCurve from '../../../components/calculator/calc/TableCurve';
// Servicios
import { getCurve } from '../../../services/queryService';
// Estilos
import Fonts from '../../../styles/Fonts';

const DataTableCurve = () => {
  // Navegación
  const navigation = useNavigation();
  // Redux
  const calibrationCurve = useSelector(state => state.calibrationCurve);

    return(
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <PaperProvider>
                <DataNavigator />
                <TableCurve data={calibrationCurve.curveData} />
                <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> {navigation.navigate('curveGraph');}}>VER GRÁFICO</Button>
            </PaperProvider>
        </View>
    );
};

export default CalibrationCurveScreen = () => {
  // Navegación
  const navigation = useNavigation();
  // Redux
  const dispatch = useDispatch();
  const calculoId = useSelector(state => state.calculator.IdCalc);
  const calibrationCurve = useSelector(state => state.calibrationCurve);
  const prefixes = useSelector(state => state.calibrationCurve.prefixes);
  const index = useSelector(Current);

  const getList = async () => {
    const prefix = prefixes[index];
    try {
      const data = await getCurve(calculoId, prefix);
      console.log(data.listado);

      if (data === null) {
        navigation.goBack();
        navigation.navigate('newCalibrationCurve');
      } else{
        // Despacha la lista y la pendiente
        dispatch(setCurveData(data.listado));
        dispatch(setSlope(parseFloat(data.pendiente).toFixed(4)));
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getList();
  }, [calibrationCurve.current]);

  return (
      <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
        <DataTableCurve />
      </View>
  );
};
