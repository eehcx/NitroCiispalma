import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { tw } from 'nativewind';
// React Navigation
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../styles/Fonts';

// Redux
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = getCountOfSubcollections('clientes', (count) => { SetNumClientes(count); });
    const unsubscribe2 = getCountOfSubcollections('calculos', (count) => { SetNumCalculos(count); });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const firstName = user.displayName ? user.displayName.split(' ')[0] : '';
  return (
    <>
      <StatusBar backgroundColor='#fafafa'  barStyle="dark-content" />
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: '#fafafa', paddingBottom: 25 }} >
        <View style={[{ top: 25, left: 30 }]}>
          <Text style={[styles.txtState, Fonts.formTitle]}> Hola, {firstName}</Text> 
          <Text style={[Fonts.labelSubtitle, { top: 38, left: 7,letterSpacing: 0.3, textAlign: "left", position: "absolute", color: "#999" }]}>{formattedDate}</Text>
        </View>

        <View style={{ marginTop: '30%' }}>
          <TouchableOpacity onPress={()=> navigation.navigate('calculator') } underlayColor="#d7dfe3" style={[styles.groupItem]} >
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/calc.jpg?alt=media&token=daba627b-a48f-4092-a32e-8fd337198d43' }} style={styles.imagesTools} />
          </TouchableOpacity>
        </View>

        <View style={[styles.secciones, { top: 40 }]}>
          <Text style={[Fonts.labelSubtitle, { color: "#000", textAlign: "left", position: "absolute" , fontWeight: "bold" }]}>Estadísticas</Text>
        </View>

        <View style={{ backgroundColor: "#f0f0f0", height: 75, width: "60%", borderRadius: 20, marginRight: 20, justifyContent: 'flex-start', marginTop: "20%", marginBottom: "10%", marginLeft: "5%" }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
            <Icon name="dns" size={18} color="#333" />
            <Text style={{ color: "#333", marginLeft: 10, fontSize: 15 }}>Datos Consumidos</Text>
          </View>
          <Text style={{ color: "#333", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>10.88MB Descarga</Text>
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

const styles = StyleSheet.create({
  txtState:{ color: "#000", textAlign: "left", position: "absolute" },
  // Estilos de las secciones o filtros
  secciones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50, marginVertical: 1 },
  imagesTools: { borderRadius: 22, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  groupItem: { height: 300, width: 350, marginHorizontal: 30, backgroundColor: '#d7dfe3', borderRadius: 22 },
});