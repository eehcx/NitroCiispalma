import { StyleSheet, StatusBar, TextInput, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import Fonts from '../../../styles/Fonts';

export default ApplicationDataScreen = () => {

    return (
        <>
            <StatusBar backgroundColor='#ECECEC' />
            <SafeAreaView style={{ backgroundColor: "#fafafa"}} >
                <ScrollView>
                    <View style={{ padding:25 }}>
                        <Text style={[Fonts.modalText]}>Políticas de cancelación</Text>
                        <Text style={[Fonts.normalText, { textAlign: 'justify', color: '#67757d' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        <Text style={[Fonts.normalText, { textAlign: 'justify', color: '#67757d' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </Text>
                        <Text style={[Fonts.modalText, {paddingTop: 25}]}>Términos y Condiciones</Text>
                        <Text style={[Fonts.normalText, { textAlign: 'justify', color: '#67757d' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                        </Text>
                        <Text style={[Fonts.normalText, { textAlign: 'justify', color: '#67757d' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </View>
                    <Button  mode="contained" style={[Fonts.buttonTitle,{ backgroundColor: '#41525C', margin: 25}]}>
                        Aceptar Términos
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};