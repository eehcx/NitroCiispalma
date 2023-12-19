import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setInformId } from '../../../features/client/informSlice';
// Servicios
import { getInformesCliente } from '../../../services/informes';
// Styles
import InputForms from '../../../styles/InputForms';
// Componentes
import ItemListRadioButton from '../../../components/interface/ItemListRadioButton';

// Pagina de listado de clientes
export default CustomersInform = () => {
    const navigation = useNavigation();
    // ID Informe
    const [selectedInformId, setSelectedInformId] = useState(null);
    const dispatch = useDispatch();
    const clientId = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);
    // objeto de Informes
    const [Reportes, setReportes] = useState({})
    const informesArray = Object.values(Reportes);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Radio Button para seleccionar el uid de informe
    const handleRadioButtonPress = async (informId) => {
        setSelectedInformId(informId);
        console.log('Informe seleccionado:', informId); 
        dispatch(setInformId(informId));
    };

    const handleDetails = async (informeId) => {
        try {
            dispatch(setInformId(informeId));
            navigation.navigate('InformDetails');
            console.log('Inform: ',informeId);
        } catch (error) {
            console.error('Error al obtener datos de informes', error);
        }
    };

    // Obtener el listado de informes del cliente
    const getInformesClienteData = async (clientId) => {
        const informes = await getInformesCliente(clientId);
        setReportes(informes);
    };

    useEffect(() => {
        getInformesClienteData(clientId);
        setLoading(false);
    }, [clientId]);

    // Formateo de fecha
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
                                    <ItemListRadioButton title={informe.tipo_cultivo} content={formatFechaRecepcion(informe.fecha_recepcion)} onPress={() => handleRadioButtonPress(informe.uid)} status={informId === informe.uid ? 'checked' : 'unchecked'} value={informe.uid} details={() => handleDetails(informe.uid)} />
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
});