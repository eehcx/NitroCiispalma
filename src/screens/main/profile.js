import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Card, Button, Divider } from 'react-native-paper';
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
                <View className='rounded-2xl bg-slate-100'>
                    <Card.Content>
                        <TouchableOpacity className='flex-row items-center justify-between p-5' onPress={()=> navigation.navigate('user')}>
                            <View className='flex-row items-center'>
                                <Icon name="person" size={24} color='#475569' />
                                <Text className='ml-4 text-base text-slate-500'>Editar Perfil</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#475569' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='lock' size={24} color='#475569' />
                                <Text className='ml-4 text-base text-slate-500'>Seguridad y contraseña</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#475569' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='schedule' size={24} color='#475569' />
                                <Text className='ml-4 text-base text-slate-500'>Historial de cálculos</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#475569' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='shield' size={24} color='#475569' />
                                <Text className='ml-4 text-base text-slate-500'>Políticas de privacidad</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#475569' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                        <TouchableOpacity className='flex-row items-center justify-between p-5'>
                            <View className='flex-row items-center'>
                                <Icon name='report' size={24} color='#475569'/>
                                <Text className='ml-4 text-base text-slate-500'>Centro de ayuda</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color='#475569' />
                        </TouchableOpacity>
                        <Divider className='bg-stone-200'/>
                    </Card.Content>
                    <Button className="rounded-2xl my-5 mx-8 h-11" mode="contained" style={[{backgroundColor: '#41525C'}]} onPress={()=> handleModal()}> LOGOUT </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <View className='flex-1 px-2 bg-slate-50'>
            <StatusBar backgroundColor='#f8fafc' barStyle="dark-content" />

            <View className='flex-1 h-full items-center justify-center m-5'>
                <View className='flex-1 flex-col items-center justify-center'>
                    <Avatar.Text color='#64748b' className="border border-slate-500 bg-slate-100" size={100} label={user.displayName.toUpperCase().substring(0, 1)} />
                    <Text className='m-4 text-3xl text-slate-500'>{user.displayName}</Text>
                    <View className='h-8 w-max rounded-xl px-5 bg-slate-200'>
                        <Text className="text-lg text-slate-500">{user.email}</Text>
                    </View>
                </View>
            </View>
            <CardInfo />
        </View>
    );
};