import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// React Navigation
import { useNavigation } from '@react-navigation/native';

// Redux
import { useSelector } from 'react-redux';

import { getCountOfSubcollections } from '../../services/queryService';
import { formatDateToString } from '../../utils/helpers/dateHelpers';

export default HomeScreen = () => {
  // Navegación entre páginas
  const navigation = useNavigation();
  // Stats
  const [numClientes, SetNumClientes] = useState(0);
  const [numCalculos, SetNumCalculos] = useState(0);
  // Date
  const currentDate = new Date();
  const formattedDate = formatDateToString(currentDate);

  // Redux - User
  const user = useSelector(state => state.user);
  const client = useSelector(state => state.client);
  const calculator = useSelector(state => state.calculator);

  useEffect(() => {
    const unsubscribe = getCountOfSubcollections('clientes', (count) => { SetNumClientes(count); });
    const unsubscribe2 = getCountOfSubcollections('calculos', (count) => { SetNumCalculos(count); });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Bienvenid@';
  return (
    <>
      <StatusBar backgroundColor='#fafafa'  barStyle="dark-content" />
      <View className='bg-neutral-50 pb-12'>
        <View className='top-6 left-8'>
          <Text className='text-black text-left absolute font-bold text-2xl'> Hola, {firstName}</Text> 
          <Text className='text-xl top-9 text-left left-2 absolute text-gray-500 tracking-wide' >{formattedDate}</Text>
        </View>
        <View className=' mt-28'>
          <View className='h-1 w-5/6 bg-gray-200 rounded-full m-auto'>
          </View>
          <TouchableOpacity className=' h-72 w-5/6 mx-8' onPress={()=> navigation.navigate('calculator') } underlayColor="#d7dfe3"  >
            <Image className=' rounded-3xl w-full h-full' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/static%2FImages%2FIMG%202024-03-15%20at%206.33.26%20PM.jpeg?alt=media&token=569c61b2-3f1f-4a1d-b2cf-e2fd30512085' }} />
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: "#67757d"}} className='h-auto w-11/12 rounded-2xl justify-start mx-auto my-2 py-6'>
          <View className='flex-row items-center my-auto px-5'>
            <Icon name="people-alt" size={30} color="#AAFC79" />
            <View className='flex-col ml-2'>
              <Text className='text-white text-base font-bold'>Clientes</Text>
              <Text className='text-white text-base'>{client.RazonSocial ? client.RazonSocial : 'No seleccionado'}</Text>
            </View>
            <View style={{ width: 1, height: '100%', backgroundColor: '#fafafa', marginHorizontal:10 }}></View>
            <Icon name="stacked-bar-chart" size={30} color="#AAFC79" />
            <View className='flex-col ml-2'>
              <Text className='text-white text-base font-bold'>Id Lab.</Text>
              <Text className='text-white text-base'>{'Número. '+calculator.IdLab ? 'Número. '+ calculator.IdLab : 'Número. 0'}</Text>
            </View>
          </View>
        </View>

        <View className='flex-1 mx-10 my-5'>
          <Text className=' text-black text-left absolute text-xl font-bold'>Estadísticas</Text>
        </View>

        <View className='flex-row justify-center items-center mt-8'>
          <View style={{ backgroundColor: "#82BF53", height: 75, width: "43%", borderRadius: 20, marginRight: '5%', justifyContent: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2.67, elevation: 2 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Icon name="groups" size={18} color="#fff" />
              <Text className='text-white ml-3 text-base'>Clientes</Text>
            </View>
            <Text className='text-white ml-5 top-2 font-bold text-lg'>{numClientes} Registros</Text>
          </View>
          <View style={{ backgroundColor: "#e4e4e7", height: 75, width: "43%", borderRadius: 20, justifyContent: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2.67, elevation: 2 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Icon name="tag" size={18} color="#000" />
              <Text className='text-black ml-3 text-base'>Cálculos</Text>
            </View>
            <Text className='text-black ml-5 top-2 font-bold text-lg'>{numCalculos} Registros</Text>
          </View>
        </View>
      </View>
    </>
  );
};