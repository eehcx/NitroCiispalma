import React, { useState, useEffect } from 'react';
import { TextInput, SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
// Componentes
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

export default EditInfo = ({ sliceFields, update, onUpdate }) => {
    // Estado de Carga de la página
    const [loading, setLoading] = useState(true);
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    const handleChange = (field, text) => {
        onUpdate({ ...update, [field]: text });
    };

    const renderInputs = () => {
        return Object.entries(sliceFields).map(([field, value], index) => {
            return (
                <React.Fragment key={index}>
                    <Text style={[Fonts.modalText, { marginRight: 200 }]}>{field}</Text>
                    <TextInput style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]} placeholder={value} value={update && update[field] !== undefined ? update[field] : ''} onChangeText={(text) => handleChange(field, text)} maxLength={50}  />
                </React.Fragment>
            );
        });
    };

    return (
    <>
        <StatusBar backgroundColor='#fafafa' />
        <SafeAreaView style={{ backgroundColor: '#fafafa', flex: 1 }}>
            <ScrollView onScroll={onScroll}>
                <View style={InputForms.container}>
                    <View style={InputForms.formContainer}>
                        {renderInputs()}
                    </View>
                </View>
            </ScrollView>
            <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}> Actualizar </Button>
        </SafeAreaView>
    </>
    );
};