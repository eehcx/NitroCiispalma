//React Native
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
// React Native Paper
import { PaperProvider, Button } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSlope, setCurveData, Current } from '../../../features/calc/CalibrationCurveSlice';
// Componentes
import DataNavigator from '../../../components/common/filters/DataNavigator';
import TableCurve from '../../../components/calculator/calc/TableCurve';
// Servicios
import { getCurve } from '../../../services/queryService';

const DataTableCurve = () => {
  // Navegación
  const navigation = useNavigation();
  // Redux
  const calibrationCurve = useSelector(state => state.calibrationCurve);
  // Scroll
  const [isExtended, setIsExtended] = React.useState(false);
  const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    return(
        <View className='flex-1 bg-slate-50'>
            <PaperProvider>
              <SafeAreaView>
                <ScrollView onScroll={onScroll}>
                  <DataNavigator />
                  <TableCurve data={calibrationCurve.curveData} />
                  <Button className='text-base font-bold m-6' mode="contained" style={[{ backgroundColor: '#41525C' }]} onPress={()=> {navigation.navigate('curveGraph');}}>VER GRÁFICO</Button>
                </ScrollView>
              </SafeAreaView>
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
      <View className='flex-1 bg-slate-50'>
        <DataTableCurve />
      </View>
  );
};
