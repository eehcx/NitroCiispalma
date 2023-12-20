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
        // Reducer para establecer el valor de mgL_M
        setMgL_M: (state, action) => { state.mgL_M = action.payload; },
        
        // Reducer para establecer el valor de mgL_B
        setMgL_B: (state, action) => { state.mgL_B = action.payload; },
        
        // Reducer para establecer el valor de aforo
        setAforo: (state, action) => { state.aforo = action.payload; },
        
        // Reducer para establecer el valor de pesoMuestra
        setPesoMuestra: (state, action) => { state.pesoMuestra = action.payload; },
        
        // Reducer para calcular el resultado y establecerlo
        calcularMicronutrientes: (state) => {
            const { mgL_M, mgL_B, aforo, pesoMuestra } = state;
            const FDM = (aforo / pesoMuestra);
            state.resultado = (mgL_M - mgL_B) * FDM;
        },
        
        // Reducer para limpiar el estado, asignando initialState a state
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setMgL_M, setMgL_B, setAforo, setPesoMuestra, calcularMicronutrientes, clear } = MicronutrientesSlice.actions;
export default MicronutrientesSlice.reducer;
