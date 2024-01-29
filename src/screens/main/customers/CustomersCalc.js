import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
//Componentes
import ItemListRadioButton from '../../../components/interface/ItemListRadioButton';
// Iconos
import Icon from 'react-native-vector-icons/MaterialIcons';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIdLab } from '../../../features/calc/CalculatorSlice';
// Servicios
import { getMuestras } from '../../../services/calculos';

// Pagina de listado de clientes
export default CustomersCalc = () => {
    // Redux
    const dispatch = useDispatch();
    // ID Muestra
    const [selectedIdLab, setSelectedIdLab] = useState(null);
    const IdLab = useSelector(state => state.calculator.IdLab);
    const [numMuestra, setNumMuestra] = useState('');
    // Redux:
    const informId = useSelector(state => state.inform.informId);
    const [Muestras, setMuestras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Radio Button para seleccionar el id de muestra
    const handleRadioButtonPress = async (IdLaboratorio) => {
        setSelectedIdLab(IdLaboratorio);
        console.log('Muestra seleccionado:', IdLaboratorio); 
        dispatch(setIdLab(IdLaboratorio));
    };

    const handleDetails = async (IdLaboratorio) => {
        try {
        } catch (error) {
            console.error('Error al obtener datos de informes', error);
        }
    };

    useEffect(() => {
        const fetchMuestras = async () => {
            try {
                const muestrasData = await getMuestras(informId);
                setMuestras(muestrasData || []); 
            } catch (error) {
                console.error('Error al obtener las muestras:', error);
            }
        };
        console.log('Muestras: \n',Muestras);

        fetchMuestras();
        setLoading(false);
    }, [informId]);

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    {loading ? (
                        <View style={InputForms.container}>
                            <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                        </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            <>
                                <View style={{ marginHorizontal:30, width: '85%' }}>
                                    <TextInput style={[InputForms.input, { marginBottom: 20, borderRadius: 17, }, { height: 43, paddingLeft: 25 }]} placeholder="Ingresa un Id Laboratorio" value={numMuestra} onChangeText={setNumMuestra} keyboardType="numeric" maxLength={10} />
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                    <Icon name="library-add" size={24} color='#767983' />
                                    <Text style={[styles.txtLabels, Fonts.addText]}>Añadir muestra</Text>
                                </TouchableOpacity>
                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                {Muestras.map((muestra, index) => (
                                    <View key={index}>
                                        <ItemListRadioButton title={"Id Laboratorio. " + muestra.IdLab} content="Sin cálculos hechos" onPress={() => handleRadioButtonPress(muestra.IdLab)} status={IdLab === muestra.IdLab ? 'checked' : 'unchecked'} value={muestra.IdLab} details={() => handleDetails(muestra.IdLab)}/>
                                    </View>
                                ))}
                            </>
                            </ScrollView>
                    )}
                </SafeAreaView>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});