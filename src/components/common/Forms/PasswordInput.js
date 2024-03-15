import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputForms from '../../../styles/InputForms';

export default PasswordInput = ({ placeholder, onPasswordChange, passwordValue }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePasswordChange = (text) => {
        onPasswordChange(text);
    };

    return (
        <View className='flex-row items-center justify-center'>
            <TextInput style={[InputForms.input,{ width: '85%'}]} placeholder={placeholder} value={passwordValue} onChangeText={handlePasswordChange} secureTextEntry={!isPasswordVisible} />
            <TouchableOpacity className='bg-zinc-50 px-1 py-1 rounded-2xl mb-5 ml-2' onPress={togglePasswordVisibility}>
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={23} color="#bababa" />
            </TouchableOpacity>
        </View>
    );
};