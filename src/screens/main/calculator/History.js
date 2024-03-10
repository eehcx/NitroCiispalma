import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator } from 'react-native-paper';
import ItemListRadioButton from '../../../components/common/ItemListRadioButton';
// Servicios
import { getMuestras } from '../../../services/calculos';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIdLab } from '../../../features/calc/CalculatorSlice';
// Styles
import InputForms from '../../../styles/InputForms';

export default CalculatorScreen = () => {

    // Redux
    const dispatch = useDispatch();
    const IdLab = useSelector(state => state.calculator.IdLab);
    const informId = useSelector(state => state.inform.informId);
    const client = useSelector(state => state.client);
    console.log(client);

    // ID Muestra
    const [selectedIdLab, setSelectedIdLab] = useState(null);
    const [Muestras, setMuestras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    // Radio Button para seleccionar el id de muestra
    const handleRadioButtonPress = async (IdLaboratorio) => {
        setSelectedIdLab(IdLaboratorio);
        console.log('Informe seleccionado:', IdLaboratorio); 
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
                setMuestras(muestrasData);
            } catch (error) {
                console.error('Error al obtener las muestras:', error);
            }
        };

        fetchMuestras();
        setLoading(false);
    }, [informId]);

    return (
        <View style={[{ flex: 1 }]}>
            <PaperProvider>
                <SafeAreaView>
                    {loading ? (
                            <View style={InputForms.container}>
                                <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                            </View>
                    ) : (
                        <ScrollView onScroll={onScroll}>
                            {/*<Text style={{ padding: 50 }}>Hola cola</Text>*/}
                            {Muestras.map((muestra, index) => (
                                <View key={index}>
                                    <ItemListRadioButton title={"Id Laboratorio. " + muestra.IdLab} content="Sin cálculos hechos" onPress={() => handleRadioButtonPress(muestra.IdLab)} status={IdLab === muestra.IdLab ? 'checked' : 'unchecked'} value={muestra.IdLab} details={() => handleDetails(muestra.IdLab)}/>
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
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});