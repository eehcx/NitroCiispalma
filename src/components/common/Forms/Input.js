import { TextInput, Text } from 'react-native';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

export default Input = ({ placeholder, value, label, backgroundColor }) => {

    return (
        <>
            <Text style={[Fonts.modalText, { marginLeft: 20 }]}>{label}</Text>
            <TextInput style={[InputForms.input, { marginBottom: 30 }, { height: 41, paddingLeft: 25, borderRadius: 10, backgroundColor: backgroundColor }]} placeholder={placeholder} editable={false} value={value} />
        </>
    );
};