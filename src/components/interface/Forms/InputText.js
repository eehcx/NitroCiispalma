import { TextInput, Text } from 'react-native';
import InputForms from '../../../styles/InputForms';
import Fonts from '../../../styles/Fonts';

export default InputText = ({ placeholder, value, onChange, label, backgroundColor, marginRight, marginLeft }) => {

    return (
        <>
            <Text style={[Fonts.modalText, { marginRight: marginRight, marginLeft: marginLeft }]}>{label}</Text>
            <TextInput style={[InputForms.input, { marginBottom: 30 }, { height: 41, paddingLeft: 25, borderRadius: 17, backgroundColor: backgroundColor }]} placeholder={placeholder} value={value} onChange={onChange} />
        </>
    );
};