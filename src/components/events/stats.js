import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
// Estilos globales
import buttonStyles from '../../styles/buttonStyles';
import InputForms from '../../styles/InputForms';

// Micros: elemento_ppm_mgkg
// Bases Intercambiables: Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg

export default StatsScreen = () => {
    // Navegación
    const [formularioActual, setFormularioActual] = useState(1);
    const handleSiguiente = () => { setFormularioActual(formularioActual + 1); };
    // Data
    const [uid, setUid] = useState('')
    const [NoMuestras, setNoMuestras] = useState('10')
    const [Elemento, setElemento] = useState('Boro (B)')

    const [selectedOption, setSelectedOption] = useState("Micros");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
                {formularioActual === 1 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Análisis</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Selecciona un tipo de Análisis</Text>
                        <View style={[styles.BoxContainer, { marginBottom: 120 }]}>
                            <View style={[styles.row]}>
                                <FilterButton icon="apps" text="Micros" marginLeft={-100} isSelected={selectedOption === "Micros"} backgroundColor="#ececec" onPress={() => filterContent("Micros")} />
                                <FilterButton icon="apps" text="Bases Interc." marginLeft={15} isSelected={selectedOption === "Bases Interc."} backgroundColor="#ececec" onPress={() => filterContent("Bases Interc.")} />
                            </View>
                        </View>
                        <Button icon="chevron-right"
                        buttonColor="#C7FBD7"
                        mode="contained-tonal" 
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ marginRight: 23 }}
                        onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                    </View>
                )}
                {formularioActual === 2 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>ID Cliente</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa el ID de tu Cliente</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                        placeholder="ID único del cliente" value={uid} onChangeText={setUid}
                        maxLength={50}/>
                        <Button icon="chevron-right"
                        buttonColor="#C7FBD7"
                        mode="contained-tonal" 
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ marginRight: 23 }}
                        onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                </View>
                )}
                {formularioActual === 3 && (
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>Micros: {Elemento}</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los datos de Micros ({NoMuestras} Muestras faltantes)</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        placeholder="Sample ID" maxLength={10}
                        keyboardType="numeric" />
                        <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                        placeholder="Ingresa el PPM"
                        maxLength={100}/>
                        <Button icon="chevron-right" buttonColor="#C7FBD7" mode="contained-tonal"  
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                        labelStyle={{ marginRight: 23 }} onPress={handleSiguiente}>
                            Siguiente Página
                        </Button>
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    datePicker: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
    },
    BoxContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        backgroundColor: '#ECECEC',
        width: 110,
        height: 110,
        borderRadius: 25
    },
    txtContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});