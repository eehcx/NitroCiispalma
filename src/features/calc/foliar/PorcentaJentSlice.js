import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Vm: 0.0,  // Valor de la muestra
    Vb: 0.0,  // Valor del blanco
    N: 0.0,   // Valor de N
    p: 0.0,   // Valor de p
    resultado: 0.0, // Resultado del cálculo
};

export const PorcentaJentSlice = createSlice({
    name: 'porcentajent',
    initialState,
    reducers: {
        setVm: (state, action) => { state.Vm = action.payload; },
        setVb: (state, action) => { state.Vb = action.payload; },
        setN: (state, action) => { state.N = action.payload; },
        setP: (state, action) => { state.p = action.payload; },
        setResultado: (state, action) => { state.resultado = action.payload; },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setVm, setVb, setN, setP, setResultado, clear } = PorcentaJentSlice.actions;
export default PorcentaJentSlice.reducer;
