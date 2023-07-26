import React from 'react';
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';
//REACT NATIVE Y TAILWIND CSS
import { StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert, ImageBackground, TextInput, View } from 'react-native';
import { useTheme, Text, Button, TouchableRipple,  } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Formulas: 9

const CalculatorScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={[{ flex: 1, backgroundColor: "#f1f2f3"}]}>
            <StatusBar backgroundColor='#f1f2f3' barStyle="dark-content" />

            <View style={styles.ScreenCalculator}>
                <TextInput style={[styles.ScreenText]} placeholder='1,298.2' editable={false}/>
            </View>

            <View style={styles.keyboardContainer}>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#d7dfe4" }]}>
                        <View style={styles.Keycontainer}>
                            <MaterialIcons style={styles.iconContent} name="backspace" size={35} color='#000' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#fff" }} variant='displaySmall'>CE</Text>
                        </View>  
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>7</Text>
                        </View>                        
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>8</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>9</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#fff" }} variant='headlineMedium'>H-AI</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>4</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>5</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>6</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#fff" }} variant='displaySmall'>MO</Text>
                        </View>  
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>1</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>2</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#fff" }} variant='displaySmall'>MC</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text variant='displaySmall'>0</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#fff" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#000" }} variant='displaySmall'>=</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCalculator, { backgroundColor: "#82c491" }]}>
                        <View style={styles.Keycontainer}>
                            <Text style={{ color: "#fff" }} variant='displaySmall'>BI</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    ScreenCalculator:{
        height: 250,
        width: "100%",
        backgroundColor: '#f1f2f3', //f1f2f3
    },
    ScreenText:{
        textAlign: 'right',
        marginRight: 40,
        marginTop: 160,
        fontSize: 65,
        color: '#000'
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
        width: 80,
        height: 80,
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