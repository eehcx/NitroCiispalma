//React Native y React Native Paper: TouchableNativeFeedback no funciona en iOS
import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, TouchableNativeFeedback, Alert, Button, TextInput, View } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
// Iconos
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Formulas: 9
import { CE_Cm_Dsm, mL_FeSO4_Mo, mlNaOH_cmol, mlHCl_cmol, elemento_ppm_mgkg, Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg } from '../utils/functions/Formulas';
// CE: CE_Cm_Dsm
// MO: mL_FeSO4_Mo

// H-AL: mlNaOH_cmol, mlHCl_cmol
// Micros: elemento_ppm_mgkg
// Bases Intercambiables: Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg

// uso del touchable
const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const CalculatorScreen = () => {
    // React Navigation
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };
    // Seleccion de la funcion
    const [selectedFunction, setSelectedFunction] = useState('CE');
    // Selecionar un tipo de keyboard
    const [keyboardType, setKeyboardType] = useState('Normal');
    // Valores de los inputs (texto)
    const [textScreen, setTextScreen] = useState('');
    const [resultValue, setResultValue] = useState("");
    // Valores de los inputs (datos alternos)
    const [TextH_Al, setTextH_Al] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    // Convertir string a float
    const convertToFloat = (value) => {
        return parseFloat(value);
    };

    // Tipos de teclado
    const handleNumberPress = (number) => {
        try{
            if (keyboardType === 'Normal') {
                setTextScreen(textScreen + number);
            } else{
                setTextH_Al(TextH_Al + number);
            }

        } catch (error) {
            console.error('Error mandar el número:', error);
        }
    };

    // Btn de backspace (borrar)
    const handleBackspace = () => {
        if (keyboardType === 'Normal'){
            const newValue = textScreen.slice(0, -1);
            setTextScreen(newValue);
        } else {
            const newValueH_Al = TextH_Al.slice(0, -1);
            setTextH_Al(newValueH_Al);
        }
    };

    // Btn de igual (=)
    const handleEquals = () => {
        try {
            const inputValue = convertToFloat(textScreen);
            const inputValueH_Al = convertToFloat(TextH_Al);
            if (isNaN(inputValue)) {
                throw new Error('El valor ingresado no es un número válido');
            } else if (isNaN(inputValueH_Al)) {
                throw new Error('El valor ingresado no es un número válido');
            }

            let resultado;
            if (selectedFunction === 'CE') {
                resultado = CE_Cm_Dsm(inputValue);
            } else if (selectedFunction === 'MO') {
                resultado = mL_FeSO4_Mo(inputValue);
            } else if (selectedFunction === 'H-Al (HCl)'){
                /*
                export function mlHCl_cmol(mlHCl,N_HCl){  
                    const HClCmol=(((mlHCl-0.025)*(N_HCl)*(100))/5);
                    return HClCmol.toFixed(2);
                }
                */
                // mlHcl = inputValue
                // N_HCl = inputValueH_Al
                resultado = mlHCl_cmol(inputValue, inputValueH_Al);
            } else if (selectedFunction === 'H-Al (NaOH)'){
                resultado = mlNaOH_cmol(inputValue, inputValueH_Al);
            }

            console.log(resultado); // .toString()
            setResultValue(resultado);
        } catch (error) {
            console.error('Error al calcular el resultado:', error);
        }
    };

    // setIsButtonEnabled(false);


    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />

            <Appbar.Header style={{ backgroundColor: '#f1f2f3' }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content title={'Calculadora : ' + selectedFunction} />
                <Appbar.Action icon="dots-vertical" onPress={() => {}} />
            </Appbar.Header>

            <View style={[styles.ScreenCalculator]}>
                <Text variant='labelLarge' style={{ color:'#b3babe', paddingLeft: 40, marginTop:10 }}>
                    H-Al: {TextH_Al}
                </Text>
                <TextInput 
                style={[styles.SubtitleTextScreen]}
                placeholder="Escribe un número"
                value={textScreen}
                editable={false}
                />
                <TextInput 
                style={[styles.ScreenText]} 
                editable={false}
                placeholder='00000000'
                value={resultValue}
                />
            </View>

            <View style={styles.keyboardContainer}>
                <View style={styles.row}>
                    <TouchableComponent
                    disabled={!isButtonEnabled}
                    onPress={() => {setKeyboardType('HCl'); setSelectedFunction('H-Al (HCl)');}}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#000" }} variant='labelLarge'>HCl</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent
                    disabled={!isButtonEnabled}
                    onPress={() => {setKeyboardType('NaOH'); setSelectedFunction('H-Al (NaOH)');}}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#000" }} variant='labelLarge'>NaOH</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent 
                    onPress={() => {setKeyboardType('Normal'); setIsButtonEnabled(false);}}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                            <View style={styles.Keycontainer}>
                                <Octicons style={styles.iconContent} name="number" size={30} color='#000' />
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent
                    onPress={handleBackspace}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                            <View style={styles.Keycontainer}>
                                <MaterialIcons style={styles.iconContent} name="backspace" size={35} color='#fff' />
                            </View> 
                        </View> 
                    </TouchableComponent>
                </View>
                <View style={styles.row}>
                    <TouchableComponent onPress={() => handleNumberPress('7')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>7</Text>
                            </View>
                        </View>                        
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('8')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>8</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent 
                    onPress={() => handleNumberPress('9')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>9</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent
                    onPress={() => {setSelectedFunction('CE'); setIsButtonEnabled(false);}}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#fff" }} variant='headlineMedium'>CE</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                </View>
                <View style={styles.row}>
                    <TouchableComponent onPress={() => handleNumberPress('4')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>4</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('5')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>5</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('6')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>6</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent
                    onPress={() => {setSelectedFunction('MO'); setIsButtonEnabled(false);}}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#fff" }} variant='headlineMedium'>MO</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                </View>
                <View style={styles.row}>
                    <TouchableComponent onPress={() => handleNumberPress('1')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>1</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('2')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>2</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('3')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>3</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent
                    onPress={() => {
                        setSelectedFunction('H-AI');
                        setIsButtonEnabled(true);
                    }}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#fff" }} variant='headlineMedium'>H-Al</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                </View>
                <View style={styles.row}>
                    <TouchableComponent onPress={() => handleNumberPress('.')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>.</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={() => handleNumberPress('0')}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text variant='displaySmall'>0</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent onPress={handleEquals}>
                        <View style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#000" }} variant='displaySmall'>=</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                    <TouchableComponent>
                        <View style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                            <View style={styles.Keycontainer}>
                                <Text style={{ color: "#fff" }} variant='headlineMedium'>MC</Text>
                            </View>
                        </View>
                    </TouchableComponent>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{
        height: 220,
        width: "100%",
        backgroundColor: '#f1f2f3', //f1f2f3
    },
    ScreenText:{
        textAlign: 'right',
        paddingRight: 40,
        marginTop: 0,
        fontSize: 67,
    },
    SubtitleTextScreen:{
        textAlign: 'right',
        paddingRight: 40,
        marginTop: 60,
        fontSize: 27,
    },
    keyboardContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnCalculator: {
        width: 78,
        height: 78,
        borderRadius: 25
    },
    Keycontainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CalculatorScreen;