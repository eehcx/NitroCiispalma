import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Vm: 0.0,  // Valor de la muestra
    Vb: 0.0,  // Valor del blanco
    N: 0.0,   // Valor de N
    p: 0.0,   // Valor de p
    resultado: 0.0, // Resultado del cálculo
};

export const calcularporcentajentSlice = createSlice({
    name: 'calcularporcentajent',
    initialState,
    reducers: {
        // Reducer para establecer el valor de Vm
        setVm: (state, action) => { state.Vm = action.payload; },
        
        // Reducer para establecer el valor de Vb
        setVb: (state, action) => { state.Vb = action.payload; },
        
        // Reducer para establecer el valor de N
        setN: (state, action) => { state.N = action.payload; },
        
        // Reducer para establecer el valor de p
        setP: (state, action) => { state.p = action.payload; },
        
        // Reducer para calcular el porcentajeNt y establecer el resultado
        calcularPorcentajeNt: (state) => {
            const { Vm, Vb, N, p } = state;
            state.resultado = ((Vm - Vb) * N * 14 / (p * 10));
        },
        
        // Reducer para limpiar el estado, asignando initialState a state
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setVm, setVb, setN, setP, calcularPorcentajeNt, clear } = calcularporcentajentSlice.actions;
export default calcularporcentajentSlice.reducer;
