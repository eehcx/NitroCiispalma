import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: '',
        stsTokenManager: {accessToken: '',expirationTime: '', refreshToken: ''},
        createdAt: '',
        lastLoginAt: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
    },
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload;
        },
        setStsTokenManager: (state, action) => {
            state.stsTokenManager = action.payload;
        },
        setCreateAt: (state, action) => {
            state.createdAt = action.payload;
        },
        setLastLoginAt: (state, action) => {
            state.lastLoginAt = action.payload;
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },
        setPhotoURL: (state, action) => {
            state.photoURL = action.payload;
        },
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.stsTokenManager = action.payload.stsTokenManager;
            state.createdAt = action.payload.createdAt;
            state.lastLoginAt = action.payload.lastLoginAt;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.photoURL = action.payload.photoURL;
            state.isLoggedIn = true; // Marca al usuario como conectado
        },
        logout: state => {
            // Restablece el estado al cerrar sesión
            Object.assign(state, initialState);
        },
    },
});
