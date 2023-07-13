import * as React from 'react';
import { Avatar, Text, Card, Appbar  } from 'react-native-paper';
import { View, StyleSheet, StatusBar } from 'react-native';

const ProfileScreen = ({ navigateToScreen }) => {
    const avi = 'AU';
    const name = 'Aurora';
    const  email = 'aurora@ciispalma.com';
    return (
        <View style={styles.content}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <Appbar.Header style={{ backgroundColor: '#fafafa' }}>
                <Appbar.Content title="My Profile" />
            </Appbar.Header>
            <View style={styles.content}>
                <Card elevation={0} style={{ borderRadius: 0 }}>
                    <Card.Cover source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/ciispalma.jpg?alt=media&token=5e929e97-bfe4-4fd0-850d-c607f5448794' }} 
                    style={{ borderRadius: 0, width: '100%',height: 150 }}/>
                </Card>
                <View style={styles.content}>
                    <View style={styles.innerContent}>
                        <Avatar.Text size={70} label={avi} style={{ marginTop: -35 }} />
                        <Text style={styles.ProfileName } variant="headlineMedium">{name}</Text>
                        <Text style={styles.ProfileName } variant="headlineSmall">{email}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 20
    },
    ProfileName: {
        marginTop: 5,
    }
});

export default ProfileScreen;
