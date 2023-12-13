import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// React Native Paper
import { PaperProvider, Button, Text, Divider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Estilos globales
import InputForms from '../../../../styles/InputForms';
import Fonts from '../../../../styles/Fonts';
// Components
import FilterButton from '../../../../components/interface/filters/filterButton';
import FilterPagesExtended from '../../../../components/interface/filters/FilterPagesExtended';

export default NewPackage = () => {
    // Formulario
    const [Form, setForm] = useState(1);
    const handleSiguiente = () => { setForm(Form + 1); };
    // Variables y arrays
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [Estudio, setEstudio] = useState('');
    const [analisis, setAnalisis] = useState([]);
    // Filtro
    const filterContent = (option) => { setSelectedOption(option); };
    const [selectedOption, setSelectedOption] = useState("Análisis Suelos"); // Nombre Paquetes
    // Scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    //
    const addResearch = () => {
        setAnalisis([...analisis, Estudio]);
        setEstudio(''); // Limpia el valor del nuevo estudio
        console.log(analisis);
    };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center'}}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    <ScrollView onScroll={onScroll}>
                    <View style={[styles.BoxContainer, { paddingHorizontal:30, paddingVertical:20 }]}>
                    <View style={[styles.row]}>
                        <FilterPagesExtended text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                        <FilterPagesExtended text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                    </View>
                </View>
                        {Form === 1 && (
                            <>
                                <View style={{marginHorizontal: 30, marginVertical: 10, width: '85%' }}>
                                    <TextInput style={[InputForms.input, { marginBottom: 20, borderRadius: 17, }, { height: 43, paddingLeft: 25 }]} placeholder="Ingresa un Análisis" value={Estudio} onChangeText={(text) => {
                                        setEstudio(text); 
                                        setIsInputEmpty(text.trim() === '');
                                    }} maxLength={90} />
                                </View>

                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }} onPress={addResearch} disabled={isInputEmpty}>
                                    <Icon name="library-add" size={24} color='#767983' />
                                    <Text style={[styles.txtLabels, Fonts.addText]}>Añadir análisis</Text>
                                </TouchableOpacity>
                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />

                                {analisis.map((estudio, index) => (
                                    <View key={index}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                                            <Icon name="view-kanban" size={24} color='#767983' style={{ paddingHorizontal:15 }}/>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={[styles.txtLabels, Fonts.modalText,{ fontWeight: '700' }]}>Análisis del paquete</Text>
                                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Añadido: {estudio}</Text>
                                            </View>
                                            <View></View><View></View><View></View>
                                        </View>
                                        <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                    </View>
                                ))}
                            </>
                        )}
                    </ScrollView>
                </SafeAreaView>
                <Button mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> ENVIAR </Button>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
    BoxContainer: { flex: 1, padding:20, justifyContent: 'space-around', },
    row: { flexDirection: 'row', justifyContent: 'space-between', },
});