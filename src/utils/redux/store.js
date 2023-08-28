// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Importa tu combinador de reductores

const store = configureStore({
    reducer: rootReducer, // Tu combinador de reductores
    // Otros middleware u opciones
    middleware: process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : [],
});

export default store;
