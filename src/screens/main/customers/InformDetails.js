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
// Servicios
import { getInforme , updateInforme } from '../../../services/informes';

export default InformDetails = ({}) => {
    // Redux
    const informId = useSelector(state => state.inform.informId);
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

    const params = {
        no_muestras,
        observaciones,
        procedencia,
        tipo_cultivo,
    };

    const handleUpdate = async () => {
        try {
            updateInforme(informId, params );
            console.log('Informe actualizado...');
        } catch (error) {
            console.error('Error al obtener el informe:', error);
        }
    };

    useEffect(() => {
        const obtenerDatosInforme = async () => {
            try {
                const [informe, resultados] = await getInforme(informId);
                console.log('Informes \n',informe, '\n Resultados \n',resultados);
                setResultados({resultados});

                if (resultados) {
                    setNoMuestras(informe.no_muestras);
                    setObservaciones(informe.observaciones);
                    setProcedencia(informe.procedencia);
                    setTipoCultivo(informe.tipo_cultivo);
                }
            } catch (error) {
                console.error('Error al obtener el informe:', error);
            }
        };
    
        obtenerDatosInforme();
    }, []);

    return (
        <>
            <StatusBar backgroundColor='#fafafa' />
            <SafeAreaView style={{ backgroundColor: '#fafafa', flex: 1 }}>
                <ScrollView onScroll={onScroll}>
                    <View style={InputForms.container}>
                        <View style={InputForms.formContainer}>
                            <InputText backgroundColor='#ECECEC' placeholder='No. Muestras' value={no_muestras} onChange={setNoMuestras} label='No. Muestras' marginRight={170} />
                            <InputText backgroundColor='#ECECEC' placeholder='Escribir las observaciones' value={observaciones} onChange={setObservaciones} label='Observaciones' marginRight={160} />
                            <InputText backgroundColor='#ECECEC' placeholder='Escribir una procedencia' value={procedencia} onChange={setProcedencia} label='Procedencia' marginRight={170} />
                            <InputText backgroundColor='#ECECEC' placeholder='Escribir un Tipo de cultivo' value={tipo_cultivo} onChange={setTipoCultivo} label='Tipo cultivo' marginRight={180} />
                        </View>
                    </View>
                </ScrollView>
                <Button onPress={handleUpdate} mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> Actualizar </Button>
            </SafeAreaView>
        </>
    );
};