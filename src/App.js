import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pantallas de la aplicación
import LoadingScreen from './utils/auth/redirect';
import InputScreen from './screens/entrace';
import LoginScreen from './utils/auth/login';
import MainScreen from './screens/main'
import HomeScreen from './screens/home';
import SignipScreen from './utils/auth/signin';
import ProfileScreen from './screens/profile';
import CalculatorScreen from './screens/calculator';
import HistoryScreen from './screens/history';
import CustomersScreen from './screens/customers';
import RegisterCustomer from './components/events/NewCustomer';
import RegisterInform from './components/events/NewInform';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

// Funcion principal de la aplicación
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="entrace" component={InputScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="signin" component={SignipScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="calculator" component={CalculatorScreen} options={{ title: 'Calculadora', headerShown: false}}/>
        <Stack.Screen name="history" component={HistoryScreen} options={{ title: 'Historial de cálculos' }}/>
        <Stack.Screen name="customers" component={CustomersScreen} options={{ title: 'Clientes', headerStyle: { backgroundColor: '#fafafa' } }}/>
        <Stack.Screen name="registerCustomer" component={RegisterCustomer} options={{ title: 'Agrega un cliente nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
        <Stack.Screen name="registerInform" component={RegisterInform} options={{ title: 'Agrega un informe nuevo', headerStyle: { backgroundColor: '#fafafa' },}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};