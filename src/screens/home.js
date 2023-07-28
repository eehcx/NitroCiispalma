import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button, Text, BottomNavigation, Card, TouchableRipple, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
import { Color, Border, FontSize } from "../styles/GlobalStyles";
// React Navigation
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  // Hooks para el estado de la aplicación
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const getFirstName = (displayName) => {
    const names = displayName.split(' ');
    return names[0];
  };

  const handleNavigateToCalc = () => {
    navigation.navigate('calculator');
  };

  const handleNavigateToHistory = () => {
    navigation.navigate('history');
  };

  const handleNavigateToCustomers = () => {
    navigation.navigate('customers');
  };

  // Función para obtener los datos del usuario desde AsyncStorage
  const getUserDataFromAsyncStorage = async () => {
    try {
      // Obtener el objeto del usuario almacenado en AsyncStorage
      const userJson = await AsyncStorage.getItem('user');

      if (userJson) {
        // Convertir el JSON a un objeto de JavaScript
        const user = JSON.parse(userJson);

        // Obtener el displayName del usuario
        const { displayName } = user;

        // Obtener el primer nombre antes del espacio
        const firstName = getFirstName(displayName);

        // Guardar el valor en el estado
        setDisplayName(firstName);
      } else {
        console.log('No se encontró ningún usuario almacenado en AsyncStorage.');
      }
    } catch (error) {
      console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
    }
  };

  // Ejecutar la función para obtener los datos del usuario cuando el componente se monte
  useEffect(() => {
    getUserDataFromAsyncStorage();
  }, []); // El segundo argumento (un array vacío) asegura que se ejecute solo una vez al montar el componente
  

  return (
    <View style={styles.mainscreen}>
      <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
      <View style={styles.entrace}>
        <View style={styles.fondo} />
        <Text style={styles.aurora}>{displayName}</Text>
        <View style={[styles.holaAuroraParent, styles.aviIconPosition]}>
          <Text style={[styles.holaAurora, styles.quVasAPosition]}>
            Hola {displayName},         
          </Text>
          <Text style={[styles.quVasA, styles.quVasAPosition]}>
            ¿Qué vas a hacer hoy?
          </Text>
        </View>
      </View>
      <View style={[styles.search, styles.searchLayout]}>
        <Searchbar
          style={styles.input}
          placeholder="Search for pages"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      {/* Filtro de herramientas */}
      <Text variant="titleLarge" style={[styles.herramientas, styles.herramientasTypo]}>
        Herramientas
      </Text>
      <View style={styles.containerTools}>
        <TouchableOpacity onPress={handleNavigateToCalc} style={styles.groupItem}>
          <View style={styles.containerIco}>
            <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fcalculator.png?alt=media&token=40ac4df3-24dc-4190-804e-f6c1d6c6561d' }} 
            style={styles.Icon3d}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToCustomers} style={[styles.groupItem, { marginLeft: 170 }]}>
          <View style={styles.containerIco}>
            <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fview.png?alt=media&token=ef261487-db31-4be4-8264-038163d028cf' }} 
            style={styles.Icon3d}/>
          </View>
        </TouchableOpacity> 
      </View>

      {/* Filtro de historial */}
      
      <Text variant="titleLarge" style={[styles.informesHechos, styles.herramientasTypo]}>
        Historial de clientes
      </Text>

      <TouchableOpacity onPress={handleNavigateToHistory} style={[styles.groupLayout, { marginTop: 600, marginLeft:65 }]}>
        <View style={styles.containerIco}>
          <Octicons style={styles.iconContent} name="history" size={35} color='#ccc' />
        </View>
      </TouchableOpacity>

      {/* Filtro de secciones */}
      <View style={styles.secciones}>
        <TouchableOpacity style={[ styles.groupChildLayout]}>
          <View style={styles.containerIco}>
            <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fnews.png?alt=media&token=6c919a3d-ced0-4bc0-8ca3-df49705214c5' }} 
            style={styles.Icon3d}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[ styles.groupChildLayout, styles.rectangleGroup]}>
          <View style={styles.containerIco}>
            <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Ftools.png?alt=media&token=799bc63d-8183-474a-a386-10e4341c1a31' }} 
            style={styles.Icon3d}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.rectangleParent1, styles.groupChildLayout]}>
          <View style={styles.containerIco}>
            <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/Icons3D%2Fstorage.png?alt=media&token=2f904a92-5a0b-4179-a988-503d1f1818d1' }} 
            style={styles.Icon3d}/>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  secciones: {
    flexDirection: 'row',
    top: 250,
    left: 65,
    position: "absolute",
  },
  groupChildLayout: {
    width: 88,
    height: 88,
    backgroundColor: "#ececec",
    borderRadius: Border.br_smi,
    position: "absolute",
  },
  rectangleGroup: {
    left: 105,
  },
  rectangleParent1: {
    left: 210,
  },
  // DEMAS ESTILOS
  containerIco:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContent:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon3d:{
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHistory:{
    flex: 1,
  },
  groupLayout: {
    height: 55,
    width: 298,
    position: "absolute",
    top: 0,
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_smi,
    left: 0,
  },
  containerTools:{
    flex: 1,
    left: 65,
    top: 350,
  },
  groupItem: {
    height: 125,
    width: 125,
    position: "absolute",
    top: 0,
    backgroundColor: "#ececec",
    borderRadius: Border.br_smi,
    left: 0,
  },
  aviIconPosition: {
    top: 36,
    position: "absolute",
  },
  quVasAPosition: {
    color: Color.white,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    height: 34,
    width: 36,
    left: 26,
    position: "absolute",
    overflow: "hidden",
  },
  herramientasTypo: {
    height: 30,
    width: 226,
    color: "#000",
    alignItems: "center",
    display: "flex",
    left: 65,
    textAlign: "left",
    position: "absolute",
  },
  fondo: {
    top: 9,
    left: 49,
    backgroundColor: "#58b06d",
    width: 428,
    height: 186,
    position: "absolute",
  },
  aurora: {
    fontSize: 200,
    fontWeight: "700",
    color: "rgba(130, 196, 145, 0.5)",
    textAlign: "left",
    left: 10,
    top: -40,
    position: "absolute",
  },
  holaAurora: {
    fontSize: 21,
    fontWeight: "600",
    top: 0,
  },
  quVasA: {
    top: 32,
    fontSize: 16,
  },
  holaAuroraParent: {
    left: 93,
    width: 171,
    height: 51,
  },
  aviIcon: {
    left: 393,
    width: 40,
    height: 40,
  },
  entrace: {
    top: -9,
    left: -49,
    width: 669,
    height: 242,
    position: "absolute",
  },
  ellipseIcon: {
    left: 1,
    width: 12,
    height: 12,
    top: 0,
    position: "absolute",
  },
  searchForPages: {
    fontSize: 14,
    color: Color.lightgray,
    width: 121,
    left: 26,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  search: {
    top: 160,
    left: 44,
  },
  mainscreenInner: {
    left: 65,
    top: 404,
    width: 125,
  },
  groupWrapper: {
    top: 63,
    left: 0,
  },
  mainscreenInner1: {
    left: 238,
    top: 404,
    width: 125,
  },
  vectorIcon: {
    height: "30.68%",
    width: "40.91%",
    top: "26.14%",
    right: "29.55%",
    bottom: "43.18%",
    left: "29.55%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  phonelandscapeIcon: {
    top: 20,
  },
  tabletIcon: {
    top: 17,
  },
  herramientas: {
    top: 362,
  },
  informesHechos: {
    top: 553,
  },
  mainscreen: {
    backgroundColor: "#fafafa",
    flex: 1,
    width: "100%",
    height: 850,
    overflow: "hidden",
  },
  input: {
    width: '75%',
    borderWidth: 1,
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    marginLeft: 10,
    paddingHorizontal: 10,
},
});

export default HomeScreen;