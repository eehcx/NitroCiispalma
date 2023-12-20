import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientId: null,
    Nombre: '',
    RazonSocial: '',
    Telefono: '',
    fechaCreacion: ''
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setNombre: (state, action) => { state.Nombre = action.payload; },
        setRazonSocial: (state, action) => { state.RazonSocial = action.payload; },
        setTelefono: (state, action) => { state.Telefono = action.payload; },
        setFechaCreacion: (state, action) => { state.fechaCreacion = action.payload; },
        setClientId: (state, action) => {
            state.clientId = action.payload;
        },
        clear: state => {
            Object.assign(state, initialState);
        },
    },
});

export const { setNombre, setRazonSocial, setTelefono, setFechaCreacion, setClientId, addClient, clear } = clientSlice.actions;
export default clientSlice.reducer;