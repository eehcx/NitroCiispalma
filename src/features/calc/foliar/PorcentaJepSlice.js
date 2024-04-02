import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    AbsM: 0.0,         // Absorbancia de la muestra
    AbsB: 0.0,         // Absorbancia del blanco
    m: 0.0,            // Valor de m
    b: 0.0,            // Valor de b
    aforo: 0.0,        // Aforo (ml)
    pesoMuestra: 0.0,  // Peso de la muestra (gramos)
    alicuota: 0.0,     // Volumen de la alícuota (ml)
    resultado: 0.0,    // Resultado del cálculo
};

export const PorcentaJepSlice = createSlice({
    name: 'porcentajep',
    initialState,
    reducers: {
        setAbsM: (state, action) => { state.AbsM = action.payload; },
        setAbsB: (state, action) => { state.AbsB = action.payload; },
        setM: (state, action) => { state.m = action.payload; },
        setB: (state, action) => { state.b = action.payload; },
        setAforo: (state, action) => { state.aforo = action.payload; },
        setPesoMuestra: (state, action) => { state.pesoMuestra = action.payload; },
        setAlicuota: (state, action) => { state.alicuota = action.payload; },
        setResultado: (state, action) => { state.resultado = action.payload; },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, setResultado, clear } = PorcentaJepSlice.actions;
export default PorcentaJepSlice.reducer;
