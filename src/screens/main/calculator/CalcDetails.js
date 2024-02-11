import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, TextInput, View, Text, TouchableOpacity, StatusBar } from 'react-native';
// React Native Paper
import { MD2Colors, ActivityIndicator, Divider } from 'react-native-paper';
//
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

export default CalcDetails = () => {
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <View style={[{ flex: 1, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center' }]}>
                {loading ? (
                    <View style={InputForms.container}>
                        <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                    </View>
                ) : (
                    <>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.txtLabels, Fonts.modalText]}> mg〖Kg〗^(-1)= ((Abs M – Abs B) /m) *FDM </Text>
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});