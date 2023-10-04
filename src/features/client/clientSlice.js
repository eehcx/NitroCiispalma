import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clientId: null,
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClientId: (state, action) => {
            state.clientId = action.payload;
        },
        clearClientId: (state) => {
            state.clientId = null;
        },
    },
});

export const { setClientId, clearClientId } = clientSlice.actions;
export default clientSlice.reducer;