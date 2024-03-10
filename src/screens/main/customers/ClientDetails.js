import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
// Componentes
import InputText from '../../../components/common/Forms/InputText';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';

export default ClientDetails = ({}) => {
    // Redux
    const client = useSelector(state => state.client);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // Variables
    const [nombre, setNombre] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleUpdate = async () => {
        try {
            console.log('Informe actualizado...');
        } catch (error) {
            console.error('Error al obtener el informe:', error);
        }
    };

    useEffect(() => {
        const handleRedux = async () => {
            try {
                setNombre(client.Nombre);
                setRazonSocial(client.RazonSocial);
                setTelefono(client.Telefono);
            } catch (error) {
                console.error('Error al obtener el informe:', error);
            }
        };

        handleRedux();
    }, []);

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <SafeAreaView style={{ backgroundColor: '#fafafa', flex: 1 }}>
                <ScrollView onScroll={onScroll}>
                    <View style={InputForms.container}>
                        <View style={InputForms.formContainer}>
                            <InputText backgroundColor='#ECECEC' placeholder='Nombre del cliente' value={nombre} onChange={setNombre} label='Nombre' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Razón social' value={razonSocial} onChange={setRazonSocial} label='Empresa' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Número de telefono' value={telefono} onChange={setTelefono} label='Telefono' marginRight={200} />
                        </View>
                    </View>
                </ScrollView>
                <Button onPress={handleUpdate} mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> Actualizar </Button>
            </SafeAreaView>
        </>
    );
};