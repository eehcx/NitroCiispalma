// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../features/index';

const store = configureStore({
    reducer: rootReducer,
    middleware: process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : [],
    // Otros middleware u opciones
});

export default store;