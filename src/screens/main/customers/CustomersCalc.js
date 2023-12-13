import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, TextInput } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
//Componentes
import ItemListIcon from '../../../components/interface/ItemListIcon';
// Iconos
import Icon from 'react-native-vector-icons/MaterialIcons';
// Redux
import { useSelector } from 'react-redux';
import { setClientId } from '../../../features/client/clientSlice';
import { setInformId } from '../../../features/client/informSlice';
//
import { getResultados } from '../../../services/reportes';
// Firebase
import { app } from '../../../app/firebase';
import { getDatabase, push, set, ref, onValue, off, get } from 'firebase/database';

// Pagina de listado de clientes
export default CustomersCalc = () => {
    const [numMuestra, setNumMuestra] = useState('');
    // Redux:
    const clientId = useSelector(state => state.client.clientId);
    const informId = useSelector(state => state.inform.informId);
    const [Muestras, setMuestras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    useEffect(() => {
        getResultados(clientId, informId)
            .then((resultados) => {
                if (resultados && resultados.length > 0) {
                    const informeResultados = resultados[0];
                    const uidCalc = informeResultados.uid;

                    if (uidCalc) {
                        const db = getDatabase(app);
                        const muestrasRef = ref(db, 'calculos/' + uidCalc + '/muestras');

                        return get(muestrasRef)
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    const muestras = snapshot.val();
                                    console.log('Muestras:', muestras);

                                    // Actualiza el estado de las muestras
                                    setMuestras(muestras);
                                } else {
                                    console.log('No se encontraron muestras en los resultados.');
                                }
                            })
                            .catch((error) => {
                                console.error('Error al obtener muestras:', error);
                            });
                    } else {
                        console.log('No se encontró un UID de cálculos válido en los resultados.');
                    }
                } else {
                    console.log('No se encontraron resultados.');
                }
            })
            .catch((error) => {
                console.error('Error al obtener resultados:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 

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
                                    <Icon name="tab_group" size={24} color='#767983' />
                                    <Text style={[styles.txtLabels, Fonts.addText]}>Añadir muestra</Text>
                                </TouchableOpacity>
                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
                                {Muestras.map((muestra, index) => (
                                    <View key={index}>
                                        <ItemListIcon title={"Id Laboratorio. " + muestra.IdLab} content="Sin cálculos hechos" icon="project" iconSize={24} />
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