import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// React Native Paper
import { PaperProvider, Button, Text, Divider, Appbar } from 'react-native-paper';
// Estilos globales
import InputForms from '../../../../styles/InputForms';
import Fonts from '../../../../styles/Fonts';
// Components
import FilterButton from '../../../../components/interface/filterButton';

const ListAdd = () => {
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    <ScrollView onScroll={onScroll}>

                    </ScrollView>
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

export default NewPackage = () => {
    // Formulario
    const [Form, setForm] = useState(1);
    const handleSiguiente = () => { setForm(Form + 1); };
    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Suelos");
    const filterContent = (option) => { setSelectedOption(option); };
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <View style={InputForms.container}>
                <View style={InputForms.formContainer}>
                    <Text style={[Fonts.formTitle]}>Paquete</Text>
                    {Form === 1 && (
                        <>
                            <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Nombre del paquete</Text>
                            <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 45, paddingLeft: 25 }]} keyboardType="default" placeholder="Ingresa un nombre" maxLength={40}/>
                            <Button icon="chevron-right"
                            buttonColor="#C7FBD7"
                            mode="contained-tonal" 
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            labelStyle={{ marginRight: 23 }}
                            onPress={handleSiguiente}>
                                Siguiente Página
                            </Button>
                        </>
                    )}
                    {Form === 2 && (
                        <>
                            <Text style={{ textAlign: 'center', fontSize: 19,fontWeight: '600' }} >Tipos de Análisis del paquete</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 120 }}>
                                <FilterButton icon="beaker" text="Suelos" isSelected={selectedOption === "Suelos"} backgroundColor="#ececec" onPress={() => filterContent("Suelos")} />
                                <FilterButton icon="beaker" text="Foliar" isSelected={selectedOption === "Foliar"} backgroundColor="#ececec" onPress={() => filterContent("Foliar")} />
                            </View>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};