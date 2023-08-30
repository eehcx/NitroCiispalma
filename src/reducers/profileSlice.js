// profileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        displayName: '',
        email: '',
    },
    reducers: {
        setProfileData: (state, action) => {
        const { displayName, email } = action.payload;
        state.displayName = displayName;
        state.email = email;
        },
        resetProfileState: state => {
            return state = initialState; 
        },
    },
});

export const { setProfileData, resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
