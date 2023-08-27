import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Button, Divider, Appbar  } from 'react-native-paper';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase Auth
import { app } from '../utils/firebase/firebaseInit';
import { getAuth, signOut } from "firebase/auth";
import InputScreen from './entrace';

import Fonts from '../styles/Fonts';

const CardInfo = () => {
    const navigation = useNavigation();

    //LOGOUT
    const handleLogout = async () => {
        const auth = getAuth(app);
        try {
            await AsyncStorage.removeItem('user');
            console.log('Usuario deslogueado');
            await signOut(auth);
            navigation.navigate('auth');
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
    };

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.CardShadow,{ margin: 4, marginBottom: -10, borderRadius: 16, backgroundColor: '#fafafa' }]}>
                    <Card.Content>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }} onPress={()=> navigation.navigate('user')}>
                            <Octicons name="person" size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Tu perfil</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20  }}>
                            <Octicons name='lock' size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Seguridad y contraseña</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20  }} onPress={()=> navigation.navigate('history')}>
                            <Octicons name='history' size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Historial de cálculos</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }} onPress={()=> navigation.navigate('appData')}>
                            <Octicons name="shield" size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Politicas de Privacidad</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }} onPress={()=> navigation.navigate('appData')}>
                            <Octicons name="report" size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Centro de ayuda</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                    </Card.Content>
                    <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={handleLogout}>
                        LOGOUT
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    // React Navigation
    const navigation = useNavigation();
    const handleNavigateHome = () => { navigation.navigate(InputScreen); };

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    const getUserDataFromAsyncStorage = async () => {
        try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);

            setDisplayName(user.displayName);
            setEmail(user.email);

        } else {
            navigation.navigate('auth');
        }
        } catch (error) {
            console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
            navigation.navigate('auth');
        }
    };

    useEffect(() => { getUserDataFromAsyncStorage(); }, []);

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa'}}>
                <Appbar.BackAction onPress={()=> navigation.navigate('home')} />
                <Appbar.Content title="Perfil" />
            </Appbar.Header>

            <View style={[styles.ProfileInfoContent, { marginTop: 5 }]}>
                <Avatar.Text size={70} label={displayName.toUpperCase().substring(0, 1)} style={[styles.aviIcon, {backgroundColor: "#d7dfe4", borderColor: "#bbb", borderWidth: 1}]} />
                <Text style={[styles.ProfileName, Fonts.subtitles]}>{displayName}</Text>
                <View style={{flex:1, alignItems: 'center'}}>
                    <View style={[styles.mailContent, styles.mailChild, styles.mailLayout]}>
                        <Text style={[Fonts.cardsText]}>{email}</Text>
                    </View>
                </View>
            </View>
            <CardInfo />
        </View>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, backgroundColor: '#fafafa' },
    ProfileInfoContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    ProfileName: { margin: 10 },
    mailContent: { flexDirection: 'row', alignItems: 'center' },
    mailLayout: { height: 28, paddingLeft: 20, paddingRight: 20, position: "absolute" },
    mailChild: { borderRadius: 15, backgroundColor: "#d7dfe4", top: 0, flex: 1 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});
