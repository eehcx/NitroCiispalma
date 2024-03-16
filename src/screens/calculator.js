import React, { useState, useEffect } from 'react';
import { StatusBar, TextInput, View, Text, TouchableOpacity } from 'react-native';
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
            <View className='h-2/6 w-full bg-slate-50'>
                <Text className='text-right pr-10 mt-16 text-2xl' style={{color: '#bababa'}}>{calcName ? calcName : 'Cálculo'}</Text>
                <TextInput className=' text-right pr-5 text-7xl' editable={false} placeholder='00000000' value={resultValue} />
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
        //console.log('Funciona')
    };
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("functions");
    const filterContent = (option) => { setSelectedOption(option); };


    useEffect(() => {
        if (calculoId === null) {
            alert('Debes selecionar un cliente e informe primero')
            navigation.goBack();
        }
    }, []);

    return (
        <View className='flex-1 bg-slate-50'>
            <StatusBar className='bg-slate-50' barStyle="dark-content" />
            <>
                {(selectedOption === 'calculate' || selectedOption === 'history' || selectedOption === 'functions') && <MainScreen />}
                {selectedOption === 'apps' && <AlternativeScreen />}
                <View className='flex-row justify-between'>
                    <View className='flex-row justify-around m-3'>
                        <TouchableOpacity className='ml-6' onPress={() => filterContent("history")}>
                            <Icon name="history" size={30} color={selectedOption === 'history' ? '#41525C' : '#bababa'} className='mr-3' />
                        </TouchableOpacity>
                        <TouchableOpacity className='ml-6' onPress={() => filterContent("calculate")}>
                            <Icon name="calculate" size={30} color={selectedOption === 'calculate' ? '#41525C' : '#bababa'} className='mr-3'/>
                        </TouchableOpacity>
                        <TouchableOpacity className='ml-6' onPress={() => filterContent("apps")}>
                            <Icon name="apps" size={30} color={selectedOption === 'apps' ? '#41525C' : '#bababa'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className='mt-3 mr-8' onPress={() => filterContent("functions")}>
                        <Icon name="functions" size={30} color={selectedOption === 'functions' ? '#41525C' : '#bababa'}/>
                    </TouchableOpacity>
                </View>
                <Divider className='bg-neutral-200 mx-5'/>
                {selectedOption === 'calculate' && <KeyBoard PressRegister={handleRegister} />}
                {selectedOption === 'history' && <HistoryScreen />}
                {selectedOption === 'functions' && <CalculationsList />}
                {selectedOption === 'apps' && <KeyBoard PressRegister={handleRegister} />}
            </>
        </View>
    );
};