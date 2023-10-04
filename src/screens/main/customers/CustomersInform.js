import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
// React Native Paper
import { Avatar, IconButton, Card, Divider, ActivityIndicator, MD2Colors, FAB, Portal, PaperProvider, Snackbar, Checkbox, Switch } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Styles
import InputForms from '../../../styles/InputForms';

// Pagina de listado de clientes
const CustomersInform = () => {
    

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <PaperProvider>
                <SafeAreaView style={[styles.container]}>
                    <View>
                        <Text>
                            Hola Mundo
                        </Text>
                    </View>
                </SafeAreaView>
                
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
});

export default CustomersInform; 