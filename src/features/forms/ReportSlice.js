import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentForm: 1,
    no_solicitud: '',
    uid_package: '',
    fecha_entrega: '',
    fecha_recepcion: '',
    no_muestras: '',
    observaciones: '',
    procedencia: '',
    tipo_cultivo: '',
}

export const reportSlice = createSlice({
    name: 'report',
    initialState, 
    reducers: {
        setForm: (state, action) => {
            state.currentForm = action.payload;
        },
        update: (state, action) => {
            const { no_solicitud, uid_package, fecha_entrega, fecha_recepcion, no_muestras, observaciones, procedencia, tipo_cultivo } = action.payload;
            state.no_solicitud = no_solicitud;
            state.uid_package = uid_package;
            state.fecha_entrega = fecha_entrega;
            state.fecha_recepcion = fecha_recepcion;
            state.no_muestras = no_muestras;
            state.observaciones = observaciones;
            state.procedencia = procedencia;
            state.tipo_cultivo = tipo_cultivo;
        },
        reset: () => {
            return initialState;
        },
    },
});

export const { update, setForm, reset } = reportSlice.actions;
export const selectCurrentForm = (state) => state.form.currentForm;
export default reportSlice.reducer;
