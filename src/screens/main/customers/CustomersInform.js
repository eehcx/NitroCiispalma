import React, { useEffect, useState } from 'react';
//React Native
import { SafeAreaView, ScrollView, View } from 'react-native';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setInformId } from '../../../features/client/informSlice';
import { getInforms } from '../../../services/queryService';
// Componentes
import ItemListRadioButton from '../../../components/common/ItemListRadioButton';

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
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Radio Button para seleccionar el uid de informe
    const handleRadioButtonPress = async (informId) => {
        setSelectedInformId(informId);
        dispatch(setInformId(informId));
    };

    const handleDetails = async (informeId) => {
        try {
            dispatch(setInformId(informeId));
            navigation.navigate('InformDetails');
        } catch (error) {
            console.error('Error al obtener datos de informes', error);
        }
    };

    useEffect(() => {
        const unsubscribe = getInforms(clientId, (informesData) => {
            setReportes(informesData);
        });

        return () => {
            unsubscribe();
        };
    }, [clientId]);

    // Formateo de fecha
    const formatFechaRecepcion = (fechaRecepcion) => {
        const formattedDate = new Date(fechaRecepcion);
        return formattedDate.toLocaleString();
    };

    return (
        <View className='flex-1 bg-zinc-50'>
            <SafeAreaView className='flex-grow'>
                <ScrollView onScroll={onScroll}>
                    {informesArray.slice().reverse().map((informe, index) => (
                        <View key={index}>
                            <ItemListRadioButton title={informe.tipo_cultivo} content={formatFechaRecepcion(informe.fecha_recepcion)} onPress={() => handleRadioButtonPress(informe.uid)} status={informId === informe.uid ? 'checked' : 'unchecked'} value={informe.uid} details={() => handleDetails(informe.uid)} />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};