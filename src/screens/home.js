import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Button, Text, BottomNavigation, Card } from 'react-native-paper';
import Octicons from '@expo/vector-icons/Octicons';
import { Color, Border, FontSize } from "../styles/GlobalStyles";

// Pantallas de la aplicación
import ProfileScreen from './profile';
import SettingsScreen from './settings';
import buttonStyles from '../styles/buttonStyles';

const Tab = createBottomTabNavigator();

export default MainBarScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error al verificar el estado de inicio de sesión:', error);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home" // Ruta por defecto al iniciar la aplicación
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="gear" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Octicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function HomeScreen() {
  const name = 'eehcx';
  return (
    <View style={styles.mainscreen}>
      <StatusBar backgroundColor='#58b06d' barStyle="light-content" />
      <View style={styles.entrace}>
        <View style={styles.fondo} />
        <Text style={styles.aurora}>{name}</Text>
        <View style={[styles.holaAuroraParent, styles.aviIconPosition]}>
          <Text style={[styles.holaAurora, styles.quVasAPosition]}>
            Hola {name},
          </Text>
          <Text style={[styles.quVasA, styles.quVasAPosition]}>
            ¿Qué vas a hacer hoy?
          </Text>
        </View>
      </View>
      <View style={[styles.search, styles.searchLayout]}>
        <View style={[styles.rectangle, styles.searchLayout]} />
        <View style={styles.groupParent}>
          <View style={styles.ellipseParent}>
            <View style={styles.groupChild} />
          </View>
          <Text style={styles.searchForPages}>{`Search For Pages`}</Text>
        </View>
      </View>
      <View style={[styles.mainscreenInner, styles.mainscreenInnerLayout]}>
        <View style={[styles.rectangleWrapper, styles.mainscreenInnerLayout]}>
          <View style={[styles.groupItem, styles.groupBg]} />
        </View>
      </View>
      <View style={[styles.mainscreenChild, styles.groupLayout]}>
        <View style={[styles.rectangleContainer, styles.groupLayout]}>
          <View style={[styles.groupInner, styles.groupLayout]} />
        </View>
      </View>
      <View style={styles.groupContainer}>
        <View style={[styles.rectangleContainer, styles.groupLayout]}>
          <View style={[styles.groupInner, styles.groupLayout]} />
        </View>
        <View style={[styles.groupWrapper, styles.groupLayout]}>
          <View style={[styles.rectangleContainer, styles.groupLayout]}>
            <View style={[styles.groupInner, styles.groupLayout]} />
          </View>
        </View>
      </View>
      <View style={[styles.mainscreenInner1, styles.mainscreenInnerLayout]}>
        <View style={[styles.rectangleWrapper, styles.mainscreenInnerLayout]}>
          <View style={[styles.groupItem, styles.groupBg]} />
        </View>
      </View>
      <View style={styles.secciones}>
        <View style={[styles.seccionesInner, styles.groupChildLayout]}>
          <View style={[styles.seccionesInner, styles.groupChildLayout]}>
            <View style={[styles.groupChild3, styles.groupChildLayout]} />
            <Text style={styles.mac}>Mac</Text>
          </View>
        </View>
        <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
          <View style={[styles.groupChild4, styles.groupChildLayout]} />
          <Text style={[styles.iphone, styles.ipadPosition]}>iPhone</Text>
        </View>
        <View style={[styles.rectangleParent1, styles.groupChildLayout]}>
          <View style={[styles.groupChild4, styles.groupChildLayout]} />
          <Text style={[styles.ipad, styles.ipadPosition]}>iPad</Text>
        </View>
      </View>
      <Text style={[styles.herramientas, styles.herramientasTypo]}>
        Herramientas
      </Text>
      <Text style={[styles.informesHechos, styles.herramientasTypo]}>
        Informes hechos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  searchLayout: {
    height: 50,
    width: 340,
    position: "absolute",
  },
  mainscreenInnerLayout: {
    height: 125,
    width: 125,
    position: "absolute",
  },
  groupBg: {
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_smi,
    left: 0,
  },
  groupLayout: {
    height: 55,
    width: 298,
    position: "absolute",
  },
  groupChildLayout: {
    width: 88,
    height: 88,
    top: 0,
    position: "absolute",
  },
  ipadPosition: {
    color: Color.gray_100,
    left: 24,
    alignItems: "center",
    display: "flex",
    fontSize: FontSize.size_xs,
    height: 14,
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
    color: Color.black,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
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
  rectangle: {
    borderRadius: 25,
    backgroundColor: Color.white,
    shadowColor: "rgba(182, 182, 182, 0.15)",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    left: 0,
    top: 0,
  },
  ellipseIcon: {
    left: 1,
    width: 12,
    height: 12,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    top: 11,
    left: 9,
    borderRadius: 3,
    backgroundColor: Color.lightgray,
    width: 2,
    height: 5,
    transform: [
      {
        rotate: "-45.72deg",
      },
    ],
    position: "absolute",
  },
  ellipseParent: {
    top: 1,
    width: 14,
    height: 14,
    left: 0,
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
  groupParent: {
    top: 16,
    width: 147,
    height: 21,
    left: 26,
    position: "absolute",
  },
  search: {
    top: 169,
    left: 44,
  },
  groupItem: {
    height: 125,
    width: 125,
    position: "absolute",
    top: 0,
  },
  rectangleWrapper: {
    left: 0,
    top: 0,
  },
  mainscreenInner: {
    left: 65,
    top: 404,
    width: 125,
  },
  groupInner: {
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_smi,
    left: 0,
    top: 0,
  },
  rectangleContainer: {
    left: 0,
    top: 0,
  },
  mainscreenChild: {
    top: 595,
    left: 65,
  },
  groupWrapper: {
    top: 63,
    left: 0,
  },
  groupContainer: {
    top: 659,
    height: 118,
    width: 298,
    left: 65,
    position: "absolute",
  },
  mainscreenInner1: {
    left: 238,
    top: 404,
    width: 125,
  },
  groupChild3: {
    backgroundColor: "#41525c",
    borderRadius: Border.br_smi,
    width: 88,
    left: 0,
  },
  mac: {
    left: 30,
    width: 40,
    alignItems: "center",
    display: "flex",
    fontSize: FontSize.size_xs,
    top: 50,
    height: 30,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
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
  seccionesInner: {
    left: 0,
  },
  groupChild4: {
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_smi,
    left: 0,
  },
  iphone: {
    width: 42,
    top: 54,
    left: 24,
    textAlign: "left",
  },
  phonelandscapeIcon: {
    top: 20,
  },
  rectangleGroup: {
    left: 105,
  },
  ipad: {
    top: 55,
    textAlign: "center",
    justifyContent: "center",
    width: 41,
  },
  tabletIcon: {
    top: 17,
  },
  rectangleParent1: {
    left: 210,
  },
  secciones: {
    top: 250,
    height: 88,
    width: 298,
    left: 65,
    position: "absolute",
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
});