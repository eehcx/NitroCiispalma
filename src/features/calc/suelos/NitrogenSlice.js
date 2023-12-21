import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Vm: 0.0,        // ml de ácido sulfúrico utilizados para titular la muestra
    Vb: 0.0,        // Volumen de ácido sulfúrico para titular el blanco
    N: 0.0,         // Normalidad exacta del ácido sulfúrico
    p: 0.0,         // Peso de la muestra de suelo en g
    result: 0.0,    // Resultado del cálculo (% Nt)
};

export const nitrogenSlice = createSlice({
    name: 'nitrogen',
    initialState, 
    reducers: {
        setVm: (state, action) => { state.Vm = action.payload; },
        setVb: (state, action) => { state.Vb = action.payload; },
        setN: (state, action) => { state.N = action.payload; },
        setP: (state, action) => { state.p = action.payload; },
        TotalNitrogenCalc: (state) => {
            const { Vm, Vb, N, p } = state;
            const result = ((Vm - Vb) * N * 14) / (p * 10);
            state.result = result;
        },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setVm, setVb, setN, setP, TotalNitrogenCalc, }  = nitrogenSlice.actions;
export default nitrogenSlice.reducer;

/*
appendDigit: (state, action) => {
    const digit = action.payload;
    // Verifica si se está ingresando el primer dígito o no
    if (state.result === 0) {
        // Si el resultado actual es 0, reemplaza el resultado con el dígito ingresado
        state.result = digit;
    } else {
        // De lo contrario, concatena el dígito al resultado actual
        state.result = state.result.toString() + digit.toString();
    }
},
*/