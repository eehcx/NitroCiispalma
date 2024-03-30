//React Native
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default FilterPagesIcon = ({ icon, iconSize, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor, isDisabled }) => (
    <TouchableOpacity className="w-28 h-10 rounded-2xl justify-center items-center" disabled={isDisabled} style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#41525c" : backgroundColor, marginLeft, marginRight }]} onPress={onPress} >
        <Text className="items-center" variant='titleSmall' style={[{ color: isSelected ? "#ECECEC" : backgroundColor === "#41525c" ? "#ECECEC" : "#767983", fontSize: 13 }]}>
            {text}
        </Text>
    </TouchableOpacity>
);

// customerList
const styles = StyleSheet.create({
    groupChildLayout: {backgroundColor: "#ECECEC"},
});


/*
<View style={{ paddingHorizontal:10, paddingVertical:6 }}>
    <Icon name={icon} size={iconSize} color={isSelected ? "#ECECEC" : backgroundColor === "#41525c" ? "#ECECEC" : "#767983"} />
</View>
*/