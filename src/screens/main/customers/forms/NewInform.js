import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Image } from 'react-native';
// React Native Paper
import { PaperProvider, Button, Text, Banner, Divider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Estilos globales
import InputForms from '../../../../styles/InputForms';
import Fonts from '../../../../styles/Fonts'; 
// Componentes
import FilterPagesExtended from '../../../../components/common/filters/FilterPagesExtended';
import DatePickerComponent from '../../../../components/common/Forms/DatePicker';
import RadioList from '../../../../components/common/RadioList';
// Servicios
import { saveInform } from '../../../../services/setService';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { reset, selectCurrentForm, setForm } from '../../../../features/forms/ReportSlice';

export default RegisterInform = () => {
    const dispatch = useDispatch();
    const client = useSelector(state => state.client);
    const report = useSelector(state => state.report);
    // Form State
    const currentForm = useSelector(selectCurrentForm);
    const handleSiguiente = () => { dispatch(setForm(currentForm + 1)); };
    // Scroll
    const [visible, setVisible] = React.useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // React Navigation
    const navigation = useNavigation();
    // Array de muestras
    const [muestras, setMuestras] = useState([]);
    // Datos del informe
    const [numMuestras, setNumMuestras] = useState('');
    const [numMuestra, setNumMuestra] = useState('');
    const [numSolicitud, setNumSolicitud] = useState('3')
    const [procedencia, setProcedencia] = useState('')
    const [tipoCultivo, setTipoCultivo] = useState('')
    const [Observaciones, setObservaciones] = useState('')
    const [selected, setSelected] = useState(undefined);
    // Fechas 
    const [FechaEntrega, setFechaEntrega] = useState(new Date());
    const [dateRecepcion, setDateRecepcion] = useState(new Date());
    const handleDateChange = (newDate) => { setFechaEntrega(newDate); };
    const handleDateChangeRecepcion = (newDate) => { setDateRecepcion(newDate); };
    // Filtro
    const filterContent = (option) => { setSelectedOption(option); };
    const [selectedOption, setSelectedOption] = useState("Análisis Foliar"); // Nombre Paquetes

    const handleSaveData = () => {
        const uid = client.clientId;
        const uid_package = report.uid_package;
        try {
            saveInform( uid, uid_package, dateRecepcion.toISOString(), FechaEntrega.toISOString(), numMuestras, procedencia, tipoCultivo, numSolicitud, Observaciones, muestras );
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoBack = () => { navigation.goBack(); dispatch(reset()); };
    const NavigateToPackage = () => { navigation.navigate('registerPackage'); };

    const agregarMuestra = () => {
        if (numMuestra && muestras.length < parseInt(numMuestras, 10)) {
            // Verifica si el número de muestra no está vacío y si no se ha alcanzado el límite
            setMuestras([...muestras, { IdLab: numMuestra }]);
            setNumMuestra('');
            console.log(muestras)
        }
    };

    return (
        <View className='flex-1 bg-zinc-50 justify-center'>
            <Appbar.Header className='bg-zinc-50'>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content title={'Agrega un informe nuevo' } />
            </Appbar.Header>
            <PaperProvider>
                <SafeAreaView>
                    <ScrollView onScroll={onScroll}>
                        {currentForm === 1 && (
                            <>
                                <Banner theme={{ colors: { primary: 'green' } }} style={{ backgroundColor: "#fafafa" }} visible={visible} actions={[ { label: 'Ir a paquetes', onPress: () => NavigateToPackage() }, { label: 'Cerrar', onPress: () => setVisible(false) } ]} icon={({size}) => ( <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fstorage.png?alt=media&token=2f904a92-5a0b-4179-a988-503d1f1818d1&_gl=1*1kvs9mz*_ga*OTkyMTAxNDIzLjE2ODcwNTgxODg.*_ga_CW55HF8NVT*MTY5NzA2NTkxNi4yNjMuMS4xNjk3MDY3NTQ5LjE2LjAuMA..' }} style={{ width: size, height: size }} /> )}>
                                    <Text className='text-sm'>  Primero, elige o crea un paquete de análisis para tu cliente. Existe la opción de personalización. </Text>
                                </Banner>
                                <View className='flex-1 p-5 justify-around'>
                                    <View className='flex-row justify-between'>
                                        <FilterPagesExtended text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                                        <FilterPagesExtended text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                                    </View>
                                </View>
                                <TouchableOpacity className='flex-row items-center justify-center p-4'>
                                    <Icon name="library-add" size={24} color='#767983' />
                                    <Text className='ml-3 text-slate-500 text-base' style={[ Fonts.addText]}>Personalizar paquete</Text>
                                </TouchableOpacity>
                                <Divider className='my-1 bg-neutral-300' />
                                {selectedOption === 'Análisis Suelos' && <RadioList packageName='Suelos' />}
                                {selectedOption === 'Análisis Foliar' && <RadioList packageName='Foliar' />}
                            </>
                        )}
                        {currentForm === 2 && (
                            <>
                                <Banner theme={{ colors: { primary: 'green' } }} style={{ backgroundColor: "#fafafa", marginBottom: '6%' }} visible={visible} actions={[ { label: 'Cerrar', onPress: () => setVisible(false) } ]} icon={({size}) => ( <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fsave.png?alt=media&token=87b77d64-997c-4634-8ae5-1faa4c55ea95&_gl=1*15ong9z*_ga*OTkyMTAxNDIzLjE2ODcwNTgxODg.*_ga_CW55HF8NVT*MTY5NzA4MTIwOS4yNjQuMS4xNjk3MDgxMjIxLjQ4LjAuMA..' }} style={{ width: size, height: size }} /> )}>
                                    <Text className='text-sm'>  Excelente, ahora procede a completar todos los campos necesarios en el formulario. Recuerda que cada detalle cuenta. </Text>
                                </Banner>
                                <View style={InputForms.container}>
                                    <View style={InputForms.formContainer}>
                                        <DatePickerComponent Text="Fecha Recepción: " onDateChange={handleDateChangeRecepcion} />
                                        <DatePickerComponent Text="Fecha Entrega: " onDateChange={handleDateChange} />
                                        <TextInput style={[InputForms.input, { marginBottom: 20, marginTop:10 }, { height: 41, paddingLeft: 25 }]} placeholder="Número de muestras" value={numMuestras} onChangeText={setNumMuestras} maxLength={100} keyboardType="numeric" />
                                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder="Procedencia" value={procedencia} onChangeText={setProcedencia} maxLength={100} />
                                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder="Tipo de cultivo" value={tipoCultivo} onChangeText={setTipoCultivo} maxLength={100} />
                                        <TextInput multiline={true} numberOfLines={4} placeholder="Observaciones generales" value={Observaciones}  onChangeText={setObservaciones} style={[InputForms.textArea, { marginBottom: 20, paddingLeft: 25  }]} maxLength={100} />
                                        <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 10}]} onPress={handleSiguiente}>Siguiente Página</Button>
                                    </View>
                                </View>
                            </>
                        )}
                        {currentForm === 3 && (
                            <>
                                <Banner theme={{ colors: { primary: 'green' } }} style={{ backgroundColor: "#fafafa", marginBottom: '6%' }} visible={visible} actions={[ { label: 'Cerrar', onPress: () => setVisible(false) } ]} icon={({size}) => ( <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Ffinger-pointing-down.png?alt=media&token=883ff7b4-eb7a-4b83-9ba0-003bb542f692&_gl=1*agqgjq*_ga*OTkyMTAxNDIzLjE2ODcwNTgxODg.*_ga_CW55HF8NVT*MTY5Nzc4NDczMS4yODMuMS4xNjk3Nzg1OTI0LjE3LjAuMA..' }} style={{ width: size, height: size }} /> )}>
                                    <Text className='text-sm'> Casi listo, ahora procede a completar los datos de las muestras que ingresaste anteriormente. </Text>
                                </Banner>
                                <View style={InputForms.container}>
                                    <View className='mx-8 w-5/6'>
                                        <TextInput className='mb-5 rounded-2xl h-12 pl-6' style={[InputForms.input]} placeholder="Número de muestra" value={numMuestra} onChangeText={setNumMuestra} keyboardType="numeric" maxLength={10} />
                                    </View>
                                    <TouchableOpacity className='flex-row items-center justify-center p-4' onPress={agregarMuestra} disabled={muestras.length >= parseInt(numMuestras, 10)}>
                                        <Icon name="library-add" size={24} color='#767983' />
                                        <Text className='ml-3 text-slate-500 text-base' style={[Fonts.addText]}>Añadir muestra</Text>
                                    </TouchableOpacity>
                                </View>
                                <Divider className='my-1 bg-neutral-300'/>

                                <SafeAreaView>
                                    {muestras.map((muestra, index) => (
                                        <View key={index}>
                                            <View className='flex-row items-center justify-between p-3'>
                                                <Icon className='px-4' name="package" size={24} color='#767983'/>
                                                <View className='flex-col items-start'>
                                                    <Text className='ml-3 text-slate-500 text-base font-bold' style={[ Fonts.modalText]}>Elemento</Text>
                                                    <Text className='ml-3 text-slate-500 text-base' style={[ Fonts.cardsText]}>Número de Muestra: {muestra.IdLab}</Text>
                                                </View>
                                                <View></View><View></View><View></View>
                                            </View>
                                            <Divider className='my-1 bg-neutral-300' />
                                        </View>
                                    ))}
                                </SafeAreaView>
                                <Button disabled={muestras.length !== parseInt(numMuestras, 10)} mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleSaveData}> ENVIAR </Button>
                            </>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};