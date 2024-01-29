import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    prefix: '',
    slope: null,
    curveData: [
        { key: 1, concentracion:"0.0", abs: "0.019"},
        { key: 2, concentracion:"0.1", abs: "0.093"},
        { key: 3, concentracion:"0.2", abs: "0.167"},
        { key: 4, concentracion:"0.4", abs: "0.296"},
        { key: 5, concentracion:"0.6", abs: "0.444"},
        { key: 6, concentracion:"0.8", abs: "0.551"},
        { key: 7, concentracion:"1.0", abs: "0.699"}
    ]
}

export const CalibrationCurveSlice = createSlice({
    name: 'calibrationCurve',
    initialState, 
    reducers: {
        setName: (state, action) => { state.name = action.payload; },
        setPrefix: (state, action) => { state.prefix = action.payload; },
        setSlope: (state, action) => { state.slope = action.payload; },
        setCurveData: (state, action) => { state.curveData = action.payload; },
        reset: () => { return initialState; },
    },
});

export const { setName, setPrefix, setSlope, setCurveData, reset } = CalibrationCurveSlice.actions;
export default CalibrationCurveSlice.reducer;