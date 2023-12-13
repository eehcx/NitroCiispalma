import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Componentes
import CalculatorRows from '../components/calculator/calcRows';
import KeyBoard from '../components/calculator/keyBoard';
import HistoryScreen from './main/calculator/History';

import Fonts from '../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setClientId } from '../features/client/clientSlice';

export default CalculatorScreen = () => {
    // Redux 
    const dispatch = useDispatch();
    const uid = useSelector(state => state.client.clientId);
    
    // Valores de los inputs (texto)
    const [textScreen, setTextScreen] = useState('');
    const [resultValue, setResultValue] = useState("");
    

    const [selectedOption, setSelectedOption] = useState("calculate");
    const filterContent = (option) => { setSelectedOption(option); };
    // console.log(selectedOption);

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />
            <>
                {/*PANTALLA DE LA CALCULADORA*/}
                <View style={[styles.ScreenCalculator]}>
                    <Text style={[styles.SubtitleTextScreen]}>1111{textScreen}</Text>
                    <TextInput style={[styles.ScreenText]} editable={false} placeholder='00000000' value={resultValue} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("history")}>
                            <Icon name="history" size={30} color={selectedOption === 'history' ? '#41525C' : '#bababa'} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("calculate")}>
                            <Icon name="calculate" size={30} color={selectedOption === 'calculate' ? '#41525C' : '#bababa'} style={{ marginRight: 10 }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 25 }} onPress={() => filterContent("functions")}>
                            <Icon name="functions" size={30} color={selectedOption === 'functions' ? '#41525C' : '#bababa'}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, marginRight:30 }} onPress={() => filterContent("view-kanban")}>
                        <Icon name="view-kanban" size={30} color={selectedOption === 'view-kanban' ? '#41525C' : '#bababa'} />
                    </TouchableOpacity>
                </View>
                <Divider style={{ backgroundColor: "#ddd", marginHorizontal: 20}} />
                {selectedOption === 'calculate' && <KeyBoard />}
                {selectedOption === 'history' && <HistoryScreen />}
            </>
        </View>
    );
};
// {selectedOption === 'calculate' ? '#82BF53' : '#bababa'}
const styles = StyleSheet.create({
    ScreenCalculator:{ height: '35%', width: "100%", backgroundColor: '#f1f2f3' },
    ScreenText:{ textAlign: 'right', paddingRight: 20, fontSize: 67},
    SubtitleTextScreen:{ textAlign: 'right', paddingRight: 40, marginTop: 60, fontSize: 27, color: '#999' },
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});