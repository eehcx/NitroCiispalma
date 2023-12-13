import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

export default Loading = () => {

    return (
        <View style={[{ backgroundColor: "#fafafa", flex: 1, justifyContent: 'center', alignItems: 'center',  }]}>
            <ActivityIndicator size="large" color="#82c491" />
            <Text style={{ marginTop: 4 }} variant='titleSmall' >Cargando...</Text>
        </View>
    );
};
