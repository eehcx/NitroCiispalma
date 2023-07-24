import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Button, Text, BottomNavigation, Card } from 'react-native-paper';
import Octicons from '@expo/vector-icons/Octicons';
// Pantallas de la aplicación
import ProfileScreen from './profile';
import HomeScreen from './home';

const Tab = createBottomTabNavigator();

export default MainBarScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Tab.Navigator
        initialRouteName="home"
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
    );
};