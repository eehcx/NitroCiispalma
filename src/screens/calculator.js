import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Componentes
import KeyBoard from '../components/calculator/keyBoard';
import HistoryScreen from './main/calculator/History';
import CalculationsList from './main/calculator/CalcList';
import { AlternativeScreen } from '../components/calculator/AlternativeScreen';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Servicios
import { getCurve } from '../services/queryService';

const MainScreen = ({}) => {
    // Redux 
    const dispatch = useDispatch();
    const calc = useSelector(state => state.calculator);
    const [resultValue, setResultValue] = useState('00000000');

    return(
        <>
            <View style={[styles.ScreenCalculator]}>
                <Text style={[styles.SubtitleTextScreen]}>{calc.selected ? calc.selected : 'Cálculo'}</Text>
                <TextInput style={[styles.ScreenText]} editable={false} placeholder='00000000' value={resultValue} />
            </View>
        </>
    )
}

export default CalculatorScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    // Navegación
    const navigation = useNavigation();
    // Redux 
    const dispatch = useDispatch();
    const calculoId = useSelector(state => state.calculator.IdCalc);
    const uid = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);

    const uidRef = useRef(uid);
    const informIdRef = useRef(informId);

    // Valores de los inputs (texto)
    const [inputValue, setInputValue] = useState('');
    const handleKeyboardValueChange = (newValue) => {
        setInputValue(newValue);
    };

    //Registrar
    const handleRegister = () => {
        console.log('Funciona')
    };

    // Consultar curva
    const getList = async () => {
        const prefix = "fosforo_olsen";
        try {
            const data = await getCurve(calculoId, prefix);

            if (data === null) {
                navigation.goBack();
                navigation.navigate('newCalibrationCurve');
            } 
        } catch (e) {
            console.error(e);
        }
    };

    const [selectedOption, setSelectedOption] = useState("functions");
    const filterContent = (option) => { setSelectedOption(option); };

    useEffect(() => {
        if (uidRef.current === null && informIdRef.current === null) {
            alert('Debes selecionar un cliente e informe primero')
            navigation.goBack();
        }
        getList();
    }, [uidRef, informIdRef]);

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />
            <>
                {(selectedOption === 'calculate' || selectedOption === 'history' || selectedOption === 'functions') && <MainScreen />}
                {selectedOption === 'apps' && <AlternativeScreen inputValue={inputValue} />}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("history")}>
                            <Icon name="history" size={30} color={selectedOption === 'history' ? '#41525C' : '#bababa'} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("calculate")}>
                            <Icon name="calculate" size={30} color={selectedOption === 'calculate' ? '#41525C' : '#bababa'} style={{ marginRight: 10 }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("apps")}>
                            <Icon name="apps" size={30} color={selectedOption === 'apps' ? '#41525C' : '#bababa'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, marginRight:30 }} onPress={() => filterContent("functions")}>
                        <Icon name="functions" size={30} color={selectedOption === 'functions' ? '#41525C' : '#bababa'}/>
                    </TouchableOpacity>
                </View>
                <Divider style={{ backgroundColor: "#ddd", marginHorizontal: 20}} />
                {selectedOption === 'calculate' && <KeyBoard onValueChange={handleKeyboardValueChange} PressRegister={handleRegister} />}
                {selectedOption === 'history' && <HistoryScreen />}
                {selectedOption === 'functions' && <CalculationsList />}
                {selectedOption === 'apps' && <KeyBoard onValueChange={handleKeyboardValueChange} PressRegister={handleRegister} />}
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{ height: '35%', width: "100%", backgroundColor: '#f1f2f3' },
    ScreenText:{ textAlign: 'right', paddingRight: 20, fontSize: 67},
    SubtitleTextScreen:{ textAlign: 'right', paddingRight: 40, marginTop: 60, fontSize: 27, color: '#bababa' },
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});