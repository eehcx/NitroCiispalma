import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { Divider } from 'react-native-paper';
import Octicons from '@expo/vector-icons/Octicons';
// Styles
import Fonts from '../../styles/Fonts';

export default ItemListIcon = ({ title, content, icon, iconSize, onPress }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical:12, }}>
                <Octicons name={icon} size={iconSize} color='#767983' style={{ paddingHorizontal:15 }}/>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={[styles.txtLabels, Fonts.modalText]}>{title}</Text>
                    <Text style={[styles.txtLabels, Fonts.cardsText]}>{content}</Text>
                </View>
                <TouchableOpacity onPress={onPress} style={{ paddingHorizontal:20 }}>
                    <Octicons name="chevron-right" size={iconSize} color='#767983' />
                </TouchableOpacity>
            </View>
            <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6" }]} />
        </>
    );
};


const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    cardList:{ marginTop: 5, marginBottom: 5 },
    txtLabels: { marginLeft: 10, color: '#67757d', fontSize: 15 },
});