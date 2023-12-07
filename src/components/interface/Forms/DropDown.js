import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, Modal, View, } from 'react-native';
import { Octicons } from '@expo/vector-icons';

export default Dropdown = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={{ fontSize: 15 }}>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
        <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} >
            <View style={[styles.dropdown, { top: dropdownTop }]}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
            </View>
            </TouchableOpacity>
        </Modal>
        );
    };

    return (
        <TouchableOpacity ref={DropdownButton} style={styles.button} onPress={toggleDropdown} >
        {renderDropdown()}
            <Text style={styles.buttonText}>
                {(!!selected && selected.label) || label}
            </Text>
            <Octicons size={20} style={styles.icon} name="chevron-down" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECECEC', height: 50, zIndex: 1, borderRadius: 12, paddingHorizontal: 20, marginBottom: 10, marginTop: 10 },
    buttonText: { flex: 1, textAlign: 'center', fontSize: 16, color: '#333' },
    icon: { marginRight: 20, color: '#333' },
    dropdown: { position: 'absolute', backgroundColor: '#ECECEC', width: '80%', marginHorizontal: '10%', shadowColor: '#000000', shadowRadius: 1,shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.5, borderRadius: 2, borderWidth: 0.5, borderColor: '#ccc' },
    overlay: { width: '100%', height: '100%' },
    item: { paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.3 },
});