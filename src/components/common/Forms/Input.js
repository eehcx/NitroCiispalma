import { TextInput, Text } from 'react-native';

export default Input = ({ placeholder, value, label, backgroundColor, TextColor }) => {

    return (
        <>
            <Text className={`font-medium text-base pb-2 px-3 ${TextColor}`}>{label}</Text>
            <TextInput className={`h-12 w-full mb-8 pl-6 rounded-xl ${backgroundColor}`} placeholder={placeholder} editable={false} value={value} />
        </>
    );
};