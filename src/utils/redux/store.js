// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Importa tu combinador de reductores

const store = configureStore({
    reducer: rootReducer, // Tu combinador de reductores
    // Otros middleware u opciones
});

export default store;
