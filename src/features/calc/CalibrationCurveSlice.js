import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: 0,
    name: '',
    prefix: '',
    names: ['Fósforo OLSEN', 'Fósforo BRAY', 'Boro', 'Azufre'],
    prefixes: ['fosforo_olsen', 'fosforo_bray', 'boro', 'azufre'],
    slope: '',
    curveData: []
}

export const CalibrationCurveSlice = createSlice({
    name: 'calibrationCurve',
    initialState,
    reducers: {
        setCurrent: (state, action) => { state.current = action.payload; },
        incrementCurrent: (state) => { state.current = (state.current === state.names.length - 1) ? 0 : state.current + 1; },
        decrementCurrent: (state) => { state.current = (state.current === 0) ? state.names.length - 1 : state.current - 1; },
        setName: (state, action) => { state.name = action.payload; },
        setPrefix: (state, action) => { state.prefix = action.payload; },
        setSlope: (state, action) => { state.slope = action.payload; },
        setCurveData: (state, action) => { state.curveData = action.payload; },
        reset: () => { return initialState; },
    },
});

export const { setName, setPrefix, setCurrent, setSlope, setCurveData, reset, incrementCurrent, decrementCurrent } = CalibrationCurveSlice.actions;
export const Current = (state) => state.calibrationCurve.current;
export const CurrentName = (state) => state.calibrationCurve.names[state.calibrationCurve.current];
export default CalibrationCurveSlice.reducer;
