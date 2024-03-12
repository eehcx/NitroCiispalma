import React, { useEffect, useState } from 'react';
//React Native
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../../../app/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Components
import FilterPagesExtended from '../../../components/common/filters/FilterPagesExtended';
import ItemListIcon from '../../../components/common/ItemListIcon';

const ListSoilsPackage = () => {
    const navigation = useNavigation();
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
        <View className='flex-1 bg-zinc-50'>
            <PaperProvider>
                <SafeAreaView className='flex-grow'>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {SoilsPackage.slice().reverse().map((packages, index) => (
                                <View key={index}>
                                    <ItemListIcon icon="landslide" iconSize={24} title={packages.nombre} content={packages.uid} onPress={()=> navigation.navigate('PackageDetails')} />
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
    const navigation = useNavigation();
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
        <View className='flex-1 bg-zinc-50'>
            <PaperProvider>
                <SafeAreaView className='flex-grow'>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {foliarPackage.slice().reverse().map((packages, index) => (
                                <View key={index}>
                                    <ItemListIcon icon="yard" iconSize={24} title={packages.nombre} content={packages.uid} onPress={()=> navigation.navigate('PackageDetails')}/>
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
        <View className='flex-1 bg-zinc-50'>
            <View className=' px-5 my-5'>
                <View className=' flex-row justify-between'>
                    <FilterPagesExtended text="Análisis Suelos" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Suelos"} onPress={() => filterContent("Análisis Suelos")}/>
                    <FilterPagesExtended text="Análisis Foliar" backgroundColor="#ECECEC" isSelected={selectedOption === "Análisis Foliar"} onPress={() => filterContent("Análisis Foliar")}/>
                </View>
            </View>
            <TouchableOpacity className=' flex-row items-center justify-center p-4' onPress={NavigateToNewPackage}>
                <Icon name="library-add" size={24} color='#767983' />
                <Text className=' ml-3 text-zinc-500 text-base' style={[Fonts.addText]}>Añadir paquete</Text>
            </TouchableOpacity>
            <Divider className=' my-1 bg-neutral-300' />
            {selectedOption === 'Análisis Suelos' && <ListSoilsPackage />}
            {selectedOption === 'Análisis Foliar' && <ListFoliarPackage/>}
        </View>
    );
};