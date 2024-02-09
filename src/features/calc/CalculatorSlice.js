import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    IdCalc: null,
    IdLab: null,
    current: 1,
    selected: '',
    result: 0.0,
}

export const CalculatorSlice = createSlice({
    name: 'calculator',
    initialState, 
    reducers: {
        setIdLab: (state, action) => { state.IdLab = action.payload; },
        setIdCalc: (state, action) => { state.IdCalc = action.payload; },
        setInput: (state, action) => { state.current = action.payload; },
        setSelected: (state, action) => { state.selected = action.payload; },
        reset: () => { return initialState; },
    },
});

export const { setIdLab, setIdCalc, setInput, setSelected, reset } = CalculatorSlice.actions;
export const selectCurrentInput = (state) => state.calculator.current;
export default CalculatorSlice.reducer;