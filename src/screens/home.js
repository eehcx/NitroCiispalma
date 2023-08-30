import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet, Image, Text, FlatList } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
import Fonts from '../styles/Fonts';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayName } from '../reducers/userSlice';

import { getCountOfSubcollections } from '../utils/services/queryService';

const HomeScreen = () => {
  // Navegación entre páginas
  const navigation = useNavigation();
  // Stats
  const [numClientes, SetNumClientes] = useState(0);
  const [numCalculos, SetNumCalculos] = useState(0);

  // Fechas
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicembre'];
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  // Redux - User
  const dispatch = useDispatch();
  const displayName = useSelector(state => state.user.displayName);
  const getFirstName = (displayName) => {
    const names = displayName.split(' ');
    return names[0];
  };

  useEffect(() => {
    const unsubscribe = getCountOfSubcollections('clientes', (count) => { SetNumClientes(count); });
    const unsubscribe2 = getCountOfSubcollections('calculos', (count) => { SetNumCalculos(count); });

    getUserDataFromAsyncStorage()
      .then(user => {
        const firstName = getFirstName(user.displayName);
        dispatch(setDisplayName(firstName));
      })
      .catch(error => console.log('Error:', error));

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const getUserDataFromAsyncStorage = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        return JSON.parse(userJson);
      } else {
        console.log('No hay un usuario');
        navigation.navigate('login');
        return null;
      }
    } catch (error) {
      console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
      navigation.navigate('login');
      return null;
    }
  };

  const renderCalculoItem = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />

      <View style={[{ top: 25, left: 30 }]}>
          <Text style={[styles.txtState, Fonts.formTitle]}> Hola, {displayName} </Text>
          <Text style={[Fonts.labelSubtitle, { top: 38, left: 7,letterSpacing: 0.3, textAlign: "left", position: "absolute", color: "#999" }]}>{formattedDate}</Text>
        </View>

        <View style={{ marginTop: 120 }}>
          <GestureScrollView horizontal showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={200}
          >
            <TouchableOpacity
              onPress={()=> navigation.navigate('calculator') }
              underlayColor="#d7dfe3"
              style={[styles.groupItem]}
            >
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/calc.jpg?alt=media&token=daba627b-a48f-4092-a32e-8fd337198d43' }}
                style={styles.imagesTools}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> navigation.navigate('stats')}
              underlayColor="#d7dfe3"
              style={[styles.groupItem]}
            >
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/stats.jpg?alt=media&token=07a79821-3ed1-4681-9970-72895919dc22' }}
                style={styles.imagesTools}
              />
            </TouchableOpacity>
          </GestureScrollView>
        </View>

        <View style={[styles.secciones, { top: 40 }]}>
          <Text style={[Fonts.labelSubtitle, { color: "#000", textAlign: "left", position: "absolute" , fontWeight: "bold" }]}>Estadísticas</Text>

        </View>

        <View
          style={{ backgroundColor: "#f0f0f0", height: 75, width: "60%", borderRadius: 20, marginRight: 20, justifyContent: 'flex-start', marginTop: "20%", marginBottom: "10%", marginLeft: "5%" }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
            <Octicons name="server" size={18} color="#333" />
            <Text style={{ color: "#333", marginLeft: 10, fontSize: 15 }}>Datos Consumidos</Text>
          </View>
          <Text style={{ color: "#333", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>10.88MB Descarga</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{ backgroundColor: "#565A5D", height: 75, width: "42%", borderRadius: 20, marginRight: 20, justifyContent: 'flex-start' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Octicons name="hash" size={18} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>Cálculos</Text>
            </View>
            <Text style={{ color: "#fff", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>{numCalculos} Registros</Text>
          </View>

          <View
            style={{ backgroundColor: "#82BF53", height: 75, width: "42%", borderRadius: 20, justifyContent: 'flex-start' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 15, paddingHorizontal: 20 }}>
              <Octicons name="people" size={18} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 15 }}>Clientes</Text>
            </View>
            <Text style={{ color: "#fff", marginLeft: 20, top:20, fontWeight: "bold", fontSize: 18 }}>{numClientes} Registros</Text>
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fafafa" },
  txtState:{ color: "#000", textAlign: "left", position: "absolute" },
  // Estilos de las secciones o filtros
  secciones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50, marginVertical: 1 },
  imagesTools: {
    borderRadius: 22,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupItem: {
    height: 300,
    width: 350, // Ajusta este ancho según tus necesidades
    marginHorizontal: 30, // Margen entre los items
    backgroundColor: '#d7dfe3',
    borderRadius: 22,
  },
});

export default HomeScreen;