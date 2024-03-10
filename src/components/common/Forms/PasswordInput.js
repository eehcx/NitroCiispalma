import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={[InputForms.input,{ width: '85%'}]} placeholder={placeholder} value={passwordValue} onChangeText={handlePasswordChange} secureTextEntry={!isPasswordVisible} />
            <TouchableOpacity style={{ backgroundColor: '#fafafa', paddingHorizontal: '3%', paddingVertical: '1%',borderRadius: 15, marginBottom: '5%', marginLeft: '2%' }} onPress={togglePasswordVisibility}>
                <Icon name={isPasswordVisible ? 'visibility' : 'lock'} size={23} color="#bababa" />
            </TouchableOpacity>
        </View>
    );
};