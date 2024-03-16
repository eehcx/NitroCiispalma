import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Button, Divider, PaperProvider } from 'react-native-paper';
import { View, StatusBar, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Firebase Auth
import { app } from '../../app/firebase';
import { getAuth, signOut } from "firebase/auth";
// Styles
import Fonts from '../../styles/Fonts';
// Componentes
import ModalAlert from '../../components/interface/ModalAlert';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';

const CardInfo = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleModal = async () => {
        try {
            setModalVisible(true);
        } catch (error) {
        console.log('Error al abir el modal', error);
        }
    };
    const handleClose = async () => {
        setModalVisible(false);
    };
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
        {isModalVisible && <ModalAlert visible={isModalVisible} title='Cerrar sesión' message="¿Seguro que desea cerrar sesión?" button='LOGOUT' onPress={()=> handleLogout()} close={handleClose} />}
            <ScrollView>
                <View className='m-1 rounded-2xl bg-zinc-50'>
                    <Card.Content>
                        <TouchableOpacity className='flex-row items-center justify-between p-5' onPress={()=> navigation.navigate('user')}>
                            <View className='flex-row items-center'>
                                <Icon name="person" size={24} color='#767983' />
                                <Text className='ml-4 text-base' style={[Fonts.cardsText,{color: '#67757d'}]}>Editar Perfil</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='lock' size={24} color='#767983' />
                                <Text className='ml-4 text-base' style={[Fonts.cardsText,{color: '#67757d'}]}>Seguridad y contraseña</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='schedule' size={24} color='#767983' />
                                <Text className='ml-4 text-base' style={[Fonts.cardsText,{color: '#67757d'}]}>Historial de cálculos</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='shield' size={24} color='#767983' />
                                <Text className='ml-4 text-base' style={[Fonts.cardsText,{color: '#67757d'}]}>Políticas de privacidad</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='report' size={24} color='#767983'/>
                                <Text className='ml-4 text-base' style={[Fonts.cardsText,{color: '#67757d'}]}>Centro de ayuda</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#767983' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                    </Card.Content>
                    <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]} onPress={()=> handleModal()}> LOGOUT </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <View className='flex-1 bg-stone-100'>
            <StatusBar backgroundColor='#f5f5f4' barStyle="dark-content" />

            <View className='flex-1 flex-col items-center justify-center mt-1'>
                <Avatar.Text size={70} label={user.displayName.toUpperCase().substring(0, 1)} style={[{backgroundColor: "#d7dfe4", borderColor: "#bbb", borderWidth: 1}]} />
                <Text className='m-3' style={[Fonts.subtitles]}>{user.displayName}</Text>
                <View className='flex-1 items-center'>
                    <View className='flex-1 flex-col items-center h-8 w-max rounded-full px-5 py-1 absolute bg-zinc-200'>
                        <Text style={[Fonts.cardsText]}>{user.email}</Text>
                    </View>
                </View>
            </View>
            <CardInfo />
        </View>
    );
};