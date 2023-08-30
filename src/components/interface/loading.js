import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

export default Loading = () => {

    return (
        <View style={[styles.container, { backgroundColor: "#fafafa" }]}>
            <ActivityIndicator size="large" color="#82c491" />
            <Text style={{ marginTop: 4 }} variant='titleSmall' >Cargando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
