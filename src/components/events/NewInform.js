import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
// React Native Paper
import { Button, Text } from 'react-native-paper';
// React Native Vector Icons
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Estilos globales
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';
// Firebase
import { app } from '../../utils/firebase/firebaseInit';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
//
import FilterButton from '../interface/filterButton'
import { savePackage, saveInformeResultados, saveInform } from '../../utils/models/Registers';

const Tab = createBottomTabNavigator();

export default RegisterInform = () => {
    // React Navigation
    const navigation = useNavigation();
    const analisis = [
        { nombre: 'Azufre (S)', presente: true },
        { nombre: 'Nitrógeno (N)', presente: false },
        { nombre: 'Fósforo (P)', presente: true }
    ];
    // Formulario
    const [formularioActual, setFormularioActual] = useState(1);
    const [visible, setVisible] = React.useState(false);
    const handleSiguiente = () => { setFormularioActual(formularioActual + 1); };
    // Datos del informe
    const [selectedOption, setSelectedOption] = useState("Completo"); // Nombre Paquetes
    const [uid, setUid] = useState('')
    const [adicional, setAdicional] = useState('')
    const [numMuestras, setNumMuestras] = useState('')
    const [numSolicitud, setNumSolicitud] = useState('26')
    const [metodoUsado, setMetodoUsado] = useState('Calle')
    const [procedencia, setProcedencia] = useState('')
    const [tipoCultivo, setTipoCultivo] = useState('')
    const [Observaciones, setObservaciones] = useState('')
    // Fechas
    const [dateEntrega, setDateEntrega] = useState(new Date());
    const [showDatePickerEntrega, setShowDatePickerEntrega] = useState(false);
    const [dateRecepcion, setDateRecepcion] = useState(new Date());
    const [showDatePickerRecepcion, setShowDatePickerRecepcion] = useState(false);

    const handleDateChangeEntrega = (event, selectedDate) => {
    const currentDate = selectedDate || dateEntrega;
        setShowDatePickerEntrega(false);
        setDateEntrega(currentDate);
    };
    const handleDateChangeRecepcion = (event, selectedDate) => {
    const currentDate = selectedDate || dateRecepcion;
        setShowDatePickerRecepcion(false);
        setDateRecepcion(currentDate);
    };

    const filterContent = (option) => { setSelectedOption(option); };

    const handleSaveData = () => {
        // Aquí puedes obtener los valores de las variables que definiste en tu vista
        const id = uid;
        const nombrePaquete = selectedOption;
        const analisisDelPaquete = analisis.filter(item => item.presente).map(item => item.nombre);

        // Llamamos a la función saveInform y pasamos los valores correspondientes
        saveInform(
            id,
            dateRecepcion.toISOString(),
            dateEntrega.toISOString(),
            numMuestras,
            procedencia,
            tipoCultivo,
            numSolicitud,
            metodoUsado,
            Observaciones,
            nombrePaquete,
            analisisDelPaquete
        );
        navigation.goBack();
    };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <View style={InputForms.container}>
                {formularioActual === 1 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>ID Cliente</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa el ID del cliente seleccionado</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="ID único del cliente" value={uid} onChangeText={setUid}
                        maxLength={50}
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

                {formularioActual === 2 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Fechas</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Selecciona las fechas de los entregables</Text>
                        <Button  
                        textColor='#929292'
                        buttonColor="#ECECEC"
                        style={{ marginBottom: 20 }}
                        onPress={() => setShowDatePickerEntrega(true)}
                        >
                        Selecciona la Fecha Entrega: {dateEntrega.toLocaleDateString()}
                        {showDatePickerEntrega && (
                            <DateTimePicker
                            testID="dateTimePickerEntrega"
                            value={dateEntrega}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChangeEntrega}
                            />
                        )}
                        </Button>
                        <Button  
                        textColor='#929292'
                        buttonColor="#ECECEC"
                        style={{ marginBottom: 20 }}
                        onPress={() => setShowDatePickerRecepcion(true)}
                        >
                        Selecciona la Fecha Recepción: {dateRecepcion.toLocaleDateString()}
                        {showDatePickerRecepcion && (
                            <DateTimePicker
                            testID="dateTimePickerRecepcion"
                            value={dateRecepcion}
                            mode="date" 
                            is24Hour={true}
                            display="default"
                            onChange={handleDateChangeRecepcion}
                            />
                        )}
                        </Button>
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
                        <Text style={InputForms.formTitle}>Paquetes</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Selecciona uno de los paquetes</Text>
                        <View style={[styles.BoxContainer, { marginBottom: 120 }]}>
                            <View style={[styles.row]}>
                                <FilterButton icon="apps" text="Completo" marginLeft={-100} isSelected={selectedOption === "Completo"} backgroundColor="#ececec" onPress={() => filterContent("Completo")} />
                                <FilterButton icon="apps" text="Semi" marginLeft={15} isSelected={selectedOption === "Semi"} backgroundColor="#ececec" onPress={() => filterContent("Semi")} />
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
                {formularioActual === 4 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Adicionales</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >¿Quieres otros análisis? ¡Ingrésalos!</Text>
                        <TextInput style={[InputForms.  input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        value={adicional} onChangeText={setAdicional}
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
                {formularioActual === 5 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Informe</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los campos requeridos</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Número de muestras" value={numMuestras} onChangeText={setNumMuestras}
                        maxLength={100}
                        />
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Procedencia" value={procedencia} onChangeText={setProcedencia}
                        maxLength={100}
                        />
                        <TextInput 
                        style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Tipo de cultivo" value={tipoCultivo} onChangeText={setTipoCultivo}
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
                        <Text style={InputForms.formTitle}>Datos finales</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Podrás editarlos datos después (App Web)</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20, height: 45, paddingLeft: 25  }]}
                        placeholder="Observaciones generales" value={Observaciones} onChangeText={setObservaciones}
                        maxLength={100}
                        />
                        <TouchableOpacity style={buttonStyles.formButton} onPress={handleSaveData} >
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