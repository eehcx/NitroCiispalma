import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
// React Native Paper
import { PaperProvider, Button, Text, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Servicios
import { setPaquetes } from '../../../../services/paquetes';
// Estilos globales
import InputForms from '../../../../styles/InputForms';
import Fonts from '../../../../styles/Fonts';
// Components
import FilterPagesExtended from '../../../../components/common/filters/FilterPagesExtended';
import InputText from '../../../../components/common/Forms/InputText';

export default NewPackage = () => {
    // React Navigation
    const navigation = useNavigation();
    // Formulario
    const [Form, setForm] = useState(1);
    const handleSiguiente = () => { setForm(Form + 1); };
    // Variables y arrays
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [label, setLabel] = useState('SIGUIENTE');
    // Importantes para registro
    const [Nombre, setNombre] = useState('');
    const [Estudio, setEstudio] = useState('');
    const [tipo, setTipo] = useState('');
    const [analisis, setAnalisis] = useState([]);
    // Filtro
    const filterContent = (option) => { setSelectedOption(option); };
    const [selectedOption, setSelectedOption] = useState("Análisis Suelos");
    // Scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    const addResearch = () => {
        setAnalisis([...analisis, Estudio]);
        setEstudio('');
        //console.log(analisis);
    };

    const updateTipo = () => {
        if (selectedOption === "Análisis Suelos") {
            setTipo("Suelos");
        } else if (selectedOption === "Análisis Foliar") {
            setTipo("Foliar");
        }
    };

    useEffect(() => {
        updateTipo();
    }, [selectedOption]);


    const handleSave = () =>{
        const tipoEstudio = tipo;
        const nombre = Nombre;
        const elementos = analisis;
        try{
            setPaquetes( nombre, tipoEstudio, elementos );
            alert("Paquete registrado correctamente");
            navigation.goBack();
        }
        catch (error) {
            throw "Error al registrar el paquete: ", error;
        }
    }; 

    return (
        <View className='bg-zinc-50 flex-1 justify-center'>
            <PaperProvider>
                <SafeAreaView className=' flex-grow'>
                    <ScrollView onScroll={onScroll}>
                        {Form === 1 && (
                            <>
                                <View className='flex-1 justify-around px-8 py-5'>
                                    <View className='flex-row justify-between'>
                                        <FilterPagesExtended text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                                        <FilterPagesExtended text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                                    </View>
                                </View>
                                <View className='mx-8 my-3 w-10/12'>
                                    <InputText backgroundColor='#ECECEC' placeholder='Ingresa un nombre para el paquete' value={Nombre} onChange={setNombre} label='Nombre de paquete' marginLeft={20}/>
                                    <InputText backgroundColor='#ECECEC' placeholder={selectedOption}label='Seleccionado' marginLeft={20} />
                                </View>
                            </>
                        )}
                        {Form === 2 && (
                            <>
                                <View className='mx-8 my-3 w-10/12'>
                                    <TextInput className='mb-5 rounded-2xl h-12 pl-6' style={[InputForms.input]} placeholder="Ingresa un Análisis" value={Estudio} onChangeText={(text) => {
                                        setEstudio(text); 
                                        setIsInputEmpty(text.trim() === '');
                                    }} maxLength={90} />
                                </View>

                                <Divider className=' my-1 bg-neutral-300' />
                                <TouchableOpacity className='flex-row items-center justify-center p-4' onPress={addResearch} disabled={isInputEmpty}>
                                    <Icon name="library-add" size={24} color='#767983' />
                                    <Text className=' ml-4 text-zinc-500 text-base' style={[Fonts.addText]}>Añadir análisis</Text>
                                </TouchableOpacity>
                                <Divider className=' my-1 bg-neutral-300' />

                                {analisis.map((estudio, index) => (
                                    <View key={index}>
                                        <View className='flex-row items-center justify-between py-3'>
                                            <Icon className='px-4' name="view-kanban" size={24} color='#767983'/>
                                            <View className=' flex-col items-start'>
                                                <Text className=' ml-4 text-zinc-500 text-base font-bold' style={[Fonts.modalText]}>Análisis del paquete</Text>
                                                <Text className=' ml-4 text-zinc-500 text-base' style={[Fonts.cardsText]}>Añadido: {estudio}</Text>
                                            </View>
                                            <View></View><View></View><View></View>
                                        </View>
                                        <Divider className=' my-1 bg-neutral-300' />
                                    </View>
                                ))}
                            </>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
            <Button mode="contained" onPress={() => {
                if (label === "SIGUIENTE") {
                    setLabel("ENVIAR");
                    return handleSiguiente();
                } else if (label === "ENVIAR") {
                    return handleSave();
                } }} style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> {label} </Button>
        </View>
    );
};