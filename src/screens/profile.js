import * as React from 'react';
import { Avatar, Text  } from 'react-native-paper';
import { View, StyleSheet, StatusBar } from 'react-native';

const ProfileScreen = ({ navigateToScreen }) => {
    const avi = 'AU';
    const name = 'Aurora';
    const  email = 'aurora@ciispalma.com';
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View style={styles.content}>
                <View style={styles.innerContent}>
                    <Avatar.Text size={60} label={avi} />
                    <Text style={styles.ProfileName } variant="headlineMedium">Mi perfil</Text>
                    <Text style={styles.ProfileName } variant="titleLarge">{email}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'e6e6fa',
    },
    ProfileName: {
        marginTop: 20,
    }
});

export default ProfileScreen;
