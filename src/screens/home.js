import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Text, Avatar, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
// React Navigation
import { useNavigation } from '@react-navigation/native';
// Boton de filtro
import FilterButton from '../components/interface/filterButton';

const WorkFlowContent = () => {
  const navigation = useNavigation();
  const handleNavigateToCalc = () => { navigation.navigate('calculator'); };
  const handleNavigateToCustomers = () => { navigation.navigate('customers'); };

  return (
      <View style={[styles.containerTools, { marginHorizontal:50, marginTop: 150 }]}>
          <TouchableHighlight activeOpacity={0.7} underlayColor="#ccc" onPress={handleNavigateToCalc} style={styles.groupItem}>
              <View style={[styles.containerIco]}>
                <Image  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/calc.png?alt=media&token=a2cab502-0b0a-44b4-a071-c9dea74a1c2d' }} style={styles.imagesTools}/>
              </View>
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={0.7} underlayColor="#ccc" onPress={handleNavigateToCustomers} style={[styles.groupItem, { marginLeft: 190 }]}>
              <View style={styles.containerIco}>
                <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/inf.png?alt=media&token=03bedbd6-a3f2-4062-8d83-4661c3698860' }} style={styles.imagesTools}/>
              </View>
          </TouchableHighlight> 
      </View>
  );
}

const HistoryContent = ({ marginTop }) => {
  const navigation = useNavigation();
  const handleNavigateToHistory = () => { navigation.navigate('history'); };
  return (
      <TouchableOpacity onPress={handleNavigateToHistory} style={[styles.groupLayout, { marginTop, marginLeft:50, borderRadius: 25 }]}>
          <ImageBackground source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/09/19/09/shares-5279686_1280.jpg' }} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', borderRadius: 10, overflow: 'hidden', }} >
              <View style={styles.containerIco}>
                  <Octicons style={styles.iconContent} name="history" size={35} color='#333' />
              </View>
          </ImageBackground>
      </TouchableOpacity>
  );
}

const HomeScreen = () => {
  // Navegación entre páginas
  const [selectedOption, setSelectedOption] = useState("Todo");
  // Hooks para el estado de la aplicación
  const [displayName, setDisplayName] = useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const getFirstName = (displayName) => {
    const names = displayName.split(' ');
    return names[0];
  };

  // Función para filtrar el contenido según el botón seleccionado
  const filterContent = (option) => { setSelectedOption(option); };

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
        console.log('No hay un usuario');
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
    <View style={[styles.mainscreen]}>
      <StatusBar backgroundColor='#ececec' barStyle="dark-content" />

        <View style={[styles.entrace]}>
          <View style={styles.fondo} />
            <Text style={styles.txtTitle}>{displayName}</Text>
          <View style={[styles.ContainerStateTitle]}>
            <Text variant='titleMedium' style={[styles.txtState, { fontSize: 20 } ]}> Hola {displayName}, </Text>
            <Text variant='titleSmall' style={[styles.txtState, { top: 31, fontSize: 16, letterSpacing: 0.3 }]}> ¿Qué vas a hacer hoy? </Text>
            <Avatar.Text size={50} label={displayName.toUpperCase().substring(0, 1)} style={styles.avatar} />
          </View>
        </View>

        <View style={[styles.search]}>
          <Searchbar style={styles.input} placeholder="Search for pages" onChangeText={onChangeSearch} value={searchQuery} />
        </View>

        <View style={styles.secciones}>
          <FilterButton icon="apps" text="Todo" isSelected={selectedOption === "Todo"} backgroundColor="#ececec" onPress={() => filterContent("Todo")} />
          <FilterButton icon="workflow" text="Flujos" isSelected={selectedOption === "Flujos"} backgroundColor="#ececec" marginLeft={115} onPress={() => filterContent("Flujos")} />
          <FilterButton icon="database" text="Historial" isSelected={selectedOption === "Historial"} backgroundColor="#ececec" marginLeft={230} onPress={() => filterContent("Historial")} />
        </View>

        <>
          {selectedOption === "Todo" && (
            <>
              <HistoryContent marginTop={570} />
              <WorkFlowContent />
            </>
          )}
          {selectedOption === "Flujos" && <WorkFlowContent />}
          {selectedOption === "Historial" && <HistoryContent marginTop={420} />}
        </>

    </View>
  );
}

const styles = StyleSheet.create({
  // ENTRADA DE LA APP
  entrace: { marginLeft:-50, width: 2000, height: 240, position: "absolute"},
  fondo: { backgroundColor: "#58b06d", width: "100%", height: 186, position: "absolute" },
  txtTitle: { fontSize: 200, fontWeight: "700", color: "rgba(130, 196, 145, 0.5)", textAlign: "left", top: -50, position: "absolute"},
  ContainerStateTitle: { top: 35, left: 100, width: 150, height: "100%" },
  txtState:{ color: "rgba(255,255,255,1)", textAlign: "left", position: "absolute" },
  // Estilos de las secciones o filtros
  secciones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 250, marginHorizontal: 50 },
  // Estilos generales
  mainscreen: { backgroundColor: "#fafafa", flex: 1, width: "100%", height: 850, overflow: "hidden" },
  avatar: { backgroundColor: '#ECECEC', marginLeft: 270, borderColor: '#ccc' },
  // Estilos del buscador
  search: { top: 160, left: 35 },
  input: { width: '80%', borderWidth: 1, backgroundColor: '#ECECEC', borderColor: '#ECECEC', marginLeft: 10, paddingHorizontal: 10 },
  // COMPONENTS
  groupLayout: { height: 55, width: 315, position: "absolute", backgroundColor: "#ececec", borderRadius: 13 },
  containerIco:{ flex: 1,flexDirection: 'row', justifyContent: 'center',alignItems: 'center' },
  iconContent:{ justifyContent: 'center', alignItems: 'center' },
  containerTools:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  imagesTools: { borderRadius: 13, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' },
  // Contenedor de los flujos de la app
  groupItem: { height: 125, width: 125, position: "absolute", backgroundColor: "#ececec", borderRadius: 13 },
});

export default HomeScreen;