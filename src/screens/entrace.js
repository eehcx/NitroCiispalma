import React from 'react';
import buttonStyles from '../styles/buttonStyles';
import InputForms from '../styles/InputForms';

//REACT NATIVE Y TAILWIND CSS
import { StyleSheet, SafeAreaView, StatusBar, Alert, Button, ImageBackground, TouchableOpacity, Text, View } from 'react-native';
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
    carouselContainer: {
        position: 'relative',
        justifyContent: 'flex-end',
        marginTop: 150,
        bottom: 0,
        width: '100%',
        height: 370
    },
    slide: {
        width: 300,
        height: 300,
        padding: 20,
        marginRight: 100
    },
    heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fafafa'
    },
    caption: {
    fontSize: 25,
    color: '#fafafa'
    },
    indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
    },
    indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fafafa',
    marginHorizontal: 4
    },
    activeIndicator: {
    backgroundColor: '#6c9b6d'
    }
});

const InputScreen = ({ navigateToScreen }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <ImageBackground
                source={require('../assets/signup.jpg')}
                style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
            >
                <View style={styles.carouselContainer}>
                    <View style={styles.slide}>
                        <Text style={[styles.heading, { color: '#fafafa' }]}>Attention to the moment</Text>
                        <Text style={[styles.caption, { color: '#fafafa' }]}>Prompt service = happy customers.</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                        <TouchableOpacity style={[buttonStyles.button, { marginRight: 10 }]} onPress={() => navigateToScreen('login')}>
                            <Text style={buttonStyles.buttonText}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={buttonStyles.button_signup} onPress={() => navigateToScreen('signin')}>
                            <Text style={buttonStyles.buttonText_signup}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 30 }}>
                        <Text style={styles.entraceText}>Colabora con 
                            <Text style={{ fontWeight: '500' }}> Ciispalma</Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default InputScreen;