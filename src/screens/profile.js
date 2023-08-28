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
// Styles
import Fonts from '../styles/Fonts';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData, resetProfileState } from '../utils/redux/Reducer/profileSlice';
import { resetUserState } from '../utils/redux/Reducer/userReducer';

const CardInfo = () => {
    const navigation = useNavigation();
    //LOGOUT
    const handleLogout = async () => {
        const auth = getAuth(app);
        //const dispatch = useDispatch();

        try {
            await AsyncStorage.removeItem('user', (error) => {
                if (!error) {
                    console.log('Usuario eliminado exitosamente');
                } else {
                    console.error('Error al eliminar el usuario:', error);
                }
            });
            console.log('Usuario deslogueado');
            await signOut(auth);


            //dispatch(resetProfileState());
            //dispatch(resetUserState());

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
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
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
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                            <Octicons name="shield" size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Politicas de Privacidad</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                            <Octicons name="report" size={24} color='#767983' />
                            <Text style={[styles.txtLabels, Fonts.cardsText]}>Centro de ayuda</Text>
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                    </Card.Content>
                    <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> handleLogout()}>
                        LOGOUT
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const { displayName, email } = useSelector(state => state.profile);

    useEffect(() => { 
        getUserDataFromAsyncStorage()
            .then(user => {
                dispatch(setProfileData({ displayName: user.displayName, email: user.email }));
            })
            .catch(error => console.log('Error:', error));
    }, []);

    const getUserDataFromAsyncStorage = async () => {
        try {
            const userJson = await AsyncStorage.getItem('user');
            if (userJson) {
                return JSON.parse(userJson);
            } else {
                navigation.navigate('auth');
                return null;
            }
        } catch (error) {
            console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
            navigation.navigate('auth');
            return null;
        }
    };

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa', marginLeft: 20}}>
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
