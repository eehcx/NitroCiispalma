//React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
// React Native Paper
import { DataTable } from 'react-native-paper';
// Redux
import { useSelector } from 'react-redux';
// Estilos
import Fonts from '../../../styles/Fonts';

export default TableCurve = ({data}) => {
    const calibrationCurve = useSelector(state => state.calibrationCurve);
    let slope = calibrationCurve.slope || '00.00';
    // Scroll
    const [isExtended, setIsExtended] = React.useState(false);
    const onScroll = ({ nativeEvent }) => { const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0; setIsExtended(currentScrollPosition <= 0); };

    return(
        <>
            <SafeAreaView style={[styles.container]}>
                <ScrollView onScroll={onScroll}>
                    <DataTable style={{ paddingHorizontal:20 }}>
                        <DataTable.Header>
                            <DataTable.Title >CONCENTRACIÓN</DataTable.Title>
                            <DataTable.Title numeric>ABS</DataTable.Title>
                        </DataTable.Header>

                        {data.map((curve, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{curve.concentracion}</DataTable.Cell>
                                <DataTable.Cell numeric>{curve.abs}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <View style={{flex: 1, paddingVertical: '10%', paddingHorizontal:20}}>
                        <Text style={[Fonts.addText, {textAlign: 'center'}]}>{'Pendiente: '+ slope}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
});
