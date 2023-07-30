import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
// React Native Paper
import { Button, Text, BottomNavigation, Card, Portal, Modal, Provider } from 'react-native-paper';
// React Native Vector Icons
import Octicons from '@expo/vector-icons/Octicons';
// Estilos globales
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';
// Firebase
import { app } from '../../utils/firebase/firebaseInit';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const Tab = createBottomTabNavigator();

export default RegisterCustomer = () => {
    const [formularioActual, setFormularioActual] = useState(1);

    const handleSiguiente = () => {
        // Incrementa el número del formulario actual al presionar "Siguiente"
        setFormularioActual(formularioActual + 1);
    };

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <View style={InputForms.container}>
                {formularioActual === 1 && (
                <View style={InputForms.formContainer}>
                    <TextInput
                        style={[InputForms.input, { marginBottom: 30, height: 41, paddingLeft: 25 }]}
                        placeholder="Nombre de la empresa"
                        maxLength={100}
                    />
                    <Button icon="plus" 
                    buttonColor="#C7FBD7"
                    mode="contained-tonal" 
                    onPress={handleSiguiente}>
                        Agregar Informe
                    </Button>
                </View>
                )}

                {formularioActual === 2 && (
                    <View style={InputForms.formContainer}>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Número de muestras"
                        maxLength={100}
                        />
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Procedencia"
                        maxLength={100}
                        />
                        <TextInput 
                        style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Tipo de cultivo"
                        maxLength={100}
                        />
                        <Button icon="chevron-right"
                        buttonColor="#C7FBD7"
                        mode="contained-tonal" 
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ marginRight: 23 }}
                        onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                    </View>
                )}

                {formularioActual === 3 && (
                    <View style={InputForms.formContainer}>
                    <Button  
                        textColor='#929292'
                        buttonColor="#ECECEC"
                        style={[{ marginBottom: 20 }]}
                        onPress={() => setShowDatePicker(true)}>
                        Selecciona la Fecha Entrega: {date.toLocaleDateString()}
                        {showDatePicker && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"//date,time, datetime
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChange}
                            />
                        )}
                        </Button>
                        <Button  
                        textColor='#929292'
                        buttonColor="#ECECEC"
                        style={[{ marginBottom: 20 }]}
                        onPress={() => setShowDatePicker(true)}>
                            Selecciona la Fecha Recepción: {date.toLocaleDateString()}
                            {showDatePicker && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date" 
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                                />
                            )}
                        </Button>
                        <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        placeholder="Observaciones generales"
                        maxLength={100}
                        />
                        <Button icon="chevron-right"
                        buttonColor="#C7FBD7"
                        mode="contained-tonal" 
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ marginRight: 23 }}
                        onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                    </View>
                )}

                {formularioActual === 4 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Elije un paquete</Text>
                        <View style={[styles.BoxContainer, { marginBottom: 120 }]}>
                            <View style={[styles.row]}>
                                <TouchableOpacity style={[styles.box]}>
                                    <View style={[ styles.txtContainer]}>
                                        <Text variant='labelLarge' >
                                            Completo
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.box, { marginLeft: 30 }]}>
                                    <View style={[ styles.txtContainer]}>
                                        <Text variant='labelLarge' >
                                            Medio
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <Button icon="chevron-right"
                            buttonColor="#C7FBD7"
                            mode="contained-tonal" 
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            labelStyle={{ marginRight: 23 }}
                            onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>

                        
                    </View>
                )}
                {formularioActual === 5 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Análisis Adicionales</Text>
                        <TextInput style={[InputForms.  input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        placeholder="Ingresa un análisis adicionales (opcional)"
                        maxLength={100}
                        />

                        <Button icon="chevron-right"
                            buttonColor="#C7FBD7"
                            mode="contained-tonal" 
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            labelStyle={{ marginRight: 23 }}
                            onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                    </View>
                )}
                {formularioActual === 6 && (
                    <View style={InputForms.formContainer}>

                    <TouchableOpacity
                        style={buttonStyles.formButton}
                        onPress={() => {
                        // Hola
                        }}
                    >
                        <Text style={buttonStyles.buttonText_Black}>Enviar</Text>
                    </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    datePicker: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
    },
    BoxContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        backgroundColor: '#ECECEC',
        width: 110,
        height: 110,
        borderRadius: 25
    },
    txtContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});