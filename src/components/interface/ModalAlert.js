import {Modal, StyleSheet, Text, View} from 'react-native';
import { Divider, Button } from 'react-native-paper';
import Fonts from '../../styles/Fonts';

export default ModalAlert = ({ visible, message, title, onPress, button, close }) => {

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close} >
                <View style={styles.centeredView}>
                    <View className='bg-white p-5 mb-2 rounded-3xl items-center w-full h-2/6 top-5 shadow-2xl shadow-green-800'>
                        <Divider className='bg-neutral-200 h-1 w-1/5 bottom-3 rounded-full' />
                        <Text style={[styles.txtLabels, Fonts.addText, {paddingBottom:10, paddingTop:5, color:'#000', fontSize:20}]}>{title}</Text>
                        <Divider className='bg-neutral-200 w-11/12' style={[{height:1}]} />
                        <Text style={[styles.txtLabels, Fonts.cardsText, {marginTop: 15,color:'#999'}]}>{message}</Text>
                        <View className='flex-row justify-between'>
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
    txtLabels: { marginLeft: 10, fontSize: 15 },
    centeredView: { flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(250, 250, 250, 0.7)' },
    button:{ width:'40%',  height:'42%', marginVertical:30, marginHorizontal:20, borderRadius: 30, alignItems: 'center', justifyContent:'center' }
});