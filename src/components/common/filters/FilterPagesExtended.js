//React Native
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default FilterPagesExtended = ({ icon, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor, isDisabled }) => (
    <TouchableOpacity className="w-2/5 h-10 rounded-2xl justify-center items-center" disabled={isDisabled} style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#41525C" : backgroundColor, marginLeft, marginRight }]} onPress={onPress} >
        <Text variant='titleSmall' style={[{ color: isSelected ? "white" : backgroundColor === "#41525C" ? "white" : "#000", fontSize: 13 }]}>
            {text}
        </Text>
    </TouchableOpacity>
);

// customerList
const styles = StyleSheet.create({
    // Estilos de btn
    groupChildLayout: {backgroundColor: "#ECECEC"},
    FilterContainer: {justifyContent: 'center', alignItems: 'center'},
});