import React, { useState, useEffect } from 'react';
import { View, StatusBar, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
// Estilos globales
import InputForms from '../../styles/InputForms';
import Fonts from '../../styles/Fonts'; 
// Firebase
import { getDatabase, ref, onValue, off, get, push, set, child } from 'firebase/database';
import { app } from '../../utils/firebase';
// Micros: elemento_ppm_mgkg
// Bases Intercambiables: Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg
import { elemento_ppm_mgkg, Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg } from '../../utils/helpers';
import { saveRegistersMicros, saveMicros } from '../../utils/services/setService';

const Micros = ({ SampleId, setSampleId, NoMuestras, Elemento, ppm, setppm, onPress }) => {

    return(
        <>
            <View style={InputForms.formContainer}>
                <Text style={[Fonts.formTitle]}>Micros: {Elemento}</Text>
                <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los datos de Micros ({NoMuestras} Muestras faltantes)</Text>
                <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                placeholder="Sample ID" maxLength={10} value={SampleId} onChangeText={setSampleId} keyboardType="numeric" />
                <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]} value={ppm} onChangeText={setppm} keyboardType="numeric" placeholder="Ingresa el PPM" maxLength={100}/>
                <Button icon="chevron-right" buttonColor="#C7FBD7" mode="contained-tonal"  
                contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                labelStyle={{ marginRight: 23 }} onPress={onPress}>
                    Siguiente Página
                </Button>
            </View>
        </>
    )
}

const BasesInterc = ({SampleId, setSampleId, NoMuestras, Elemento, ppm, setppm, onPress}) => {

    return(
        <>
            <View style={InputForms.formContainer}>
                <Text style={[Fonts.formTitle]}>Bases Intercambiables: {Elemento}</Text>
                <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa los datos de Bases Intercambiables ({NoMuestras} Muestras faltantes)</Text>
                <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]}
                placeholder="Sample ID" maxLength={10} value={SampleId} onChangeText={setSampleId} keyboardType="numeric" />
                <TextInput style={[InputForms.input, { marginBottom: 20, height: 41, paddingLeft: 25  }]} value={ppm} onChangeText={setppm} keyboardType="numeric" placeholder="Ingresa el PPM" maxLength={100}/>
                <Button icon="chevron-right" buttonColor="#C7FBD7" mode="contained-tonal"  
                contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                labelStyle={{ marginRight: 23 }} onPress={onPress}>
                    Siguiente Página
                </Button>
            </View>
        </>
    )
}

