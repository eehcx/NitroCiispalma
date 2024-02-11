import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Selección del calculo
    index: 0,
    calcNames: ['Micronutrientes','Macronutrientes','Calcular Boro','Calcular Azufre','Porcentaje Jent','Porcentaje Jep'],
    // Funcionalidad calculadora
    input: 1,
    keyboardNumber: '',
    value: '',
    // Datos para el manejo del registro
    IdCalc: null,
    IdLab: null,
    result: 0.0,
}

export const CalculatorSlice = createSlice({
    name: 'calculator',
    initialState, 
    reducers: {
        // Selección del calculo
        setIndex: (state, action) => { state.index = action.payload; },
        // Datos para el manejo del registro
        setIdLab: (state, action) => { state.IdLab = action.payload; },
        setIdCalc: (state, action) => { state.IdCalc = action.payload; },
        // Funcionalidad
        increment: (state) => { 
            state.value = initialState.value;
            state.input = (state.input + 1); 
        },
        decrement: (state) => { 
            state.value = initialState.value;
            state.input = (state.input - 1); 
        },
        updateValue: (state, action) => {
            state.keyboardNumber = action.payload; 
            state.value += action.payload; 
        },
        Backspace: (state) => {
            state.keyboardNumber = state.keyboardNumber.slice(0, -1); 
            state.value = state.value.slice(0, -1); 
        },
        reset: (state) => { 
            state.keyboardNumber = initialState.keyboardNumber;
            state.value = initialState.value;
            //state.input = initialState.input;
            //state.result = initialState.result;
        },
    },
});

export const { setIndex, increment, decrement, updateValue, Backspace, setIdLab, setIdCalc, reset } = CalculatorSlice.actions;
export const Index = (state) => state.calculator.index;
export const Name = (state) => state.calculator.calcNames[state.calculator.index];
//
export const selectCurrentInput = (state) => state.calculator.input;
export default CalculatorSlice.reducer;    