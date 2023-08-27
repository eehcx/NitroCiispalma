import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet, Image, TouchableHighlight, ImageBackground, Text, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
import Fonts from '../styles/Fonts';

const HomeScreen = () => {
  // Navegación entre páginas
  const navigation = useNavigation();

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicembre'];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  // Hooks para el estado de la aplicación
  const [displayName, setDisplayName] = useState('');

  const getFirstName = (displayName) => {
    const names = displayName.split(' ');
    return names[0];
  };

  const getUserDataFromAsyncStorage = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');

      if (userJson) {
        const user = JSON.parse(userJson);
        const { displayName } = user;
        const firstName = getFirstName(displayName);
        setDisplayName(firstName);
      } else {
        console.log('No hay un usuario');
        navigation.navigate('login');
      }
    } catch (error) {
      console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
      navigation.navigate('login');
    }
  };

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte.
    getUserDataFromAsyncStorage();
  }, []);

  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />

      <View style={[{ top: 25, left: 30 }]}>
          <Text style={[styles.txtState, Fonts.formTitle]}> Hola, {displayName} </Text>
          <Text style={[Fonts.labelSubtitle, { top: 38, left: 7,letterSpacing: 0.3, textAlign: "left", position: "absolute", color: "#999" }]}>{formattedDate}</Text>
        </View>

        <View style={{ marginTop: 120 }}>
          <ScrollView horizontal>
            <TouchableOpacity
              onPress={()=> navigation.navigate('calculator') }
              underlayColor="#ccc"
              style={[styles.groupItem]}
            >
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/calc.jpg?alt=media&token=daba627b-a48f-4092-a32e-8fd337198d43' }}
                style={styles.imagesTools}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=> navigation.navigate('stats')}
              underlayColor="#ccc"
              style={[styles.groupItem]}
            >
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/stats.jpg?alt=media&token=07a79821-3ed1-4681-9970-72895919dc22' }}
                style={styles.imagesTools}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={[styles.secciones, { top: 40 }]}>
          <Text style={[Fonts.labelSubtitle, { color: "#000", textAlign: "left", position: "absolute" }]}>Actividad reciente</Text>
          <TouchableOpacity style={{ marginLeft: "75%" }}>
            <Text>Ver Todos</Text>
          </TouchableOpacity>
        </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fafafa" },
  txtState:{ color: "#000", textAlign: "left", position: "absolute" },
  groupChildLayout: {width: 90, height: 90, backgroundColor: "#f7f7f7", borderRadius: 13, position: "absolute"},
  // Estilos de las secciones o filtros
  secciones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50 },
  iconContent:{ justifyContent: 'center', alignItems: 'center' },
  containerIco:{ flex: 1, justifyContent: 'center',alignItems: 'center' },
  imagesTools: {
    borderRadius: 13,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupItem: {
    height: 340,
    width: 300, // Ajusta este ancho según tus necesidades
    marginHorizontal: 55, // Margen entre los items
    backgroundColor: '#ececec',
    borderRadius: 22,
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default HomeScreen;