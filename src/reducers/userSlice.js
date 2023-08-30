// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        displayName: '',
    },
    reducers: {
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        resetUserState: state => {
            return state = initialState;
        },
    },
});

export const { setDisplayName, resetUserState } = userSlice.actions;
export default userSlice.reducer;

/*
const initialState = {
    displayName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        resetUserState: state => {
            Object.assign(state, initialState);
        },
    },
});

*/
