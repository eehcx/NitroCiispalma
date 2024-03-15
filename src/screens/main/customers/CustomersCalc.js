import React, { useEffect, useState } from 'react';
//React Native
import { SafeAreaView, ScrollView, View } from 'react-native';
// React Native Paper
import { MD2Colors, ActivityIndicator } from 'react-native-paper';
// Styles
import InputForms from '../../../styles/InputForms';
//Componentes
import ItemListRadioButton from '../../../components/common/ItemListRadioButton';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIdLab, setIdCalc } from '../../../features/calc/CalculatorSlice';
// Servicios
import { getMuestras } from '../../../services/calculos';
import { getIdcalculus } from '../../../services/queryService';

// Pagina de listado de clientes
export default CustomersCalc = () => {
    // Redux
    const dispatch = useDispatch();
    // ID Muestra
    const [selectedIdLab, setSelectedIdLab] = useState(null);
    const IdLab = useSelector(state => state.calculator.IdLab);
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

                //
                const uid = await getIdcalculus(informId);
                dispatch(setIdCalc(uid));
                console.log(uid);

            } catch (error) {
                console.error('Error al obtener las muestras:', error);
            }
        };
        console.log('Muestras: \n',Muestras);

        fetchMuestras();
        setLoading(false);
    }, [informId]);

    return (
        <View className='flex-1 bg-zinc-50'>
            <SafeAreaView className='flex-grow'>
                {loading ? (
                    <View style={InputForms.container}>
                        <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                    </View>
                ) : (
                    <ScrollView onScroll={onScroll}>
                        <>
                            {Muestras.map((muestra, index) => (
                                <View key={index}>
                                    <ItemListRadioButton title={"Id Laboratorio. " + muestra.IdLab} content="Sin cálculos hechos" onPress={() => handleRadioButtonPress(muestra.IdLab)} status={IdLab === muestra.IdLab ? 'checked' : 'unchecked'} value={muestra.IdLab} details={() => handleDetails(muestra.IdLab)}/>
                                </View>
                            ))}
                        </>
                        </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};