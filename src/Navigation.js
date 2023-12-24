import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingScreen from './screens/initials/auth/redirect';
import InputScreen from './screens/initials/entrace';
import LoginScreen from './screens/initials/auth/login'
import SigninScreen from './screens/initials/auth/signin';

import HomeScreen from './screens/main/home';
import ProfileScreen from './screens/main/profile';
import CalculatorScreen from './screens/calculator';

// Customer Screens
import CustomersScreen from './screens/main/customers';
import CustomersList from './screens/main/customers/CustomersList';
import RegisterCustomer from './screens/main/customers/forms/NewCustomer';
import RegisterInform from './screens/main/customers/forms/NewInform';
import InformDetails from './screens/main/customers/InformDetails';
import ClientDetails from './screens/main/customers/ClientDetails';
import RegisterPackage from './screens/main/packages/PackageList';
import PackageDetails from './screens/main/packages/PackageDetails';
import NewPackage from './screens/main/packages/forms/NewPackage';

import UserInformationScreen from './screens/main/profile/UserInfo';
import ApplicationDataScreen from './screens/main/profile/privacity';

// Calculator
import BoroDetails from './screens/main/calculator/Details/BoroDetails';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const UserDataStack = createStackNavigator();
const navigationRef = React.createRef();
const Tab = createBottomTabNavigator();

// Autentificación 
const AuthScreens = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="entrace" component={InputScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="signin" component={SigninScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
);

const UserScreens = () => (
    <UserDataStack.Navigator>
        <UserDataStack.Screen name="userData" component={UserInformationScreen} options={{ title: 'Editar Perfil', headerStyle: { backgroundColor: '#fafafa' } }}/>
    </UserDataStack.Navigator>
);

// Barra de navegación 
const MainBarScreen=()=>{
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false, tabBarActiveTintColor: '#41525C', tabBarInactiveTintColor: '#ccc', tabBarStyle: { display: 'flex', backgroundColor: '#fafafa', paddingVertical: 15, elevation: 0, height:65,  elevation: 0, shadowOpacity: 0 } }} >
            <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="home" size={27} color={color} /> }}/>
            <Tab.Screen name="customers" component={CustomersScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="inbox" size={27} color={color} /> }}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Icon name="person" size={27} color={color} /> }}/>
        </Tab.Navigator>
    );
};

// Funcion principal de la aplicación
export default function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="auth" component={AuthScreens} options={{ headerShown: false }} />
                <Stack.Screen name="main" component={MainBarScreen} options={{ headerShown: false }} />
                <Stack.Screen name="user" component={UserScreens} options={{ headerShown: false }} />
                <Stack.Screen name="calculator" component={CalculatorScreen} options={{ headerShown: false }} />
                <Stack.Screen name="boroDetails" component={BoroDetails} options={{ title: 'Ver fórmula', headerStyle: { backgroundColor: '#fafafa' }  }}/>
                <Stack.Screen name="InformDetails" component={InformDetails} options={{ title: 'Modal de edición', headerStyle: { backgroundColor: '#fafafa' }  }} />
                <Stack.Screen name="registerCustomer" component={RegisterCustomer} options={{ title: 'Agrega un cliente nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="registerInform" component={RegisterInform} options={{ headerShown: false }}/>
                <Stack.Screen name="registerPackage" component={RegisterPackage} options={{ title: 'Lista de paquetes', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="PackageDetails" component={PackageDetails} options={{ title: 'Modal de edición', headerStyle: { backgroundColor: '#fafafa' }  }} />
                <Stack.Screen name="ClientDetails" component={ClientDetails} options={{ title: 'Modal de edición', headerStyle: { backgroundColor: '#fafafa' }  }} />
                <Stack.Screen name="newPackage" component={NewPackage} options={{ title: 'Agrega un paquete nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="customerList" component={CustomersList} options={{ headerShown: false }}/>
                <Stack.Screen name="appData" component={ApplicationDataScreen} options={{ title: 'Políticas y Privacidad', headerStyle: { backgroundColor: '#fafafa' },}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};