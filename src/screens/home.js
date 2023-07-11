import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Button, Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
              <Icon name="settings" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});