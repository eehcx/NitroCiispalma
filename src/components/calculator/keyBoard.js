import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorRows from '../../components/calculator/calcRows';

// FALTA AGREGAR ONPRESS PERSONALISADO
const rows = [
    [
        { label: '7', backgroundColor: '#fff', borderRadius: 25 },
        { label: '8', backgroundColor: '#fff', borderRadius: 25 },
        { label: '9', backgroundColor: '#fff', borderRadius: 25 },
        { label: '⌫', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '4', backgroundColor: '#fff', borderRadius: 25 },
        { label: '5', backgroundColor: '#fff', borderRadius: 25 },
        { label: '6', backgroundColor: '#fff', borderRadius: 25 },
        { label: 'x', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '1', backgroundColor: '#fff', borderRadius: 25 },
        { label: '2', backgroundColor: '#fff', borderRadius: 25 },
        { label: '3', backgroundColor: '#fff', borderRadius: 25 },
        { label: 'R', backgroundColor: '#82BF53', borderRadius: 25 },
    ],[
        { label: '.', backgroundColor: '#fff', borderRadius: 25 },
        { label: '0', backgroundColor: '#fff', borderRadius: 25 },
        { label: '?', backgroundColor: '#fff', borderRadius: 25 },
        { label: '=', backgroundColor: '#82BF53', borderRadius: 25 },
    ]
];

export default KeyBoard = ({}) => (

    /*
    // Seleccion de la funcion
    const [selectedFunction, setSelectedFunction] = useState('');
    // Selecionar un tipo de keyboard
    const [keyboardType, setKeyboardType] = useState('Normal');

    // Valores de los inputs (datos alternos)
    const [TextH_Al, setTextH_Al] = useState('');
    //
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [calculoId, setCalculoId] = useState('');
    // Convertir string a float
    const convertToFloat = (value) => { return parseFloat(value); };
    const [IdLab, setIdLab] = useState('B')

    // Tipos de teclado
    const handleNumberPress = (number) => {
        try{
            if (keyboardType === 'Normal') {
                setTextScreen(textScreen + number);
            } else{
                setTextH_Al(TextH_Al + number);
            }
        } catch (error) {
            console.error('Error mandar el número:', error);
        }
    };

    // Btn de backspace (borrar)
    const handleBackspace = () => {
        if (keyboardType === 'Normal'){ const newValue = textScreen.slice(0, -1);
            setTextScreen(newValue);
        } else { const newValueH_Al = TextH_Al.slice(0, -1);
            setTextH_Al(newValueH_Al);
        }
    };

    // Cambiar el tipo de teclado
    const handleKeyboardChange = ({ type, functionKey }) => {
        setKeyboardType(type);
        setIsButtonEnabled(type !== 'Normal');
        if (functionKey) {
            setSelectedFunction(functionKey);
        }
    };*/

    <View style={styles.keyboardContainer}>
        {rows.map((buttons, index) => (
            <CalculatorRows key={index} buttons={buttons} />
        ))}
    </View>
);

const styles = StyleSheet.create({
    keyboardContainer: { flex: 1, padding: 20, justifyContent: 'space-around' },
});