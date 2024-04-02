import { TextInput, Text } from 'react-native';
import Fonts from '../../../styles/Fonts';

export default InputText = ({ placeholder, value, onChange, label, backgroundColor, marginRight, marginLeft, keyboardType }) => {

    return (
        <>
            <Text style={[Fonts.modalText, { marginRight: marginRight, marginLeft: marginLeft }]}>{label}</Text>
            <TextInput className="w-full h-11 px-6 rounded-xl mb-10" style={[{backgroundColor: backgroundColor}]} keyboardType={keyboardType} placeholder={placeholder} value={value} onChangeText={onChange} />
        </>
    );
};