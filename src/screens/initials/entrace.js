import buttonStyles from '../../styles/buttonStyles';
import Fonts from '../../styles/Fonts';
//REACT NATIVE Y TAILWIND CSS
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
// React Navigation
import { useNavigation } from '@react-navigation/native';

export default InputScreen = () => {
    const navigation = useNavigation();
    return (
        <View className='flex-1'>
            <ImageBackground className='flex-1 object-cover justify-center' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ciispalmaapp.appspot.com/o/static%2FImages%2Ffondo.jpg?alt=media&token=6768490a-3093-451c-aa41-4cf583fe9d3b' }}>
                <View className='flex-1'>
                <View className='relative justify-end mt-36 w-full h-96'>
                    <View className='w-80 h-80 p-5 mr-28'>
                        <Text style={[Fonts.headerTitle, { color: '#fafafa' }]}>Aceite de palma</Text>
                        <Text style={[Fonts.labelTitle, { color: '#fafafa' }]}>Un verdadero Tesoro para la Salud y el Sabor</Text>
                    </View>
                </View>
                </View>
                <View className='flex-1 justify-end'>
                    <View className='flex-row justify-center mb-8'>
                        <TouchableOpacity style={[buttonStyles.button, { marginRight: 10 }]} onPress={()=> navigation.navigate('login')}>
                            <Text style={[buttonStyles.buttonText, Fonts.buttonTitle]}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={buttonStyles.button_signup} onPress={()=> navigation.navigate('signin')}>
                            <Text style={[buttonStyles.buttonText_signup, Fonts.buttonTitle]}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='items-center mb-8'>
                        <Text className='text-zinc-50'>Colabora con 
                            <Text className='font-bold tracking-widest'> CIISPALMA</Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};