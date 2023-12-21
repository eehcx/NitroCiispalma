import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
// Componentes
import InputText from '../../../components/interface/Forms/InputText';
// Styles
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';
// Redux
import { useDispatch, useSelector } from 'react-redux';

export default ClientDetails = ({}) => {
    // Redux
    const client = useSelector(state => state.client);
    const [Resultados, setResultados] = useState(null);
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };
    // Variables
    const [no_muestras, setNoMuestras] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [procedencia, setProcedencia] = useState('');
    const [tipo_cultivo, setTipoCultivo] = useState('');

    const handleUpdate = async () => {
        try {
            console.log('Informe actualizado...');
        } catch (error) {
            console.error('Error al obtener el informe:', error);
        }
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <SafeAreaView style={{ backgroundColor: '#fafafa', flex: 1 }}>
                <ScrollView onScroll={onScroll}>
                    <View style={InputForms.container}>
                        <View style={InputForms.formContainer}>
                            <InputText backgroundColor='#ECECEC' placeholder='Nombre del cliente' value={client.Nombre} label='Nombre' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Razón social' value={client.RazonSocial} label='Empresa' marginRight={200} />
                            <InputText backgroundColor='#ECECEC' placeholder='Número de telefono' value={client.Telefono} label='Telefono' marginRight={200} />
                        </View>
                    </View>
                </ScrollView>
                <Button onPress={handleUpdate} mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> Actualizar </Button>
            </SafeAreaView>
        </>
    );
};