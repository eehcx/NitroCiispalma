import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Button, Divider, Appbar  } from 'react-native-paper';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase Auth
import { app } from '../../app/firebase';
import { getAuth, signOut } from "firebase/auth";
// Styles
import Fonts from '../../styles/Fonts';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';

const CardInfo = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //LOGOUT
    const handleLogout = async () => {
        const auth = getAuth(app);
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
            dispatch(logout());
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
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }} onPress={()=> navigation.navigate('user')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="person" size={24} color='#767983' />
                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Editar Perfil</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='lock' size={24} color='#767983' />
                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Seguridad y contraseña</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='schedule' size={24} color='#767983' />
                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Historial de cálculos</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }} onPress={()=> navigation.navigate('appData')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='shield' size={24} color='#767983' />
                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Políticas de privacidad</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='report' size={24} color='#767983' />
                                <Text style={[styles.txtLabels, Fonts.cardsText]}>Centro de ayuda</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider style={{ backgroundColor: "#e4e5e6"}} />
                    </Card.Content>
                    <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> handleLogout()}> LOGOUT </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <View style={styles.content}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa', marginLeft: 20}}>
                <Appbar.Content title="Perfil" />
            </Appbar.Header>

            <View style={[styles.ProfileInfoContent, { marginTop: 5 }]}>
                <Avatar.Text size={70} label={user.displayName.toUpperCase().substring(0, 1)} style={[styles.aviIcon, {backgroundColor: "#d7dfe4", borderColor: "#bbb", borderWidth: 1}]} />
                <Text style={[styles.ProfileName, Fonts.subtitles]}>{user.displayName}</Text>
                <View style={{flex:1, alignItems: 'center'}}>
                    <View style={[styles.mailContent, styles.mailChild, styles.mailLayout]}>
                        <Text style={[Fonts.cardsText]}>{ user.email}</Text>
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