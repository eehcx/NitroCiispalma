import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// React Native Paper
import { PaperProvider, Button, Text, Banner, Divider } from 'react-native-paper';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Estilos globales
import buttonStyles from '../../../styles/buttonStyles';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts'; 
// Firebase
import { app } from '../../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// 
import FilterBtn from '../../../components/interface/filters/FilterPages';
import FilterButton from '../../../components/interface/filterButton';
import DatePickerComponent from '../../../components/interface/Forms/DatePicker';
import Dropdown from '../../../components/interface/Forms/DropDown';
import { savePackage, saveInformeResultados, saveInform } from '../../../services/setService';

import { useDispatch, useSelector } from 'react-redux';
import { setClientId } from '../../../features/client/clientSlice';


const ListSoilsPackage = () => {
    // Paquetes suelos
    const [SoilsPackage, setSoilsPackage] = useState([]);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const database = getDatabase(app);
        const paquetesRef = ref(database, 'paquetes');
        const onPaqueteValue = onValue(paquetesRef, (snapshot) => {
            const data = snapshot.val();
            const PaqueteArray = data ? Object.values(data) : [];

            const soilsPackages = PaqueteArray.filter((paquete) => paquete.tipo === 'Suelos');

            setSoilsPackage(soilsPackages);

        // Carga de lista
        setLoading(false);
        });
        return () => {
            off(paquetesRef, 'value', onPaqueteValue);
        };
    }, []);


    return(
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            {SoilsPackage.slice().reverse().map((packages, index) => (
                <View key={index}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                        <Octicons name="package" size={24} color='#767983' style={{ paddingHorizontal:15 }}/>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={[styles.txtLabels, Fonts.modalText]}>{packages.nombre}</Text>
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{packages.uid}</Text>
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal:20 }}>
                            <Octicons name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                </View>
            ))}
        </View>
    );
};

const ListFoliarPackage = () => {
    // Paquetes suelos
    const [foliarPackage, setFoliarPackage] = useState([]);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    useEffect(() => {
        const database = getDatabase(app);
        const paquetesRef = ref(database, 'paquetes');
        const onPaqueteValue = onValue(paquetesRef, (snapshot) => {
            const data = snapshot.val();
            const PaqueteArray = data ? Object.values(data) : [];

            const soilsPackages = PaqueteArray.filter((paquete) => paquete.tipo === 'Foliar');

            setFoliarPackage(soilsPackages);

        // Carga de lista
        setLoading(false);
        });
        return () => {
            off(paquetesRef, 'value', onPaqueteValue);
        };
    }, []);


    return(
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            {foliarPackage.slice().reverse().map((packages, index) => (
                <View key={index}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                        <Octicons name="package" size={24} color='#767983' style={{ paddingHorizontal:15 }}/>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={[styles.txtLabels, Fonts.modalText]}>{packages.nombre}</Text>
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{packages.uid}</Text>
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal:20 }}>
                            <Octicons name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                </View>
            ))}
        </View>
    );
};

export default RegisterInform = () => {
    const dispatch = useDispatch();
    const client = useSelector(state => state.client);
    //
    const [visible, setVisible] = React.useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // React Navigation
    const navigation = useNavigation();
    const analisis = [
        { nombre: 'Azufre (S)', presente: true },
        { nombre: 'Nitrógeno (N)', presente: false },
        { nombre: 'Fósforo (P)', presente: true }
    ];
    // Formulario
    const [Form, setForm] = useState(1);
    const handleSiguiente = () => { setForm(Form + 1); };
    // Datos del informe
    const [selectedOption, setSelectedOption] = useState("Análisis Suelos"); // Nombre Paquetes
    const [numMuestras, setNumMuestras] = useState('')
    const [numSolicitud, setNumSolicitud] = useState('2')
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
        const id = client.clientId;
        const nombrePaquete = selectedOption;
        const analisisDelPaquete = analisis.filter(item => item.presente).map(item => item.nombre);
        //console.log(id)

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
            <PaperProvider>
                <SafeAreaView>
                    <ScrollView onScroll={onScroll}>
                        {Form === 1 && (
                            <>
                                <Banner
                                    theme={{ colors: { primary: 'green' } }}
                                    style={{ backgroundColor: "#fafafa" }}
                                    visible={visible}
                                    actions={[ { label: 'Ir a paquetes', onPress: () => setVisible(false) }, { label: 'Cerrar', onPress: () => setVisible(false) } ]}
                                    icon={({size}) => ( <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fstorage.png?alt=media&token=2f904a92-5a0b-4179-a988-503d1f1818d1&_gl=1*1kvs9mz*_ga*OTkyMTAxNDIzLjE2ODcwNTgxODg.*_ga_CW55HF8NVT*MTY5NzA2NTkxNi4yNjMuMS4xNjk3MDY3NTQ5LjE2LjAuMA..' }} style={{ width: size, height: size }} /> )}>
                                    <Text style={{ fontSize: 14 }}> 
                                        Primero, elige o crea un paquete de análisis para tu cliente. Existe la opción de personalización.
                                    </Text>
                                </Banner>
                                <View style={[styles.BoxContainer, { paddingHorizontal:20, marginVertical:20 }]}>
                                    <View style={[styles.row]}>
                                        <FilterBtn text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                                        <FilterBtn text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                    <Octicons name="duplicate" size={24} color='#767983' />
                                    <Text style={[styles.txtLabels, Fonts.addText]}>Personalizar paquete</Text>
                                </TouchableOpacity>
                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                {selectedOption === 'Análisis Suelos' && <ListSoilsPackage />}
                                {selectedOption === 'Análisis Foliar' && <ListFoliarPackage/>}
                            </>
                        )}
                        {Form === 2 && (
                            <View style={InputForms.container}>
                                <View style={InputForms.formContainer}>
                                    <Text style={{ marginBottom: 20, textAlign: 'justify', fontSize: 23 }} variant='headlineSmall' >Ingresa los campos requeridos</Text>
                                    <DatePickerComponent Text="Fecha Entrega: " onDateChange={handleDateChange} />
                                    <DatePickerComponent Text="Fecha Recepción: " onDateChange={handleDateChangeRecepcion} />
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
                                    <TouchableOpacity style={buttonStyles.formButton} onPress={handleSaveData} >
                                        <Text style={buttonStyles.buttonText_Black}>Enviar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
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
    },
    buttonContainer: {
        backgroundColor: "#fafafa",
        paddingHorizontal: '20%',
        paddingBottom: 10,
        position: 'absolute',
    },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});