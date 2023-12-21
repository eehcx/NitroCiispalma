import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { Divider, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import Fonts from '../../styles/Fonts';

export default ItemListRadioButton = ({ title, content, onPress, status, value, details }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                <RadioButton.Item color='#167139' value={value} status={status} onPress={onPress} />
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginRight:'10%' }}>
                    <Text style={[styles.txtLabels, Fonts.modalText]}>{title}</Text>
                    <Text style={[styles.txtLabels, Fonts.cardsText]}>{content}</Text>
                </View>
                <TouchableOpacity style={{ paddingHorizontal:20 }} onPress={details}>
                    <Icon name="chevron-right" size={24} color='#767983' />
                </TouchableOpacity>
            </View>
            <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
        </>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 16, color: '#67757d', fontSize: 15 },
});