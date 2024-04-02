import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    AbsM: 0.0,             // Absorbancia de la muestra
    AbsB: 0.0,             // Absorbancia del blanco
    m: 0.0,                // Valor de m
    Extractante: 0.0,      // Valor del extractante
    pesoMuestra: 0.0,      // Peso de la muestra (gramos)
    resultado: 0.0,        // Resultado del cálculo
};

export const BoroSlice = createSlice({
    name: 'boro',
    initialState,
    reducers: {
        setAbsM: (state, action) => { state.AbsM = action.payload; },
        setAbsB: (state, action) => { state.AbsB = action.payload; },
        setM: (state, action) => { state.m = action.payload; },
        setExtractante: (state, action) => { state.Extractante = action.payload; },
        setPesoMuestra: (state, action) => { state.pesoMuestra = action.payload; },
        setResultado: (state, action) => { state.resultado = action.payload; },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setAbsM, setAbsB, setM, setExtractante, setPesoMuestra, setResultado, clear } = BoroSlice.actions;
export default BoroSlice.reducer;