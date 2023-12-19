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

export const calcularporcentajepSlice = createSlice({
    name: 'calcularporcentajep',
    initialState,
    reducers: {
        // Reducer para establecer el valor de AbsM
        setAbsM: (state, action) => { state.AbsM = action.payload; },
        
        // Reducer para establecer el valor de AbsB
        setAbsB: (state, action) => { state.AbsB = action.payload; },
        
        // Reducer para establecer el valor de m
        setM: (state, action) => { state.m = action.payload; },
        
        // Reducer para establecer el valor de b
        setB: (state, action) => { state.b = action.payload; },
        
        // Reducer para establecer el valor de aforo
        setAforo: (state, action) => { state.aforo = action.payload; },
        
        // Reducer para establecer el valor de pesoMuestra
        setPesoMuestra: (state, action) => { state.pesoMuestra = action.payload; },
        
        // Reducer para establecer el valor de alicuota
        setAlicuota: (state, action) => { state.alicuota = action.payload; },
        
        // Reducer para calcular el porcentajeP y establecer el resultado
        calcularPorcentajeP: (state) => {
            const { AbsM, AbsB, m, b, aforo, pesoMuestra, alicuota } = state;
            const FDM = (aforo / pesoMuestra);
            const FDV = (aforo / alicuota);
            state.resultado = (((AbsM - AbsB) * FDM * FDV / m) / (m + b)) / 10000;
        },
        
        // Reducer para limpiar el estado, asignando initialState a state
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setAbsM, setAbsB, setM, setB, setAforo, setPesoMuestra, setAlicuota, calcularPorcentajeP, clear } = calcularporcentajepSlice.actions;
export default calcularporcentajepSlice.reducer;