export default StatsScreen = () => {
    // Navegación
    const [formularioActual, setFormularioActual] = useState(1);
    const handleSiguiente = () => { setFormularioActual(formularioActual + 1); };
    // Data
    const [uid, setUid] = useState('') // UID del cliente
    const [calculoId, setCalculoId] = useState('') // ID del cálculo
    const [MicrosId, setMicrosId] = useState('') // ID de los micros
    const [SampleId, setSampleId] = useState('') // ID de la muestra
    const [ppm, setppm] = useState('') // PPM del elemento
    const [SampleNumber, setSampleNumber] = useState('' ) 
    const [NoMuestras, setNoMuestras] = useState('') // Número de muestras del informe
    

    const elementBase =  ["Calcio", "Magnesio", "Potasio", "Sodio"]
    const [indexElemetBase, setIndexElemetBase] = useState(0);
    const [elementBaseSeleccionado, setElementBaseSeleccionado] = useState(elementBase[0]); // Inicializar con el primer elemento

    const elementos = ["Boro", "Cobre", "Fierro", "Manganecio", "Fósforo", "Azufre", "Zinc"];
    const [indiceElemento, setIndiceElemento] = useState(0);
    const [elementoSeleccionado, setElementoSeleccionado] = useState(elementos[0]); // Inicializar con el primer elemento
    const [resgistrosBase, setRegistrosBase] = useState([]); // Inicializar con el primer elemento

    const AddBase = () => {
        const db = getDatabase(app);
        const IdCalculo = calculoId;
        console.log('UID CALC:'+IdCalculo);
        // convertir NoMuestras a entero
        const noMuestras = parseInt(NoMuestras);
        if (noMuestras > 0) {
            const SampleUpdated = noMuestras - 1;

            const nuevoRegistro = {
                elemento: elementBase[indexElemetBase],
                sampleId: SampleId,
                ppm: ppm,
            };

            // Crear un nuevo arreglo con el nuevo registro en el índice 1
            const nuevosRegistrosBases = [
                ...resgistrosBase, // Mantener los registros existentes
                nuevoRegistro,      // Agregar el nuevo registro
            ];

            setRegistrosMicros(nuevosRegistrosBases);
            console.log(nuevosRegistrosBases);

            // Actualizar el valor de NoMuestras en el estado
            setNoMuestras(SampleUpdated.toString());
            setSampleId('');
            setppm('');
        } else {
            console.log("No hay más muestras disponibles.");

            const promedioPPM = 1.439;

            const registrosActualizados = registrosMicros.map(registro => {
                const mgkg = Ca_cmol_kg(parseFloat(registro.ppm), promedioPPM);
                return {
                    ...registro,
                    mgkg: mgkg,
                };
            });
            console.log(registrosActualizados);

            // Pasar al siguiente elemento o reiniciar si todos los elementos se han procesado
            if (indiceElemento < elementos.length - 1) {
                setElementoSeleccionado(elementos[indiceElemento + 1]);
                setIndiceElemento(indiceElemento + 1);
                setRegistrosMicros([]);
                setNoMuestras(SampleNumber);
                setSampleId('');
                setppm('');
            } else {
                console.log("Se han procesado todos los elementos.");
                setFormularioActual(formularioActual + 1);
            }
        }
    };

    // Consulta
    const handleConsultation = () => {
        const db = getDatabase(app);
        const informesRef = ref(db, `clientes/${uid}/informes`);
        onValue(informesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const informesArray = Object.keys(data).map((informeKey) => ({
                    id: informeKey,
                    no_muestras: data[informeKey].no_muestras,
                    ...data[informeKey],
                }));

                const lastInformeKey = informesArray[informesArray.length - 1].id;
                const ultimoInforme = informesArray[informesArray.length - 1];
                const noMuestras = ultimoInforme.no_muestras;
                setNoMuestras(noMuestras);
                setSampleNumber(noMuestras);
                console.log(noMuestras);

                const informeResultadosRef = ref(db, `clientes/${uid}/informes/${lastInformeKey}/informe_resultados`);
                onValue(informeResultadosRef, (resultadosSnapshot) => {
                    const resultadosData = resultadosSnapshot.val();
                    setCalculoId(resultadosData.uid);
                    if (resultadosData) {
                        console.log(resultadosData);

                        if (Array.isArray(resultadosData) && resultadosData.length > 0) {
                            const primerRegistro = resultadosData[0];
                            const primerUid = primerRegistro.uid;
                            setCalculoId(primerUid);
                        }
                    }
                });
                setFormularioActual(formularioActual + 1);
            } else {
                setFormularioActual(formularioActual - 1);
            }
        });
    };
    console.log('UID CALC:'+calculoId);

    // Micros
    const [registrosMicros, setRegistrosMicros] = useState([]);

    const AddMicros = () => {
        const db = getDatabase(app);
        const IdCalculo = calculoId;
        console.log('UID CALC:'+IdCalculo);
        // convertir NoMuestras a entero
        const noMuestras = parseInt(NoMuestras);
        if (noMuestras > 0) {
            const SampleUpdated = noMuestras - 1;

            const nuevoRegistro = {
                elemento: elementos[indiceElemento],
                sampleId: SampleId,
                ppm: ppm,
            };

            // Crear un nuevo arreglo con el nuevo registro en el índice 1
            const nuevosRegistrosMicros = [
                ...registrosMicros, // Mantener los registros existentes
                nuevoRegistro,      // Agregar el nuevo registro
            ];

            setRegistrosMicros(nuevosRegistrosMicros);
            console.log(nuevosRegistrosMicros);

            // Actualizar el valor de NoMuestras en el estado
            setNoMuestras(SampleUpdated.toString());
            setSampleId('');
            setppm('');
        } else {
            console.log("No hay más muestras disponibles.");

            /*  const sumaPPM = registrosMicros.reduce((sum, registro) => sum + parseFloat(registro.ppm), 0);
                const promedioPPM = sumaPPM / registrosMicros.length;*/
            const promedioPPM = 0.068;

            // Aplicar la función de cálculo y agregar el campo mgkg a cada registro
            const registrosActualizados = registrosMicros.map(registro => {
                const mgkg = elemento_ppm_mgkg(parseFloat(registro.ppm), promedioPPM); // (parseFloat(registro.ppm), promedioPPM)
                return {
                    ...registro,
                    mgkg: mgkg,
                };
            });
            console.log(registrosActualizados);

            // Llamada a la función para guardar los registros
            saveRegistersMicros(calculoId, registrosActualizados, elementos) //elementoSeleccionado

            // Pasar al siguiente elemento o reiniciar si todos los elementos se han procesado
            if (indiceElemento < elementos.length - 1) {
                setElementoSeleccionado(elementos[indiceElemento + 1]);
                setIndiceElemento(indiceElemento + 1);
                setRegistrosMicros([]);
                setNoMuestras(SampleNumber);
                setSampleId('');
                setppm('');
            } else {
                console.log("Se han procesado todos los elementos.");
                setFormularioActual(formularioActual + 1);
            }
        }
    };

    const [selectedOption, setSelectedOption] = useState("Micros");
    const filterContent = (option) => { setSelectedOption(option); };

    return (
        <View style={{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
                {formularioActual === 1 && (
                    <View style={InputForms.formContainer}>
                        <Text style={[Fonts.formTitle]}>Análisis</Text>
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
                        <Text style={[Fonts.formTitle]}>ID Cliente</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall' >Ingresa el ID de tu Cliente</Text>
                        <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder="ID único del cliente" value={uid} onChangeText={setUid} maxLength={50}/>
                        <Button icon="chevron-right" buttonColor="#C7FBD7" mode="contained-tonal"  contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }} labelStyle={{ marginRight: 23 }} onPress={handleConsultation}>
                            Siguiente Página
                        </Button>
                </View>
                )}
                {formularioActual === 3 && (
                    <>
                        {selectedOption === "Micros" && (
                            <Micros NoMuestras={NoMuestras} Elemento={elementoSeleccionado} onPress={AddMicros} SampleId={SampleId} setSampleId={setSampleId} ppm={ppm} setppm={setppm} />
                        )}
                        {selectedOption === "Bases Interc." && (
                            <BasesInterc NoMuestras={NoMuestras} SampleId={SampleId} setSampleId={setSampleId} ppm={ppm} setppm={setppm}  onPress={AddBase} Elemento={elementBaseSeleccionado} />
                        )}
                        
                    </>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    datePicker: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 4, padding: 10 },
    BoxContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    box: { backgroundColor: '#ECECEC', width: 110, height: 110, borderRadius: 25 },
    txtContainer:{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
});