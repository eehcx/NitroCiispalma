//React Native
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
// React Native Paper
import { PaperProvider, Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSlope, setCurveData, CurrentName, Current } from '../../../features/calc/CalibrationCurveSlice';
// Componentes
import DataNavigator from '../../../components/interface/filters/DataNavigator';
import TableCurve from '../../../components/calculator/calc/TableCurve';
import { Olsen, Bray, Boron, Sulfur } from '../../../components/models/ConcentrationData';
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
    // Redux
    const dispatch = useDispatch();
    // Redux
    const calculoId = useSelector(state => state.client.clientId);
    const calibrationCurve = useSelector(state => state.calibrationCurve);
    const currentName = useSelector(CurrentName);
    const prefixes = useSelector(state => state.calibrationCurve.prefixes);
    const index = useSelector(Current);
    // Listado de Datos
    [Abs, setAbs] = useState([]);
    const [element, setElement] = useState([]);

    const getList = async () => {
      const prefix = prefixes[index];
      const prefixMap = { 'fosforo_olsen': Olsen, 'fosforo_bray': Bray, 'boro': Boron, 'azufre': Sulfur, };
      const selectedElement = prefixMap[prefix];
      setElement(selectedElement);
      try {
        let curve = false;
        const data = await getCurve(calculoId, prefix);
        console.log(data);
        const NewData = Abs.map((abs, index) => ({
          abs,
          concentracion: element[index]
        }));
        if (data !== null) {
          curve = true;
          setAbs(data.abs);

          // Despacha la lista y la pendiente
          dispatch(setCurveData(NewData));
          dispatch(setSlope(parseFloat(data.pendiente).toFixed(4)));
        } else {
          navigation.goBack();
          navigation.navigate('newCalibrationCurve');
        }
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
        getList();
    }, [calibrationCurve.current]);

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
          {currentName === 'Fósforo OLSEN' && <DataTableCurve />}
          {currentName === 'Fósforo BRAY' && <DataTableCurve />}
          {currentName === 'Boro' && <DataTableCurve />}
          {currentName === 'Azufre' && <DataTableCurve />}
        </View>
    );
};