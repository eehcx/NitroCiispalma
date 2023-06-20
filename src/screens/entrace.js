import React from 'react';

//REACT NATIVE Y TAILWIND CSS
import { StyleSheet, SafeAreaView, StatusBar, Alert, Button, ImageBackground, TouchableOpacity, Text, View } from 'react-native';
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
});

const InputScreen = ({ navigateToScreen }) => {
    return (
        
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text>InputScreen</Text>
        </View>
    );
};

export default InputScreen;
