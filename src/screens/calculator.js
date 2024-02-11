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
import { useSelector } from 'react-redux';
import { Name } from '../features/calc/CalculatorSlice';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const MainScreen = ({}) => {
    // Redux 
    const calcName = useSelector(Name);
    const [resultValue, setResultValue] = useState('00000000');

    return(
        <>
            <View style={[styles.ScreenCalculator]}>
                <Text style={[styles.SubtitleTextScreen]}>{calcName ? calcName : 'Cálculo'}</Text>
                <TextInput style={[styles.ScreenText]} editable={false} placeholder='00000000' value={resultValue} />
            </View>
        </>
    )
}

export default CalculatorScreen = () => {
    // Navegación
    const navigation = useNavigation();
    // Redux
    const calculoId = useSelector(state => state.calculator.IdCalc);

    //Registrar
    const handleRegister = () => {
        console.log('Funciona')
    };

    const [selectedOption, setSelectedOption] = useState("functions");
    const filterContent = (option) => { setSelectedOption(option); };

    useEffect(() => {
        if (calculoId === null) {
            alert('Debes selecionar un cliente e informe primero')
            navigation.goBack();
        }
    }, []);

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />
            <>
                {(selectedOption === 'calculate' || selectedOption === 'history' || selectedOption === 'functions') && <MainScreen />}
                {selectedOption === 'apps' && <AlternativeScreen />}
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
                {selectedOption === 'calculate' && <KeyBoard PressRegister={handleRegister} />}
                {selectedOption === 'history' && <HistoryScreen />}
                {selectedOption === 'functions' && <CalculationsList />}
                {selectedOption === 'apps' && <KeyBoard PressRegister={handleRegister} />}
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