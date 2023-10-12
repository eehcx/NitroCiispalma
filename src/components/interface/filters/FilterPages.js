//React Native
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default FilterBtn = ({ icon, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor }) => (
    <TouchableOpacity style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#41525C" : backgroundColor, marginLeft, marginRight }]} onPress={onPress} >
        <View style={styles.FilterContainer}>
            <Text variant='titleSmall' style={[styles.txtIcon, { color: isSelected ? "white" : backgroundColor === "#41525C" ? "white" : "#000", fontSize: 13 }]}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

// customerList
const styles = StyleSheet.create({
    // Estilos de btn
    groupChildLayout: {width: "40%", height: 40, backgroundColor: "#ECECEC", borderRadius: 20},
    FilterContainer: {justifyContent: 'center', alignItems: 'center'},
    containerIco: {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    Icon3d: {marginBottom: 5},
    txtIcon: { textAlign: 'center', paddingTop: 8},
});