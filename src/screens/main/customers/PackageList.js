import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
import FilterBtn from '../../../components/interface/filters/FilterPages';

const ListSoilsPackage = () => {
    // Paquetes suelos
    const [SoilsPackage, setSoilsPackage] = useState([]);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

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
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {SoilsPackage.slice().reverse().map((packages, index) => (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                                        <Octicons name="package" size={24} color='#767983' style={{ paddingHorizontal:15 }}/>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Text style={[styles.txtLabels, Fonts.modalText]}>{packages.nombre}</Text>
                                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{packages.uid}</Text>
                                        </View>
                                        <TouchableOpacity style={{ paddingHorizontal:20 }}>
                                            <Octicons name="chevron-right" size={24} color='#767983' />
                                        </TouchableOpacity>
                                    </View>
                                    <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
            </PaperProvider>
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
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {foliarPackage.slice().reverse().map((packages, index) => (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                                        <Octicons name="package" size={24} color='#767983' style={{ paddingHorizontal:15 }}/>
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Text style={[styles.txtLabels, Fonts.modalText]}>{packages.nombre}</Text>
                                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{packages.uid}</Text>
                                        </View>
                                        <TouchableOpacity style={{ paddingHorizontal:20 }}>
                                            <Octicons name="chevron-right" size={24} color='#767983' />
                                        </TouchableOpacity>
                                    </View>
                                    <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

// Pagina de listado de clientes
export default RegisterPackage = () => {
    // Navegación
    const navigation = useNavigation();
    const NavigateToNewPackage = () => { navigation.navigate('newPackage'); };
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Filtro 
    const [selectedOption, setSelectedOption] = useState("Análisis Suelos");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <View style={[styles.BoxContainer, { paddingHorizontal:20, marginVertical:20 }]}>
                <View style={[styles.row]}>
                    <FilterBtn text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                    <FilterBtn text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                </View>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }} onPress={NavigateToNewPackage}>
                <Octicons name="duplicate" size={24} color='#767983' />
                <Text style={[styles.txtLabels, Fonts.addText]}>Añadir paquete</Text>
            </TouchableOpacity>
            <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
            {selectedOption === 'Análisis Suelos' && <ListSoilsPackage />}
            {selectedOption === 'Análisis Foliar' && <ListFoliarPackage/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
    // Estilos del container
    row: { flexDirection: 'row', justifyContent: 'space-between' },
});