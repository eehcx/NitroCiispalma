import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, List, TextInput, DataTable } from 'react-native-paper';
import AssignClient from '../interface/AssignUI';
import DataTableComponent from '../interface/DataTable';

// Micros: elemento_ppm_mgkg
// Bases Intercambiables: Ca_ppm_cmol_kg, K_ppm_cmol_kg, Mg_ppm_cmol_kg, Na_ppm_cmol_kg

export default ResultsScreen = () => {
    //
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [uid, setUid] = useState('');
    const [formularioActual, setFormularioActual] = useState(1);
    const handleSiguiente = () => { setFormularioActual(formularioActual + 1); };

    const data = [
        {
            key: '568',
            name: '568',
            calories: 356,
        },
        {
            key: '572',
            name: '572',
            calories: 262,
        },
        {
            key: '574',
            name: '574',
            calories: 159,
        }
    ];

    const headers = [
        { key: 1, title: 'IdLab', numeric: false },
        { key: 2, title: 'PPM', numeric: true },
        { key: 3, title: 'Resultado', numeric: true }
    ];

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
            {formularioActual === 2 && (
                <AssignClient formTitle='ID Cliente' formSubtitle='Asigna un cliente para esta sección' onPressButton={handleSiguiente}/>
            )}
            {formularioActual === 1 && (
                <View style={[{ flex: 1, backgroundColor: "#fafafa"}]}>
                    <List.Section title="Elementos">
                        {/*left={props => <List.Icon {...props} icon="calculator" />} */}
                        <List.Accordion title="Boro" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Cobre" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Fierro" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Manganecio" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Fósforo" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Azufre" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                        <List.Accordion title="Zinc" >
                            <DataTableComponent data={data} headers={headers} />
                        </List.Accordion>
                    </List.Section>
                </View>
            )}
        </View>
    );
};