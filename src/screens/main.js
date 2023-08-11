import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from '@expo/vector-icons/Octicons';
// Pantallas de la aplicación
import ProfileScreen from './profile';
import HomeScreen from './home';

const Tab = createBottomTabNavigator();

export default MainBarScreen = () => {

    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false, tabBarActiveTintColor: '#333', tabBarInactiveTintColor: '#ccc', tabBarStyle: { display: 'flex', backgroundColor: '#f5f5f5', paddingVertical: 15, elevation: 0, height:70,  elevation: 0, shadowOpacity: 0 } }} >
            <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Inicio', tabBarIcon: ({ color }) => <Octicons name="home" size={25} color={color} /> }}/>
            <Tab.Screen name="profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color }) => <Octicons name="person" size={25} color={color} /> }}/>
        </Tab.Navigator>
    );
};