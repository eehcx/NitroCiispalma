import { View, TouchableOpacity, Text } from 'react-native';
// React Native Paper
import { Divider, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import Fonts from '../../styles/Fonts';

export default ItemListRadioButton = ({ title, content, onPress, status, value, details }) => {
    return (
        <>
            <View className='flex-row items-center justify-between py-3'>
                <RadioButton.Item color='#167139' value={value} status={status} onPress={onPress} />
                <View className=' flex-col items-start mr-14' >
                    <Text className='ml-4 text-base text-zinc-500' style={[Fonts.modalText]}>{title}</Text>
                    <Text className='ml-4 text-base text-zinc-500' style={[Fonts.cardsText]}>{content}</Text>
                </View>
                <TouchableOpacity className='px-5' onPress={details}>
                    <Icon name="chevron-right" size={24} color='#767983' />
                </TouchableOpacity>
            </View>
            <Divider className='my-1 bg-stone-200'/>
        </>
    );
};