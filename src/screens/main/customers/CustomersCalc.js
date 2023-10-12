import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
// React Native Paper
import { PaperProvider, MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Iconos
import Octicons from '@expo/vector-icons/Octicons';

// Pagina de listado de clientes
const CustomersCalc = () => {
    const [loading, setLoading] = useState(true);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    useEffect(() => {
        setLoading(false);
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
                            <View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                    <Octicons name="duplicate" size={24} color='#767983' />
                                    <Text style={[styles.txtLabels, Fonts.addText]}>Añadir muestra</Text>
                                </TouchableOpacity>
                                <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />

                                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: "#82BF53", height: 90, width: "90vw", borderRadius: 20, justifyContent: 'flex-start', marginVertical: 15, marginHorizontal: '7%' }} >
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row',  alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
                                            <Octicons name="project" size={20} color="#fff" />
                                            <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15, fontWeight: "600" }}>No. 1029</Text>
                                        </View>
                                        <Text style={{ color: "#fff", marginLeft: 20, top:20, fontWeight: "500", fontSize: 18 }}>Hola</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
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

export default CustomersCalc; 