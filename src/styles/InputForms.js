import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 15,
        width: '90%',
        alignItems: 'center',
    },
    formTitle: {
        fontSize: 26,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 37,
        borderWidth: 1,
        backgroundColor: '#e6e6fa',
        borderColor: '#e6e6fa',
        borderRadius: 20,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    signInText: {
        marginTop: 20,
        fontSize: 16,
        color: '#000',
    },
    signInLink: {
        color: '#4ab269'
    },
});