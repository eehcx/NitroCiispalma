import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// React Native Paper
import { Button, Text } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Estilos globales
import buttonStyles from '../../../styles/buttonStyles';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts'; 

import FilterButton from '../../../components/interface/filterButton';
import DatePickerComponent from '../../../components/interface/Forms/DatePicker';
import Dropdown from '../../../components/interface/Forms/DropDown';
import { savePackage, saveInformeResultados, saveInform } from '../../../services/setService';

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
    const handleSiguiente = () => { setFormularioActual(formularioActual + 1); };
    // Datos del informe
    const [selectedOption, setSelectedOption] = useState("Completo"); // Nombre Paquetes
    const [uid, setUid] = useState('')
    const [adicional, setAdicional] = useState('')
    const [numMuestras, setNumMuestras] = useState('')
    const [numSolicitud, setNumSolicitud] = useState('2')
    const [metodoUsado, setMetodoUsado] = useState('')
    const [procedencia, setProcedencia] = useState('')
    const [tipoCultivo, setTipoCultivo] = useState('')
    const [Observaciones, setObservaciones] = useState('')
    const [selected, setSelected] = useState(undefined);
    const handleSelect = (item) => {
        setSelected(item.label); 
    };
    const data = [
        { label: 'Analisis de Suelos', value: '1' },
        { label: 'Analisis Foliar', value: '2' }
    ];
    //console.log(selected);
    const [FechaEntrega, setFechaEntrega] = useState(new Date());
    const [dateRecepcion, setDateRecepcion] = useState(new Date());

    const handleDateChange = (newDate) => {
        setFechaEntrega(newDate);
    };

    const handleDateChangeRecepcion = (newDate) => {
        setDateRecepcion(newDate);
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
            FechaEntrega.toISOString(),
            numMuestras,
            procedencia,
            tipoCultivo,
            numSolicitud,
            metodoUsado,
            Observaciones,
            nombrePaquete,
            analisisDelPaquete,
            selected
        );
        navigation.goBack();
    };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <View style={InputForms.container}>

                {formularioActual === 1 && (
                    <View style={InputForms.formContainer}>
                        <Text style={[Fonts.formTitle]}>ID Cliente</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa el ID de tu Cliente</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder="ID único del cliente" value={uid} onChangeText={setUid} maxLength={50}/>
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
                        <Text style={[Fonts.formTitle]}>Fechas</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Selecciona las fechas</Text>
                        <DatePickerComponent Text="Fecha Entrega: " onDateChange={handleDateChange} />
                        <DatePickerComponent Text="Fecha Recepción: " onDateChange={handleDateChangeRecepcion} />
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
                        <Text style={[Fonts.formTitle]}>Datos del Informe</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los campos requeridos</Text>
                        <Dropdown label="Selecciona un Analisis" data={data} onSelect={handleSelect} />
                        <TextInput style={[InputForms.input, { marginBottom: 20, marginTop:10 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="Número de muestras" value={numMuestras} onChangeText={setNumMuestras}
                        maxLength={100} keyboardType="numeric"
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
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Observaciones generales"
                            value={Observaciones}  onChangeText={setObservaciones}
                            style={[InputForms.textArea, { marginBottom: 20, paddingLeft: 25  }]} maxLength={100}
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
                        <Text style={[Fonts.formTitle]}>Paquetes</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Por ultimo selecciona un paquete</Text>
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
                {formularioActual === 5 && (
                    <View style={InputForms.formContainer}>
                        <Text style={[Fonts.formTitle]}>Adicionales</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los campos si se requiere</Text>
                        <TextInput style={[InputForms.  input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        value={adicional} onChangeText={setAdicional}
                        placeholder="Ingresa un análisis adicionales (opcional)"
                        maxLength={100}
                        />
                        <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]} 
                        value={metodoUsado} onChangeText={setMetodoUsado} 
                        placeholder="Ingresa los metodos a usar (opcional)"
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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