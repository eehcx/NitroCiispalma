//React Native
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default FilterPagesIcon = ({ icon, iconSize, text, backgroundColor, marginLeft, marginRight, onPress, isSelected, SelectedColor, isDisabled }) => (
    <TouchableOpacity disabled={isDisabled} style={[styles.groupChildLayout, { backgroundColor: isSelected ? "#41525c" : backgroundColor, marginLeft, marginRight }]} onPress={onPress} >
        <View style={{ paddingHorizontal:10, paddingVertical:6 }}>
            <Icon name={icon} size={iconSize} color={isSelected ? "#ECECEC" : backgroundColor === "#41525c" ? "#ECECEC" : "#767983"} />
        </View>
        <View style={{ paddingRight: 10}}>
            <Text variant='titleSmall' style={[styles.txtIcon, { color: isSelected ? "#ECECEC" : backgroundColor === "#41525c" ? "#ECECEC" : "#767983", fontSize: 13 }]}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

// customerList
const styles = StyleSheet.create({
    groupChildLayout: {width: "29%", height: 40, backgroundColor: "#ECECEC", borderRadius: 20, flexDirection: 'row', justifyContent: 'space-around'},
    txtIcon: { textAlign: 'center', paddingTop: 8},
});