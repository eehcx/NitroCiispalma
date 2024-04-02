import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mgL_M: 0.0,        // miligramos por litro de la muestra
    mgL_B: 0.0,        // miligramos por litro del blanco
    aforo: 0.0,        // Aforo (ml)
    pesoMuestra: 0.0,  // Peso de la muestra (gramos)
    resultado: 0.0,    // Resultado del cálculo
};

export const MicronutrientesSlice = createSlice({
    name: 'micronutrientes',
    initialState,
    reducers: {
        setMgL_M: (state, action) => { state.mgL_M = action.payload; },
        setMgL_B: (state, action) => { state.mgL_B = action.payload; },
        setAforo: (state, action) => { state.aforo = action.payload; },
        setPesoMuestra: (state, action) => { state.pesoMuestra = action.payload; },
        setResultado: (state, action) => { state.resultado = action.payload; },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setMgL_M, setMgL_B, setAforo, setPesoMuestra, setResultado, clear } = MicronutrientesSlice.actions;
export default MicronutrientesSlice.reducer;
