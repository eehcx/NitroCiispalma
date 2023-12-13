import React, { useEffect, useState } from 'react';
//React Native
import { StyleSheet, SafeAreaView, ScrollView, TextInput, View, Text, TouchableOpacity } from 'react-native';

import ItemListIcon from '../../../components/interface/ItemListIcon';

export default CalculatorScreen = () => {

    const [loading, setLoading] = useState(true);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    return (
        <View>
            <SafeAreaView>
                <ScrollView onScroll={onScroll}>
                    <ItemListIcon icon="landslide" iconSize={24} title='{packages.nombre}' content='{packages.uid}' />
                    <ItemListIcon icon="landslide" iconSize={24} title='{packages.nombre}' content='{packages.uid}' />
                    <ItemListIcon icon="landslide" iconSize={24} title='{packages.nombre}' content='{packages.uid}' />
                    <ItemListIcon icon="landslide" iconSize={24} title='{packages.nombre}' content='{packages.uid}' />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};