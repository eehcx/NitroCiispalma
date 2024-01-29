//React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// React Native Paper
import { PaperProvider, Button } from 'react-native-paper';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../features/calc/CalibrationCurveSlice';
//
import { getCurve } from '../../../services/queryService';
// Estilos
import Fonts from '../../../styles/Fonts';

import TableCurve from '../../../components/calculator/calc/TableCurve';

const TableFosforus = () => {
    // Redux 
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.client.clientId);
    // Navegación
    const navigation = useNavigation();
    const calibrationCurve = useSelector(state => state.calibrationCurve);
    // Lista de datos
    const [List, setList] = useState(calibrationCurve.curveData);
    const [data, setData] = useState(['OLSEN', 'BRAY']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const name = 'Fósforo ' + data[currentIndex];
    dispatch(setName(name));

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(data.length - 1);
            dispatch(setName(name));
        } else {
            setCurrentIndex(currentIndex - 1);
            dispatch(setName(name));
        }
    };

    const handleNext = () => {
        if (currentIndex === data.length - 1) {
            setCurrentIndex(0);
            dispatch(setName(name));
        } else{
            setCurrentIndex(currentIndex + 1);
            dispatch(setName(name));
        }
    };

    const [type, setType] = useState('fosforo_olsen');

    return(
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <PaperProvider>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical:5, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={handlePrev} style={{ marginHorizontal:10, backgroundColor:'#ECECEC', borderRadius:20, padding:2 }}>
                        <Icon name="arrow-back" size={27} color='#888' />
                    </TouchableOpacity>
                    <Text style={[Fonts.labelSubtitle, {fontWeight: 'bold', paddingHorizontal: '10%' }]}>{data[currentIndex]}</Text>
                    <TouchableOpacity onPress={handleNext} style={{ marginHorizontal:10, backgroundColor:'#ECECEC', borderRadius:20, padding:2 }}>
                        <Icon name="arrow-forward" size={27} color='#888' />
                    </TouchableOpacity>
                </View>
                <TableCurve data={List} />
                <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> {navigation.navigate('curveGraph');}}>VER GRÁFICO</Button>
            </PaperProvider>
        </View>
    );
};

const DataTableCurve = ({elementName}) => {
    // Redux 
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.client.clientId);
    // Navegación
    const navigation = useNavigation();
    const calibrationCurve = useSelector(state => state.calibrationCurve);
    // Lista de datos
    const [List, setList] = useState(calibrationCurve.curveData);
    const [data, setData] = useState([]);

    const [type, setType] = useState('fosforo_olsen');

    useEffect(() => {
        dispatch(setName(elementName));
    }, []);

    return(
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <PaperProvider>
                <TableCurve data={List} />
                <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> {navigation.navigate('curveGraph');}}>VER GRÁFICO</Button>
            </PaperProvider>
        </View>
    );
};

export default CalibrationCurveScreen = () => {
    // Navegación
    const navigation = useNavigation();
    const calculoId = useSelector(state => state.client.clientId);
    const [Curve, setCurve] = useState(true);

    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Fosforo");
    const filterContent = (option) => { setSelectedOption(option); };

    
    const getList = async () => {
        try {
            const listado = await getCurveList(calculoId, 'fosforo_olsen');

            console.log('Listado obtenido:', listado);
            setList(listado);
        } catch (error) {
            // Manejar errores si es necesario
        }
    };
    

    useEffect(() => {
        if (Curve === false) {
            navigation.goBack();
            navigation.navigate('newCalibrationCurve');
        }
    }, [calculoId]);
    

    return (
        <View style={[{flex: 1, backgroundColor: "#f1f2f3"}]}>
            <View style={[styles.BoxContainer, { paddingHorizontal:10, paddingVertical: 20 }]}>
                <View style={[styles.row]}>
                    <FilterPagesIcon icon='science' iconSize={24} text="Fosforo" backgroundColor="#e4e5e6" isSelected={selectedOption === "Fosforo"} onPress={() => filterContent("Fosforo")}/>
                    <FilterPagesIcon icon='science' iconSize={24} text="Boro" backgroundColor="#e4e5e6" isSelected={selectedOption === "Boro"} onPress={() => filterContent("Boro")}/>
                    <FilterPagesIcon icon='science' iconSize={24} text="Azufre" backgroundColor="#e4e5e6" isSelected={selectedOption === "Azufre"} onPress={() => filterContent("Azufre")}/>
                </View>
            </View>
            {selectedOption === 'Fosforo' && <TableFosforus />} 
            {selectedOption === 'Boro' && <DataTableCurve elementName={'Boro'} />} 
            {selectedOption === 'Azufre' && <DataTableCurve elementName={'Azufre'} />} 
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
});