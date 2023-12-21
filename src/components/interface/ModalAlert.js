import React, { useState, useEffect } from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import { Divider, Button } from 'react-native-paper';
import Fonts from '../../styles/Fonts';

export default ModalAlert = ({ visible, message, title, onPress, button, close }) => {

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close} >
                <View style={styles.centeredView}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 30, alignItems: 'center', width: '100%', height:'30%', top:20, shadowColor: "#000", shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 }}>
                        <Divider style={[{ backgroundColor: "#dadada", height:3, width: '20%', bottom:10, borderRadius: 40 }]} />
                        <Text style={[styles.txtLabels, Fonts.addText, {paddingBottom:10, paddingTop:5, color:'#000', fontSize:20}]}>{title}</Text>
                        <Divider style={[styles.cardList, { backgroundColor: "#e4e5e6", height:1, width: '90%' }]} />
                        <Text style={[styles.txtLabels, Fonts.cardsText, {marginTop: 15,color:'#999'}]}>{message}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <Button textColor='#41525C'  mode="contained" style={[Fonts.buttonTitle, styles.button, {backgroundColor:'#ececec'}]} onPress={close}>REGRESAR</Button>
                            <Button mode="contained" style={[Fonts.buttonTitle, styles.button, {backgroundColor: '#41525C'}]} onPress={onPress}>{button}</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    txtLabels: { marginLeft: 10, fontSize: 15 },
    centeredView: { flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(250, 250, 250, 0.7)',
},
    button:{ width:'40%',  height:'42%', marginVertical:30, marginHorizontal:20, borderRadius: 30, alignItems: 'center', justifyContent:'center' }
});