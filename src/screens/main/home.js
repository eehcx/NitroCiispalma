import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text } from 'react-native';
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
          <TouchableOpacity className=' h-72 w-5/6 mx-8' onPress={()=> navigation.navigate('calculator') } underlayColor="#d7dfe3"  >
            <Image className=' rounded-3xl w-full h-full' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/calc.jpg?alt=media&token=daba627b-a48f-4092-a32e-8fd337198d43' }} />
          </TouchableOpacity>
        </View>

        <View className='top-5 mx-10 my-1'>
          <Text className=' text-black text-left absolute text-xl font-bold'>Cliente</Text>
        </View>
        <View className='bg-gray-200 h-24 w-3/5 rounded-2xl justify-start mt-5 mx-9 my-14'>
          <View className='flex-row items-center top-4 px-5'>
            <Icon name="dns" size={18} color="#333" />
            <Text className='text-black ml-3 text-base'>{client.RazonSocial ? client.RazonSocial : 'Cliente seleccionado'}</Text>
          </View>
          <Text className='text-black ml-5 top-5 font-bold text-lg'>{'No. Laboratorio '+calculator.IdLab ? 'No. Laboratorio '+ calculator.IdLab : 'Id Laboratorio'}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: "#41525C", height: 75, width: "42%", borderRadius: 20, marginRight: 20, justifyContent: 'flex-start' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Icon name="tag" size={18} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>Cálculos</Text>
            </View>
            <Text style={{ color: "#fff", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>{numCalculos} Registros</Text>
          </View>

          <View style={{ backgroundColor: "#82BF53", height: 75, width: "42%", borderRadius: 20, justifyContent: 'flex-start' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Icon name="groups" size={18} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>Clientes</Text>
            </View>
            <Text style={{ color: "#fff", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>{numClientes} Registros</Text>
          </View>
        </View>
      </View>
    </>
  );
};