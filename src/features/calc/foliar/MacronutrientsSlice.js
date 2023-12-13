import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    P: 0.0,             // Fosforo
    K: 0.0,             // Potasio
    Ca: 0.0,            // Calcio
    Mg: 0.0,            // Magnesio
    S: 0.0,             // Azufre
    mgLM: 0.0,          // miligramos por litro del elemento en la muestra
    mgLB: 0.0,          // miligramos por litro del elemento en el blanco
    capacity: 50.0,     // Aforo (ml)
    sampleWeight: 0.5,  // Peso de la muestra (gramos)
    FDM: 0.0, 
};

export const macronutrientSlice = createSlice({
    name: 'macronutrient',
    initialState,
    reducers: {
        setP: (state, action) => { state.P = action.payload; },
        setK: (state, action) => { state.K = action.payload; },
        setCa: (state, action) => { state.Ca = action.payload; },
        setMg: (state, action) => { state.Mg = action.payload; },
        setS: (state, action) => { state.S = action.payload; },
        setMgLM: (state, action) => { state.mgLM = action.payload; },
        setMgLB: (state, action) => { state.mgLB = action.payload; },
        setFDM: (state, action) => { state.FDM = action.payload; },
        MacronutrientCalc: (state) => {
            state.FDM = (state.capacity/state.sampleWeight);
        },
        clear: (state) => {
            Object.assign(state, initialState);
        },
    },
});


export const { setP, setK, setCa, setMg, setS, setMgLM, setMgLB, setFDM, MacronutrientCalc }  = macronutrientSlice.actions;
export default macronutrientSlice.reducer;
/*
Macronutrientes.  

Donde 

P= Fosforo, K= Potasio, Ca= Calcio, Mg= Magnesio, S= Azufre.  
mgL^−1M= miligramos por litro del elemento en la muestra. 
mgL^−1B= miligramos por litro del elemento en el blanco 
FDM= Aforo/peso de la muestra=50 ml /0.5 g 
10 000= Factor de conversión a %. 
*/