// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer from '../features/index';

const store = configureStore({
    reducer: rootReducer,
    middleware: process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : [],
    // Otros middleware u opciones
});

export const persistor = persistStore(store);