import React, { } from 'react';
// React Native Paper
import { FAB, Portal } from 'react-native-paper';
// React Navigation
import { useNavigation } from '@react-navigation/native';

// Pagina de listado de clientes
export default FABGroups = () => {
    // Navegación
    const navigation = useNavigation();
    const handleNavigateToNewCustomer = () => { navigation.navigate('registerCustomer'); };
    const handleNavigateToInforms = () => { navigation.navigate('registerInform'); };
    const handleNavigateToPackage = () => { navigation.navigate('registerPackage'); }

    // FAB Hooks
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    return (
        <>
            <Portal>
                <FAB.Group open={open} color='#fafafa' visible fabStyle={{ backgroundColor:"#41525C" }} rippleColor="#fafafa" icon={open ? 'plus' : 'plus'}
                actions={[
                    { color:'#f1f1f1', icon: 'archive', label: 'Paquetes', onPress: handleNavigateToPackage, style: { backgroundColor: '#41525C' } },
                    { color:'#f1f1f1', icon: 'account-plus', label: 'Clientes', onPress: handleNavigateToNewCustomer, style: { backgroundColor: '#41525C' } },
                    { color:'#f1f1f1', icon: 'file-plus', label: 'Informes', onPress: handleNavigateToInforms, style: { backgroundColor: '#41525C' } },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) { 
                        // do something if the speed dial is open
                    }
                }}
                />
            </Portal>
        </>
    );
};