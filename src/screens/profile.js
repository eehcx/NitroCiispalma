import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Text, Card, Appbar, Button, Divider  } from 'react-native-paper';
import { View, StyleSheet, StatusBar } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();

    //LOGOUT
    const handleLogout = async () => {
        try {
            // Elimina el estado de inicio de sesión con AsyncStorage
            await AsyncStorage.removeItem('user');

            console.log('Usuario deslogueado');
            navigation.navigate('entrace');

        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
    };

    const avi = 'AU';
    const name = 'Aurora';
    const  email = 'aurora@ciispalma.com';

    const _handleMore = () => console.log('Shown more');

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor='#ECECEC' barStyle="dark-content" />

            <Appbar.Header style={{ backgroundColor: '#ECECEC'}}>
                <Appbar.Content title="Profile" />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>

            <View style={styles.ProfileInfoContent}>
                <Avatar.Text size={70} label={avi} style={[styles.aviIcon, {backgroundColor: "rgba(90, 255, 128, 0.6)"}]} />
                <Text variant='headlineMedium' style={styles.ProfileName}>{name}</Text>
                <View style={{flex:1, alignItems: 'center'}}>
                    <View style={[styles.mailContent, styles.mailChild, styles.mailLayout]}>
                        <Text variant='labelLarge' style={styles.txtEmail}>{email}</Text>
                    </View>
                </View>
            </View>

            {/*ESTILOS DEL CARD INFO*/}
            <Card style={[styles.CardShadow,{ margin: 0, marginBottom: -10, borderRadius: 16, backgroundColor: '#fafafa' }]}>
                <Card.Title style={{ marginTop: 15}} title="Información Personal" />
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="location" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Datos de usuario</Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="organization" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Historial</Text>
                    </View>
                    <Divider />
                </Card.Content>
                <Card.Title title="Aplicación" />
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="location" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Tema</Text>
                    </View>
                    <Divider />
                    <Divider />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="location" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Idioma</Text>
                    </View>
                    <Divider />
                </Card.Content>
                <Card.Title title="Adicionales" />
                <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="location" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Politicas y Privacidad</Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Octicons name="location" size={24} color='#000' />
                        <Text variant='labelLarge' style={{ marginLeft: 16 }}>Acerca de</Text>
                    </View>
                    <Divider />
                </Card.Content>
                <Button  mode="contained" style={[styles.textWrapper,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleLogout}>
                    LOGOUT
                </Button>
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    CardShadow: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: -10,
        },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 10, // 
    },
    content: {
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    ProfileInfoContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ProfileName: {
        margin: 10,
        //fontWeight: 'bold',
    },
    // Estilos del mail
    mailContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mailLayout: {
        height: 28,
        paddingLeft: 20,
        paddingRight: 20,
        position: "absolute",
    },
    mailChild: {
        borderRadius: 15,
        backgroundColor: "rgba(90, 255, 128, 0.5)",
        top: 0,
        flex: 1,
    },
    txtEmail: {
        fontSize: 13,
    }
});

export default ProfileScreen;
