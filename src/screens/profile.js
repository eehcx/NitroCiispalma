import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Text, Card, Appbar, Button, Divider  } from 'react-native-paper';
import { View, StyleSheet, StatusBar } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const CardInfo = () => {
    const navigation = useNavigation();

    //LOGOUT
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            console.log('Usuario deslogueado');
            navigation.navigate('entrace');
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
    };

    return(
        <>
            {/*ESTILOS DEL CARD INFO*/}
            <Card style={[styles.CardShadow,{ margin: 4, marginBottom: -10, borderRadius: 16, backgroundColor: '#fafafa' }]}>
                <Text variant='headlineSmall' style={{ color: '#161616', paddingTop: 23, paddingLeft: 23, fontSize: 21}}>Información Personal</Text>
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}>
                        <Octicons name="person" size={24} color='#767983' />
                        <Text variant='labelLarge' style={styles.txtLabels}>Datos de usuario</Text>
                    </View>
                    <Divider style={{ backgroundColor: "#e4e5e6"}} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}>
                        <Octicons name="device-mobile" size={24} color='#767983' />
                        <Text variant='labelLarge' style={styles.txtLabels}>Preferencias</Text>
                    </View>
                    <Divider style={{ backgroundColor: "#e4e5e6"}} />
                </Card.Content>
                <Text variant='headlineSmall' style={{ color: '#161616', paddingVertical: 16, paddingLeft: 23, fontSize: 21}}>Aplicación</Text>
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}>
                        <Octicons name="shield" size={24} color='#767983' />
                        <Text variant='labelLarge' style={styles.txtLabels}>Politicas y Privacidad</Text>
                    </View>
                    <Divider style={{ backgroundColor: "#e4e5e6"}} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 18  }}>
                        <Octicons name='gear' size={24} color='#767983' />
                        <Text variant='labelLarge' style={styles.txtLabels}>Configuraciones</Text>
                    </View>
                    <Divider style={{ backgroundColor: "#e4e5e6"}} />
                </Card.Content>
                <Button  mode="contained" style={[styles.textWrapper,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleLogout}>
                    LOGOUT
                </Button>
            </Card>
        </>
    )
}

export default ProfileScreen = () => {
    // React Navigation
    const navigation = useNavigation();
    const handleNavigateHome = () => { navigation.navigate('home'); };

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    // Función para obtener los datos del usuario desde AsyncStorage
    const getUserDataFromAsyncStorage = async () => {
        try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);

            setDisplayName(user.displayName);
            setEmail(user.email);

        } else {
            navigation.navigate('entrace');
        }
        } catch (error) {
            console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
            navigation.navigate('entrace');
        }
    };

    useEffect(() => { getUserDataFromAsyncStorage(); }, []);

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor='#ECECEC' barStyle="dark-content" />

            <Appbar.Header style={{ backgroundColor: '#ECECEC'}}>
                <Appbar.BackAction onPress={handleNavigateHome} />
                <Appbar.Content title="Profile" />
            </Appbar.Header>

            <View style={styles.ProfileInfoContent}>
                <Avatar.Text size={70} label={displayName.toUpperCase().substring(0, 1)} style={[styles.aviIcon, {backgroundColor: "#d7dfe4"}]} />
                <Text variant='headlineMedium' style={styles.ProfileName}>{displayName}</Text>
                <View style={{flex:1, alignItems: 'center'}}>
                    <View style={[styles.mailContent, styles.mailChild, styles.mailLayout]}>
                        <Text variant='labelLarge' style={styles.txtEmail}>{email}</Text>
                    </View>
                </View>
            </View>
            <CardInfo />
        </View>
    );
};

const styles = StyleSheet.create({
    CardShadow: { shadowColor: "#000", shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 10 },
    content: { flex: 1, backgroundColor: '#ECECEC' },
    ProfileInfoContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    ProfileName: { margin: 10 },
    mailContent: { flexDirection: 'row', alignItems: 'center' },
    mailLayout: { height: 28, paddingLeft: 20, paddingRight: 20, position: "absolute" },
    mailChild: { borderRadius: 15, backgroundColor: "#d7dfe4", top: 0, flex: 1 },
    txtEmail: { fontSize: 13 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});
