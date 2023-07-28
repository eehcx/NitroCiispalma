import React, { useEffect, useState } from 'react';
// Estilos globales
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';
//React Native
import { StyleSheet, StyleProp, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Platform, ScrollView, I18nManager, Animated, ViewStyle, View } from 'react-native';
// React Native Paper
import { useTheme, Avatar, IconButton, Card, Text, Button, TouchableRipple, Divider, AnimatedFAB, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase
import { app } from '../utils/firebase/firebaseInit';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const CustomersScreen = ({
        animatedValue,
        visible,
        extended,
        label,
        animateFrom,
        style,
        iconMode,
    }) => {
    const [loading, setLoading] = useState(true);
    // React Navigation
    const navigation = useNavigation();

    const handleNavigateToNewCustomer = () => {
        navigation.navigate('registerCustomer');
    };
    // Hooks para el estado de los clientes
    const [clientes, setClientes] = useState([]);
    // Hooks para el estado del componente
    const [isExtended, setIsExtended] = React.useState(false);

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition =
            Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    };

    // Firebase Realtime Database
    useEffect(() => {
        // Obtén la referencia a la base de datos con la misma instancia de la aplicación
        const database = getDatabase(app);
        const clientesRef = ref(database, 'clientes');
    
        // Escucha los cambios en la referencia de "clientes"
        const onClientesValue = onValue(clientesRef, (snapshot) => {
          // Obtén los datos de la respuesta
          const data = snapshot.val();
          // Convierte el objeto de datos en un array de clientes
          const clientesArray = data ? Object.values(data) : [];
    
          // Actualiza el estado con los clientes obtenidos
          setClientes(clientesArray);
          setLoading(false); // Indica que los datos han sido cargados
        });
    
        // Limpia la suscripción cuando el componente se desmonta
        return () => {
          // Detén la escucha de cambios en la referencia
          off(clientesRef, 'value', onClientesValue);
        };
    }, []);
    // Animación del FAB
    const fabStyle = { [animateFrom]: 16 };

    return (
        <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <SafeAreaView style={[styles.container]}>
                {loading ? (
                    <View style={InputForms.container}>
                        <ActivityIndicator size={'large'} animating={true} color={MD2Colors.green300} />
                    </View>
                ) : (
                <ScrollView onScroll={onScroll}>
                    {clientes.slice().reverse().map((cliente, index) => (
                        <View key={index}>
                            <Card.Title
                            style={styles.cardList}
                            title={cliente.nombre}
                            subtitle={`Fecha de Creación: ${cliente.fecha_creacion}`}
                            left={(props) => <Avatar.Text 
                                style={{backgroundColor: "#82c491"}}
                                size={48} label={cliente.nombre.substring(0, 2)} /> }
                            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                            />
                            <Divider style={styles.cardList} />
                        </View>
                    ))}
                </ScrollView>
                )}
                <AnimatedFAB
                    style={[styles.fabStyle, fabStyle, { opacity: animatedValue, backgroundColor: "#ccc" }]}
                    icon="plus"
                    onPress={handleNavigateToNewCustomer}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    cardList:{
        marginTop: 11,
        marginBottom: 5,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});

export default CustomersScreen; 