import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    form: 1,
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
        update: (state, action) => {
            const { form, no_solicitud, uid_package, fecha_entrega, fecha_recepcion, no_muestras, observaciones, procedencia, tipo_cultivo } = action.payload;
            state.form = form;
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

export const { update, reset } = reportSlice.actions;
export default reportSlice.reducer;
