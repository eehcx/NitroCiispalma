import { View, TextInput, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';
// Estilos globales
import InputForms from '../../styles/InputForms';

export default AssignClient = ({ formTitle, formSubtitle, value, onChangeText, onPressButton, backgroundImageUri }) => {

    return (
        <>
            <ImageBackground source={{ uri: backgroundImageUri }} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <View style={InputForms.container}>
                    <View style={InputForms.formContainer}>
                        <Text style={InputForms.formTitle}>{formTitle}</Text>
                        <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 23 }} variant='headlineSmall'>{formSubtitle}</Text>
                        <TextInput
                            style={[InputForms.input, { marginBottom: 20 }, { height: 41, paddingLeft: 25 }]}
                            placeholder='ID del cliente'
                            value={value}
                            onChangeText={onChangeText}
                            maxLength={80}
                        />
                        <Button
                            icon="chevron-right"
                            buttonColor="#C7FBD7"
                            mode="contained-tonal"
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                            labelStyle={{ marginRight: 23 }}
                            onPress={onPressButton}
                        >
                            Asignar cliente
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};