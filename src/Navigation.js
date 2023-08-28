import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from '@expo/vector-icons/Octicons';

// Pantallas de la aplicación
import LoadingScreen from './utils/auth/redirect';
import InputScreen from './screens/entrace';
import LoginScreen from './utils/auth/login';
import HomeScreen from './screens/home';
import SignipScreen from './utils/auth/signin';
import ProfileScreen from './screens/profile';
import CalculatorScreen from './screens/calculator';
import HistoryScreen from './screens/history';
import CustomersScreen from './screens/customers';
import RegisterCustomer from './components/events/NewCustomer';
import RegisterInform from './components/events/NewInform';
import ResultsScreen from './components/events/results';
import StatsScreen from './components/events/stats';
import UserInformationScreen from './components/events/UserData/UserInfo';
import ApplicationDataScreen from './components/events/appData/privacity';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const UserDataStack = createStackNavigator();
const navigationRef = React.createRef();
const Tab = createBottomTabNavigator();

const AuthScreens = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="entrace" component={InputScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="signin" component={SignipScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
);

const UserScreens = () => (
    <UserDataStack.Navigator>
        <UserDataStack.Screen name="userData" component={UserInformationScreen} options={{ title: 'Datos de usuario', headerStyle: { backgroundColor: '#fafafa' } }}/>
    </UserDataStack.Navigator>
);

const MainBarScreen=()=>{
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false, tabBarActiveTintColor: '#333', tabBarInactiveTintColor: '#ccc', tabBarStyle: { display: 'flex', backgroundColor: '#fafafa', paddingVertical: 15, elevation: 0, height:65,  elevation: 0, shadowOpacity: 0 } }} >
            <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Octicons name="home" size={27} color={color} /> }}/>
            <Tab.Screen name="results" component={ResultsScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Octicons name="search" size={27} color={color} /> }}/>
            <Tab.Screen name="customers" component={CustomersScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Octicons name="inbox" size={27} color={color} /> }}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{ tabBarLabel: '', tabBarIcon: ({ color }) => <Octicons name="person" size={27} color={color} /> }}/>
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

                <Stack.Screen name="calculator" component={CalculatorScreen} options={{ title: 'Calculadora', headerShown: false}}/>
                <Stack.Screen name="history" component={HistoryScreen} options={{ title: 'Historial de cálculos', headerStyle: { backgroundColor: '#fafafa' } }}/>
                <Stack.Screen name="registerCustomer" component={RegisterCustomer} options={{ title: 'Agrega un cliente nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="registerInform" component={RegisterInform} options={{ title: 'Agrega un informe nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="stats" component={StatsScreen} options={{ title: 'Estadísticas', headerStyle: { backgroundColor: '#fafafa' },}}/>
                <Stack.Screen name="appData" component={ApplicationDataScreen} options={{ title: 'Politicas y Privacidad', headerStyle: { backgroundColor: '#fafafa' },}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};