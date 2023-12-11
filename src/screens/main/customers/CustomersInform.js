import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { PaperProvider, RadioButton, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setClientId } from '../../../features/client/clientSlice';
import { setInformId } from '../../../features/client/informSlice';
// Servicios
import { getReportes } from '../../../services/reportes';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

// Pagina de listado de clientes
export default CustomersInform = () => {
    const navigation = useNavigation();
    // ID Informe
    const [selectedInformId, setSelectedInformId] = useState(null);
    const dispatch = useDispatch();
    const clientId = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);
    // objeto de Informes
    const [informes, setInformes] = useState({})
    const informesArray = Object.values(informes);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    const handleRadioButtonPress = (informId) => {
        setSelectedInformId(informId);
        console.log('Informe seleccionado:', informId); // Añade este log para verificar el ID
        dispatch(setInformId(informId));
    };

    //getReportes
    useEffect(() => {
        getReportes(clientId)
            .then((informesCliente) => {
                setInformes(informesCliente);
            })
            .catch((error) => {
                console.error('Error al obtener informes del cliente', error);
            });
        setLoading(false);
    }, []);
    console.log("INFORMES:#############################\n", informes)
    const formatFechaRecepcion = (fechaRecepcion) => {
        const formattedDate = new Date(fechaRecepcion);
        return formattedDate.toLocaleString();
    };

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
                            {informesArray.slice().reverse().map((informe, index) => (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                                        <RadioButton.Item color='#167139' value={informe.uid} status={informId === informe.uid ? 'checked' : 'unchecked'} onPress={() => handleRadioButtonPress(informe.uid)} />
                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginRight:'20%' }}>
                                            <Text style={[styles.txtLabels, Fonts.modalText]}>{informe.tipo_analisis}</Text>
                                            <Text style={[styles.txtLabels, Fonts.cardsText]}>{formatFechaRecepcion(informe.fecha_recepcion)}</Text>
                                        </View>
                                        <TouchableOpacity style={{ paddingHorizontal:20 }} onPress={()=> navigation.navigate('InformDetails')}>
                                            <Icon name="chevron-right" size={24} color='#767983' />
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

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});