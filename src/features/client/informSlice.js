import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    informId: null,
};

const informSlice = createSlice({
    name: 'imform',
    initialState,
    reducers: {
        setInformId: (state, action) => {
            state.informId = action.payload;
        },
        clearInformId: (state) => {
            state.informId = null;
        },
    },
});

export const { setInformId, clearInformId } = informSlice.actions;
export default informSlice.reducer;